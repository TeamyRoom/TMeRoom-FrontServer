import { useEffect, useState } from "react"
import { call } from "../service/ApiService";

export default function Management(props) {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        call(`/lecture/${props.lecturecode}/applications?page=0`, "GET")
        .then((response) => {
            setApplications(response.result.content);
        });
    }, []);

    return (
        <div className="chat_area">
            <main className="msger_chat">
                <p>인원 관리</p>

                {applications.map((person, index) => (
                    <div key={index}>
                        <a>{person.memberNickname} / {person.applicantNickName} / {person.applicantEmail}</a>
                        <button>승인</button>
                        <button>반려</button>
                    </div>
                ))}
            </main>
        </div>
    )
}