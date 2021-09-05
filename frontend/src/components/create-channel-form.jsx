import { useState } from "react";

const CreateChannelForm = ({ count, createChannel }) => {
    const [name, setName] = useState('')
    const [error, setError] = useState(null);

    const isLimitExceeded = count >= 15;

    const handleCreateNew = () => {
        setError(null);

        if (!name) return showTemporaryError('Channel name cannot be empty')
        if (isLimitExceeded) return showTemporaryError('Cannot create more than 15 channels')
        if (name.length > 50) return showTemporaryError('Channel name cannot be longer than 50 characters')

        createChannel(name);
        setName('');
    }

    const showTemporaryError = (err) => {
        setError(err);
        setTimeout(() => setError(null), 2500)
    }

    const onKeyPress = (e) => {
        if (e.key === 'Enter')
            handleCreateNew();
    }


    return <div className="create-channel-form">
        <input type="text" placeholder="new channel name" onChange={(e) => setName(e.target.value)} value={name} onKeyPress={onKeyPress} />
        <button onClick={handleCreateNew}>Create</button>
        <br />
        {error && <span className="error">{error}</span>}
    </div>
}

export default CreateChannelForm;