const xhr = {
    call: async function (url, settings) {
        const request = await fetch(url, settings);
        const response = await request.json();

        return response;
    },

    get: async function({url, data}) {
        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };

       return await this.call(url, settings);
    },

    post: async function({url, data}) {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };

        return await this.call(url, settings);
    }
}

const API = {
    getChannels: async () => {
        return await xhr.get({
            url: '/api/get-channels'
        });
    },

    createChannel: async (channelName) => {
        return await xhr.post({
            url: '/api/create-channel/' + channelName,
            data: {}
        });
    },

    getChannelMessages: async (channel) => {
        return await xhr.get({
            url: '/api/get-channel-messages/' + channel
        });
    }
}

export default API