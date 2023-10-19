import { call, getAccessToken } from "../service/ApiService";
import Lecture from "./Lecture";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Login from "./Login";

function LectureFrame() {
    const navigate = useNavigate();
    const { lecturecode } = useParams();
    const [lecturename, setLecturename] = useState('');
    const [nickname, setNickname] = useState('');
    const [role, setRole] = useState('');
    const [ready, setReady] = useState(false);
    const loginRef = useRef({});

    useEffect(() => {

        if(getAccessToken() === null) {
            loginRef.current.modalOpen();
        }
        else {
            call(`/lecture/${lecturecode}`, "GET")
            .then((response) => {
                if(response.resultCode !== "SUCCESS") {
                    window.location.href = "/";
                    return false;
                }
                else {
                    setLecturename(response.result.lectureName);
                    setNickname(response.result.nickName);
                    setRole(response.result.role);
                    return true;
                }

            })
            .then((render) => {if(render) setReady(true)})
            .catch(e => {console.log(e); });
        }

    }, []);

    return (
        <>
            {ready &&
                <Lecture lecturecode={lecturecode} lecturename={lecturename} nickname={nickname} role={role} />
            }
            <Login ref={loginRef}/>
        </>
    )
}

export default LectureFrame;