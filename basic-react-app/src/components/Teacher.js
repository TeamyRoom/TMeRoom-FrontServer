import { useParams } from "react-router-dom";
import TeacherScreen from "./TeacherScreen"
import Chatting from "./Chatting";
import "../css/Lecture.css"
import { useRef, useState } from "react";
import Question from "./Question";
import File from "./File";

function Teacher() {
    const { code } = useParams();
    const { nickname } = useParams();
    const [isChattingVisible, setChattingVisible] = useState(false);
    const [isQuestionVisible, setQuestionVisible] = useState(false);
    const [isFileVisible, setFileVisible] = useState(false);
    const screenRef = useRef({});

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
        screenRef.current.handleCamera();
    }

    return (

        <div className="lecture_area">
            <div className="lecture_body">
                <TeacherScreen code={code} ref={screenRef}/>
                <div className="right-component" style={{ display: isChattingVisible ? 'inline-table' : 'none' }}>
                    <Chatting code={code} nickname={nickname} />
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
                    <span className="txt">카카오클라우드스쿨 3기 개발자반</span>
                </div>
                <div className="ico_area">
                    <div className="ico_list bdr_raius">
                        <a className="ico_btn" href="#">
                            <img className="ico" src="/images/icon.png" />
                        </a>
                        <a className="ico_btn" href="#">
                            <img className="ico" src="/images/video.png" onClick={toggleCamera}/>
                        </a>
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
                            <img className="ico" src="/images/information.png" onClick={toggleQuestion} />
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
export default Teacher;