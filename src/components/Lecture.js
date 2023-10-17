import { useParams } from "react-router-dom";
import TeacherScreen from "./TeacherScreen";
import StudentScreen from "./StudentScreen";
import Chatting from "./Chatting";
import "../css/Lecture.css"
import { useEffect, useRef, useState } from "react";
import Question from "./Question";
import File from "./File";

function Lecture(props) {

    const [lecturecode, setLecturecode] = useState('');
    const [lecturename, setLecturename] = useState('');
    const [nickname, setNickname] = useState('');
    const [role, setRole] = useState('');

    const [isChattingVisible, setChattingVisible] = useState(true);
    const [isQuestionVisible, setQuestionVisible] = useState(false);
    const [isFileVisible, setFileVisible] = useState(false);
    const [isVideoOn, setVideoOn] = useState(true);
    const [isMikeOn, setMikeOn] = useState(false);
    const teacherRef = useRef({});
    const studentRef = useRef({});

    useEffect(() => {
        setLecturecode(props.lecturecode);
        setLecturename(props.lecturename);
        setNickname(props.nickname);
        setRole(props.role);
    }, [])

    const allFalse = () => {
        setChattingVisible(false);
        setQuestionVisible(false);
        setFileVisible(false);
    }

    const toggleChatting = () => {
        if (!isChattingVisible) {
            allFalse();
        }
        setChattingVisible(!isChattingVisible);
    };

    const toggleQuestion = () => {
        if (!isQuestionVisible) {
            allFalse();
        }
        setQuestionVisible(!isQuestionVisible);
    }

    const toggleFile = () => {
        if (!isFileVisible) {
            allFalse();
        }
        setFileVisible(!isFileVisible);
    }

    const toggleCamera = () => {

        teacherRef.current.handleCamera();
        setVideoOn(!isVideoOn);

    }

    const toggleAudio = () => {
        if (role === 'teacher') teacherRef.current.handleAudio();
        else studentRef.current.handleAudio();
        setMikeOn(!isMikeOn);
    }

    return (

        <div className="lecture_area">
            <div className="lecture_body">
                {role === 'teacher' &&
                    <TeacherScreen lecturecode={lecturecode} ref={teacherRef} />
                }
                {role === 'student' &&
                    <StudentScreen lecturecode={lecturecode} ref={studentRef} />
                }
                <div className="right-component" style={{ display: isChattingVisible ? 'inline-table' : 'none' }}>
                    <Chatting lecturecode={lecturecode} nickname={nickname} />
                </div>
                {isQuestionVisible &&
                    <div className="right-component">
                        <Question />
                    </div>
                }
                {isFileVisible &&
                    <div className="right-component">
                        <File />
                    </div>
                }
            </div>
            <div className="lecture_footer">
                <div className="lecture_name">
                    <span className="txt">{lecturename}</span>
                </div>
                <div className="ico_area">
                    <div className="ico_list bdr_raius">
                        <a className="ico_btn" href="#">
                            <img className="ico" src={isMikeOn ? "/images/mikeon.png" : "/images/mikeoff.png"} onClick={toggleAudio} />
                        </a>
                        {role === 'teacher' &&
                            <a className="ico_btn" href="#">
                                <img className="ico" src={isVideoOn ? "/images/videoon.png" : "/images/videooff.png"} onClick={toggleCamera} />
                            </a>
                        }
                        <a className="ico_btn" href="#">
                            <img className="ico" src="/images/sub.png" />
                        </a>
                        <a className="ico_btn" href="#">
                            <img className="ico" src="/images/imoji.png" />
                        </a>
                        <a className="ico_btn" href="#">
                            <img className="ico" src="/images/screenshare.png" />
                        </a>
                        <a className="ico_btn" href="#">
                            <img className="ico" src="/images/hands-up.png" />
                        </a>
                        <a className="ico_btn" href="#">
                            <img className="ico" src="/images/3dot.png" />
                        </a>
                        <a className="ico_btn" href="#">
                            <img className="ico" src="/images/call.png" />
                        </a>
                    </div>
                </div>
                <div className="etc_area">
                    <div className="etc_list bdr_raius">

                        <a className="etc_btn" href="#">
                            <img className="ico" src="/images/upload.png" />
                        </a>
                        <a className="etc_btn" href="#">
                            <img className="ico" src="/images/information.png" onClick={toggleFile} />
                        </a>
                        <a className="etc_btn" href="#">
                            <img className="ico" src="/images/friends.png" onClick={toggleQuestion} />
                        </a>
                        <a className="etc_btn" href="#">
                            <img className="ico" src="/images/chat.png" onClick={toggleChatting} />
                        </a>
                        <a className="etc_btn" href="#">
                            <img className="ico" src="/images/lock.png" />
                        </a>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Lecture;