import { useEffect, useState } from "react";
import io from "socket.io-client";
const CHATTING_SERVER_URL = process.env.REACT_APP_CHATTING_SERVER_URL;

let socket = null;

function Chatting(props) {

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        init();
        console.log("닉네임은 : ", props.nickname, " 룸이름은 : ", props.code);
        socket.emit("nickname", props.nickname);
        socket.emit("enter_room", props.code);

        return () => {
            socket.disconnect();
        };
    }, [])

    function init() {
        socket = io(CHATTING_SERVER_URL);
        socket.on("welcome", (user) => {
            addMessage(`${user} 님이 입장했습니다.`);
        });

        socket.on("bye", (user) => {
            addMessage(`${user} 님이 퇴장했습니다.`);
        });

        socket.on("new_message", addMessage);
    }

    function addMessage(newMessage) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    }

    function sendMessage() {
        if (message) {
            socket.emit("new_message", message, props.code);
            addMessage(`나 : ${message}`);
            setMessage('');
        }
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    return (
        <div>
            <div>
                <h2>Chat Room</h2>
                <div className="chat">
                    {messages.map((message, index) => (
                        <div key={index}>{message}</div>
                    ))}
                </div>
            </div>
            <div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={sendMessage}>전송</button>
            </div>
        </div>
    )
}

export default Chatting;