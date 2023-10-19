import React, {useState, useEffect} from 'react';
import axios from 'axios';

function StudentQuestionDetail(props) {
    const { questionId, authorNickname, createdAt } = props;    
    const [viewEditQuestion, setViewEditQuestion] = useState("false");
    const [questionTitle, setQuestionTitle] = useState(props.title);
    const [questionContent, setQuestionContent] = useState(props.content);
    const [questionVisibility, setQuestionVisibility] = useState(props.isPublic ? "public" : "private");
    const [commentList, setCommentList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [comment, setComment] = useState("");

    useEffect(() => {
      if (!viewEditQuestion) {
        renderCommentList();                
      }
     },[],viewEditQuestion);

  
    const renderCommentList = () => {
      axios.get(`/api/v1/lecture/${props.lecturecode}/questions/${questionId}/comments`, currentPage)
      .then((response) => {
          setCommentList(response.data);
          setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
          console.log("답변리스트 불러오기 실패",error);
      })
    }

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

    const postComment = () => {
        axios.post(`/api/v1/lecture/${props.lecturecode}/question/${questionId}/comment`, comment)
        .then((response) => {
          console.log("댓글 업로드 성공", response);
        })
        .catch((error) => {
          console.log("댓글 업로드 실패", error);
        })
        renderCommentList();
    }

    const deleteComment = (commentId) => {
      axios.delete(`/api/v1/lecture/${props.lecturecode}/question/${questionId}/comment/${commentId}`)
      .then((response) => {
        console.log("댓글 삭제 성공", response);
      })
      .catch((error) => {
        console.log("댓글 삭제 실패", error);
      })
      renderCommentList();
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

    const handlePageChange = (page) => {
      setCurrentPage(page);
      renderCommentList();
    }

    const handleCommentChange = (e) => {
      setComment(e.target.value);
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
            <div>
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
              <div className="msg_bubble">
                {commentList.map((data, index) => {
                  <p key={index}>{data.commenterNickname} | {data.content} | {data.createdAt}<button onClick={deleteComment(data.commentId)}>DELETE</button></p>
                })}
                {Array.from({length:totalPages},(_,index) => {
                  <button key={index} onClick={() => {handlePageChange(index+1)}} className={currentPage === index+1 ? 'active' :''}>
                    {index+1}
                  </button>
                } )}
                <input onChange={handleCommentChange}></input><button onClick={postComment}>게시</button>
              </div>
            </div>
                )}
              
            
          </div>
        </main>
      </div>
    );
};

export default StudentQuestionDetail;
