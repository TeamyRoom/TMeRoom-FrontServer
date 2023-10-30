import { useEffect, useState } from "react";
import io from "socket.io-client";
const CHATTING_SERVER_URL = process.env.REACT_APP_CHATTING_SERVER_URL;

let socket = null;

function Chatting(props) {

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        init();
        socket.emit("nickname", props.nickname);
        socket.emit("enter_room", props.lecturecode);

        return () => {
            socket.disconnect();
        };
    }, [])

    function init() {
        let path = CHATTING_SERVER_URL.split('/');
        let url = path.slice(0, 3);
        url = url.join("/");
        if(path.length > 3) {
          path = path.slice(3);
          path = path.join("/");
          path = path.concat('/');
        }
        else path = "";
        socket = io(url, {path: `/${path}socket.io/`});
        socket.on("welcome", (user) => {
            addMessage(`${user} 님이 입장했습니다.`);
        });

        socket.on("bye", (user) => {
            addMessage(`${user} 님이 퇴장했습니다.`);
        });

        socket.on("new_message", addMessage);
    }

    function addMessage(nickname, msg, time) {
        const newMessage = {
            nickname,
            msg,
            time,
            type: "msg right_msg",
        }
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    }

    function sendMessage() {
        if (message) {
            socket.emit("new_message", message, props.lecturecode);
            const curretnTime = getCurrentTime();

            const newMessage = {
                nickname: "나",
                msg: message,
                time: curretnTime,
                type: "msg left_msg",
            }
            setMessages((prevMessages) => [...prevMessages, newMessage]);

            setMessage('');
        }
    }

    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    function handleKeyUp(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    }

    return (
        <div className="chat_area">
            <div className="msger_chat">

                {messages.map((message, index) => (
                    <div className={message.type} key={index}>
                        <div className="msg_bubble">
                            <div className="msg_info">
                                <div className="msg_info_name">{message.nickname}</div>
                                <div className="msg_info_time">{message.time}</div>
                            </div>
                            <div className="msg_text-chat">
                                {message.msg}
                            </div>
                        </div>
                    </div>
                ))}


            </div>
            <div className="msger_inputarea">
                <input
                    type="text"
                    className="msger_input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyUp={handleKeyUp}
                />
                <button className="msger_send_btn" onClick={sendMessage}>전송</button>
            </div>
        </div>
    )
}

export default Chatting;