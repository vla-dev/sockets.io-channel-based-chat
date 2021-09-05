import { useState } from "react"

const Nickname = (props) => {
    const storedNickName = localStorage.getItem('nickname');
    const [nickname, setNickname] = useState(storedNickName || '')

    const onSubmit = () => {
        if (nickname && nickname.length) {
            localStorage.setItem('nickname', nickname);
            props.history.push('/chat');
        }
    }

    const clearNickname = () => {
        localStorage.removeItem('nickname');
        setNickname('');
    }

    return <div className="nickname-selector">
        <h3>Set Your Nickname</h3>
        <input type="text" placeholder="nickname" onChange={(e) => setNickname(e.target.value)} value={nickname} />
        <div className="buttons">
            <button className="confirm-button" onClick={onSubmit}>CONFIRM</button>
            {storedNickName && <button className="reset-nickname-button" onClick={clearNickname}>Reset nickname</button>}
        </div>
    </div>

}

export default Nickname