const StartChat = (props) => {
    const start = () => {
        props.history.push('/nickname');
    }

    return <div className="start-window">
        <h3>Sockets.io Experimental Chat</h3>
        <button onClick={start}>Start</button>

    </div>
}

export default StartChat;