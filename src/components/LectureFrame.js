import { call } from "../service/ApiService";
import Lecture from "./Lecture";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function LectureFrame() {
    const navigate = useNavigate();
    const { lecturecode } = useParams();
    const [lecturename, setLecturename] = useState('');
    const [nickname, setNickname] = useState('');
    const [role, setRole] = useState('');
    const [ready, setReady] = useState(false);

    useEffect(() => {
        console.log("rf");
        call(`/lecture/${lecturecode}`, "GET")
            .then((response) => {
                setLecturename(response.result.lectureName);
                setNickname(response.result.nickName);
                setRole(response.result.role);
            })
            .then(() => { setReady(true) })
            .catch(e => {console.log(e); });
    }, []);

    return (
        <>
            {ready &&
                <Lecture lecturecode={lecturecode} lecturename={lecturename} nickname={nickname} role={role} />
            }
        </>
    )
}

export default LectureFrame;