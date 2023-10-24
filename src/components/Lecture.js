import TeacherScreen from "./TeacherScreen";
import StudentScreen from "./StudentScreen";
import Chatting from "./Chatting";
import "../css/Lecture.css"
import { useRef, useState } from "react";
import TeacherQuestion from "./TeacherQuestion";
import StudentQuestion from "./StudentQuestion";
import TeacherFile from "./TeacherFile";
import StudentFile from "./StudentFile";
import { call } from "../service/ApiService";
import Management from "./Management";

function Lecture(props) {
    const [lectureName, setLecturename] = useState(props.lecturename);
    const [isBroadCast, setBroadCast] = useState(false);
    const [isChattingVisible, setChattingVisible] = useState(true);
    const [isQuestionVisible, setQuestionVisible] = useState(false);
    const [isFileVisible, setFileVisible] = useState(false);
    const [isManagementVisible, setManagementVisible] = useState(false);
    const [isVideoOn, setVideoOn] = useState(true);
    const [isMikeOn, setMikeOn] = useState(false);
    const [toggleName, setToggleName] = useState(false);
    const teacherRef = useRef({});
    const studentRef = useRef({});
    const nameRef = useRef(props.lecturename);

    const allFalse = () => {
        setChattingVisible(false);
        setQuestionVisible(false);
        setFileVisible(false);
        setManagementVisible(false);
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
        console.log(isQuestionVisible);
        setQuestionVisible(!isQuestionVisible);
    }

    const toggleFile = () => {
        if (!isFileVisible) {
            allFalse();
        }
        setFileVisible(!isFileVisible);
    }

    const toggleManagement = () => {
        if (!isManagementVisible) {
            allFalse();
        }
        setManagementVisible(!isManagementVisible);
    }

    const toggleCamera = () => {

        teacherRef.current.handleCamera();
        setVideoOn(!isVideoOn);

    }

    const toggleAudio = () => {
        if (isBroadCast) teacherRef.current.handleAudio();
        else studentRef.current.handleAudio();
        setMikeOn(!isMikeOn);
    }

    const handleChangeLectureName = () => {
        if (toggleName) {
            if (nameRef.current.value !== props.lecturename) {
                call(`/lecture/${props.lecturecode}`, 'PUT', { lectureCode: props.lecturecode, lectureName: nameRef.current.value })
                    .then(setLecturename(nameRef.current.value))
                    .catch((e) => { console.log(e) });
            }
            setToggleName(false);
        }
        else {
            setToggleName(true);
        }
    }

    const handleBroadCast = () => {
        if (isBroadCast) setBroadCast(false);
        else setBroadCast(true);
    }

    return (

        <div className="lecture_area">
            <div className="lecture_body">
                {isBroadCast ?
                    <TeacherScreen lecturecode={props.lecturecode} ref={teacherRef} />
                    :
                    <StudentScreen lecturecode={props.lecturecode} ref={studentRef} />
                }
                <div className="right-component" style={{ display: isChattingVisible ? 'inline-table' : 'none' }}>
                    <Chatting lecturecode={props.lecturecode} nickname={props.nickname} />
                </div>

                {isQuestionVisible && props.role !== 'student' &&
                    <div className="right-component">
                        <TeacherQuestion lecturecode={props.lecturecode} nickname={props.nickname} />
                    </div>
                }
                {isQuestionVisible && props.role === 'student' &&
                    <div className="right-component">
                        <StudentQuestion lecturecode={props.lecturecode} nickname={props.nickname} />
                    </div>
                }
                {isFileVisible && props.role !== 'student' &&
                    <div className="right-component">
                        <TeacherFile lecturecode={props.lecturecode} nickname={props.nickname} />
                    </div>
                }
                {isFileVisible && props.role === 'student' &&
                    <div className="right-component">
                        <StudentFile lecturecode={props.lecturecode} nickname={props.nickname} />
                    </div>
                }
                {isManagementVisible &&
                    <div className="right-component">
                        <Management lecturecode={props.lecturecode} />
                    </div>
                }
            </div>
            <div className="lecture_footer">
                <div className="lecture_name">
                    {toggleName ?
                        <input type="text" ref={nameRef} placeholder={lectureName} />
                        : <span className="txt">{lectureName}</span>
                    }

                    {props.role === 'manager' &&
                        <button className="btnChangeLectureName" onClick={handleChangeLectureName}>연필</button>
                    }
                </div>
                <div className="ico_area">
                    <div className="ico_list bdr_raius">
                        <a className="ico_btn" href="#">
                            <img className="ico" src={isMikeOn ? "/images/mikeon.png" : "/images/mikeoff.png"} onClick={toggleAudio} />
                        </a>
                        {isBroadCast &&
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
                        {props.role !== "student" &&
                            <a className="ico_btn" href="#">
                                <img className="ico" src="/images/screenshare.png" onClick={handleBroadCast} />
                            </a>
                        }

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
                        {props.role === "manager" &&
                            <a className="etc_btn" href="#">
                                <img className="ico" src="/images/lock.png" onClick={toggleManagement} />
                            </a>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Lecture;