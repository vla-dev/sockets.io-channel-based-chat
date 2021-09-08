import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import API from '../API';
import ChatWindow from './chat-window';
import CreateChannelForm from './create-channel-form';

const SOCKETS_SERVER_HOST = 'http://dejawo.go.ro:8888'
let socket;

const Chat = (props) => {
    const [nickname, setNickname] = useState('')
    const [channel, setChannel] = useState('')
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const storedNickName = localStorage.getItem('nickname');
        setNickname(storedNickName);

        socket = io(SOCKETS_SERVER_HOST)

        socket.on('channel-created', (ch) => {
            setChannels(channels => [...channels, ch]);
        })

        socket.on('channel-properties-updated', (updatedChannel) => {
            setChannels(channels =>
                channels.map(ch => ch.id === updatedChannel.id ? updatedChannel : ch));
        })
    }, [])

    useEffect(() => {
        const fetch = async () => {
            const response = await API.getChannels();

            if (response.error) { return null }
            setChannels(response)
        }

        fetch();
    }, [])

    const createChannel = async (channelName) => {
        if (!channelName) {
            return console.log('Channel name cannot be empty')
        }

        const ch = await API.createChannel(channelName);

        if (ch.error) { return null }

        socket.emit('create-channel', ch, () => {
            setChannels(channels => [...channels, ch]);
        });

    }

    const join = (name, channelName) => {
        name = name || nickname;
        channelName = channelName || channel;

        socket.emit('join', {
            user: name,
            channel: channelName
        }, (data) => {
            if (data && data.error)
                return;

            setChannel(channelName)
        })
    }

    const handleOnLeave = () => {
        setChannel(null);
    }

    return <div className="chat">
        <h2>Welcome, {nickname} !</h2>
        {channel ?
            <ChatWindow nickname={nickname} socket={socket} channel={channel} onLeave={handleOnLeave} />
            :
            <div>
                <CreateChannelForm count={channels.length} createChannel={createChannel} />
                <h5 className="channels-count">{channels.length} of 15 channels</h5>
                {
                    channels && channels.length !== 0 && <table>
                        <thead>
                            <tr>
                                <th>Channel Name</th>
                                <th>Participants</th>
                                <th>Messages:</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {channels.map((channel, index) => {
                                return <tr key={index}>
                                    <td>{channel.name}</td>
                                    <td>{channel.participants}</td>
                                    <td>{channel.messages.length}</td>
                                    <td><button onClick={() => join(nickname, channel.name)}>JOIN</button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>

                }
            </div>
        }
    </div>
}

export default Chat;