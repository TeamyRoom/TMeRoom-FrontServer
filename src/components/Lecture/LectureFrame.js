import { accessLecture, call, getAccessToken } from "../../service/ApiService";
import Lecture from "./Lecture";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Login from "../SinglePage/Login";

function LectureFrame() {
    const { lecturecode } = useParams();
    const [lecturename, setLecturename] = useState('');
    const [nickname, setNickname] = useState('');
    const [role, setRole] = useState('');
    const [ready, setReady] = useState(false);
    const loginRef = useRef({});

    useEffect(() => {

        if (getAccessToken() === null) {
            loginRef.current.modalOpen();
        }
        else {

            accessLecture(lecturecode)
                .then((response) => {
                    if (response.resultCode !== "SUCCESS") {
                        if (response.resultCode === "INVALID_ACCESS_PERMISSION") {
                            var application = window.confirm("해당 강의에 수강신청 하시겠습니까?");
                            if (application) {
                                call(`/lecture/${lecturecode}/application`, "POST")
                                    .then(() => alert("수강신청 되었습니다."))
                                    .then(() => { window.location.href = "/"; });
                            }
                            else {
                                window.location.href = "/";
                                return false;
                            }
                        }
                        else {
                            alert(response.result);
                            window.location.href = "/";
                        }
                    }
                    else {
                        setLecturename(response.result.lectureName);
                        setNickname(response.result.nickName);
                        setRole(response.result.role);
                        return true;
                    }

                })
                .then((render) => { if (render) setReady(true) })
                .catch(e => { console.log(e); });

        }

    }, []);

    return (
        <>
            {ready &&
                <Lecture lecturecode={lecturecode} lecturename={lecturename} nickname={nickname} role={role} />
            }
            <Login ref={loginRef} />
        </>
    )
}

export default LectureFrame;