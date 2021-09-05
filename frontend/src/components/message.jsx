const Message = ({ message }) => {
    return <div className={`message`}>
        <span className="text">{message.text}</span>
        <div className="info">
            <span className="from">{message.from}</span> | <span className="date">{message.date}</span>
        </div>
    </div>
}
 
export default Message