import React, {useState} from 'react';
import axios from 'axios';

function TeacherQuestionDetail(props) {
    const { questionId, authorNickname, createdAt } = props;    
    const [viewEditQuestion, setViewEditQuestion] = useState("false");
    const [questionTitle, setQuestionTitle] = useState(props.title);
    const [questionContent, setQuestionContent] = useState(props.content);
    const [questionVisibility, setQuestionVisibility] = useState(props.isPublic ? "public" : "private");

    const editButtonClcik = () => {
      setViewEditQuestion(true);
    }

    const editQustion = () => {
      const editQuestionData = {
        title : questionTitle,
        content : questionContent,
        isPublic : questionVisibility==='public' ? true : false
      };

      const editQuestion = JSON.stringify(editQuestionData);

      axios.put(`/api/v1/lecture/${props.lecturecode}/question/${questionId}`,editQuestion)
      .then((response) => {
        console.log("질문 수정 성공", response);
      })
      .catch((error) => {
        console.log("질문 수정 실패", error);
      })

      setViewEditQuestion(false);
    }
  
    const deleteQuestion = () => {
        axios.delete(`/api/v1/lecture/${props.lecturecode}/question/${questionId}`)
        .then((response) => {
            console.log("질문 삭제 성공", response);
        })
        .catch((error) => {
            console.log("질문 삭제 실패", error);
        })
    }

    const editQustionVisibility = (questionId) => {
        axios.put(`/api/v1/lecture/${props.lecturecode}/question/${questionId}/public`)
        .then((response) => {
          console.log("질문 공개 수정 성공", response);
        })
        .catch((error) => {
          console.log("질문 공개 수정 실패", error);
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
              {viewEditQuestion === true ? (
              <div className="msg_bubble">
                <input onChange={handleChangeQuestionTitle} className="different-title">{questionTitle}</input>
                <input onChange={handleChangeQuestionContent} className="different-detail">{questionContent}</input>
                <div className="different-footer">
                  <p><span className="different-nickname">{authorNickname}</span></p>
                  <button class="different-nickname" onClick={editQustion}>확인</button>
                  <p><span className="different-time">{createdAt}</span></p>
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
                ) : (
              <div className="msg_bubble">
                <p><span className="different-title">{questionTitle}</span></p>
                <p><span className="different-detail">{questionContent}</span></p>
                <div className="different-footer">
                  <p><span className="different-nickname">{authorNickname}</span></p>
                  <button class="different-nickname" onClick={editButtonClcik}>수정</button>
                  <button class="different-nickname" onClick={deleteQuestion}>삭제</button>
                  <p><span className="different-time">{createdAt}</span></p>
                </div>
              </div>
                )}
              
            <div className="msg_bubble">
              <p><span className="teacher-title">질문답변:TEST</span></p>
              <p><span className="teacher-answer">해당 문제는 이렇게 하면 됩니다.</span></p>
            </div>
          </div>
        </main>
      </div>
    );
};

export default TeacherQuestionDetail;
