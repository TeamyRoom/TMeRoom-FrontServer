import Chatting from "./Chatting";
import StudentScreen from "./StudentScreen";
import { useParams } from "react-router-dom";
import { useState } from "react";
import File from "./File";
import Question from "./Question";
import '../css/Screen.css';

function Student() {
    const { code } = useParams();
    const { nickname } = useParams();
    const [isChattingVisible, setChattingVisible] = useState(false);
    const [isQuestionVisible, setQuestionVisible] = useState(false);
    const [isFileVisible, setFileVisible] = useState(false);

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

    return (
        <div>
            <div className='screen'>
                <StudentScreen code={code} />
                <div className="right-component" style={{ display: isChattingVisible ? 'block' : 'none' }}>
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
            <button onClick={toggleChatting}>
                {isChattingVisible ? '채팅OFF' : '채팅ON'}
            </button>
            <button onClick={toggleQuestion}>
                {isQuestionVisible ? '질문게시판' : '질문게시판'}
            </button>
            <button onClick={toggleFile}>
                {isQuestionVisible ? '자료공유' : '자료공유'}
            </button>
        </div>
    )
}

export default Student;