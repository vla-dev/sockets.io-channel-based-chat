import { useEffect, useRef, useState } from "react";
import Message from "./message";
import moment from 'moment';
import API from "../API";

const ChatWindow = ({ nickname, socket, channel, onLeave }) => {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');

    const messagesListRef = useRef(null);
    const inputBoxRef = useRef(null);

    useEffect(async () => {
        const inputBox = inputBoxRef.current;
        if (inputBox)
            inputBox.focus();

        const loadedMessages = await API.getChannelMessages(channel);
        setMessages(messages => [...loadedMessages])

        socket.on('message', (message) => {
            console.log('[on message]: ', message)
            setMessages(messages => [...messages, message])
        })

        return () => {
            socket.emit('leave', null);
        }
    }, [])

    useEffect(() => {
        const messagesList = messagesListRef.current;
        if (messagesList)
            messagesList.scrollTop = messagesList.scrollHeight;
    }, [messages])

    const sendMessage = () => {
        if (currentMessage) {
            const messageObject = {
                from: nickname,
                text: currentMessage,
                date: moment().calendar()
            }

            setMessages(messages => [...messages, messageObject])
            socket.emit('message', messageObject);
            setCurrentMessage('');
        }
    }

    const onKeyPress = (e) => {
        if (e.key === 'Enter')
            sendMessage();
    }

    const handleOnLeave = () => {
        onLeave();
        socket.emit('leave', null);
    }

    return <div className="chat-window">
        <div className="header">
            <button onClick={handleOnLeave}>Leave</button>
            <h2>Channel - {channel}</h2>
        </div>
        <ul ref={messagesListRef}>
            {
                messages && messages.length > 0 &&
                messages.map((mess, index) => {
                    return <li key={index} className={`message-wrapper ${mess.from === nickname ? 'sender' : 'receiver'}`}>
                        <Message message={mess} />
                    </li>
                })
            }
        </ul>
        <div className="message-input">
            <input ref={inputBoxRef} type="text" onChange={(e) => setCurrentMessage(e.target.value)} value={currentMessage} onKeyPress={onKeyPress} />
            <button onClick={sendMessage}>SEND</button>
        </div>
    </div>
}

export default ChatWindow;