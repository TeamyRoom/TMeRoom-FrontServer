import {useState} from 'react';
import axios from 'axios';

function NewQuestionForm(props) {
    const {questionTitle, setQuestionTitle} = useState('');
    const {questionContent, setQuestionContent} = useState('');
    const {questionVisibility, setQuestionVisibility} = useState('');


    
    const uploadQuestion = () => {
        const questionData = {
            title : questionTitle,
            content : questionContent,
            isPublic : questionVisibility==='public' ? true : false
        };

        const question = JSON.stringify(questionData);

        axios.post(`/api/v1/lecture/${props.code}/question`,question, {
            headers: {
                'Content-Type': 'application/json'
              }
        })
        .then((response) => {
          console.log("질문 업로드 성공", response);
        })
        .catch((error) => {
          console.log("질문 업로드 실패", error);
        })
      }


    const handleChangeQuestionTitle = (e) => {
      setQuestionTitle(e.target.value);
    }

    const handleChangeQuestionContent = (e) => {
      setQuestionContent(e.target.value);
    }

    const handleChangeQuestionVisibility = (e) => {
        setQuestionVisibility(e.target.value);
    }

    return (
      <div className="chat_area">
        <main className="msger_chat">
          <p className="Resource">Q&A</p>
          <div className="body"></div>
          <button className="icon-button" onClick={this.myFunction}>
            <img src="image/alarm-bell-symbol.png" alt="아이콘 이미지" />
          </button>
          <div className="msg_bubble_wrap">       
              <div className="msg_bubble">
                <div className="different-footer">
                <div className="msg_bubble">
                    <p>제목:</p><input onChange={handleChangeQuestionTitle} className="different-title"></input>
                    <p>내용:</p><input onChange={handleChangeQuestionContent} className="different-detail"></input>
                        <div className="different-footer">
                        <button class="different-nickname" onClick={uploadQuestion}>확인</button>
                        <div className="msger_input_container">
                            <div className="dropdown">
                            <button className="dropbtn">공개 여부</button>
                            <div className="dropdown-content">
                                <label>
                                <input
                                    type="radio"
                                    name="privacy"
                                    value="public"
                                    checked={questionVisibility === 'public'}
                                    onChange={handleChangeQuestionVisibility}
                                />
                                공개
                                </label>
                                <label>
                                <input
                                    type="radio"
                                    name="privacy"
                                    value="private"
                                    checked={questionVisibility === 'private'}
                                    onChange={handleChangeQuestionVisibility}
                                />
                                비공개
                                </label>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
              </div>              
            <div className="msg_bubble">
              <p><span className="teacher-title">질문답변:TEST</span></p>
              <p><span className="teacher-answer">해당 문제는 이렇게 하면 됩니다.</span></p>
            </div>
          </div>
        </main>
      </div>
    );
};

export default NewQuestionForm;
