import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "../../../css/QuestionDetail.css";
import {call} from '../../../service/ApiService';

function TeacherQuestionDetail(props) {
    const { questionId, authorNickname, createdAt, content, title } = props;    
    const [viewEditQuestion, setViewEditQuestion] = useState("false");
    const [questionTitle, setQuestionTitle] = useState(title);
    const [questionContent, setQuestionContent] = useState(content);
    const [questionVisibility, setQuestionVisibility] = useState("");
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
      const params = {
        page: currentPage-1,
      };

      call(`/lecture/${props.lecturecode}/question/${questionId}/comments`, "GET", params)
        .then((response) => {
            setCommentList(response.result.content);
            console.log("댓글명단이요" , response);
            setTotalPages(response.result.totalPages);
        })
        .catch((error) => {
          console.log(error);
        });
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

      call(`/lecture/${props.lecturecode}/questions/${questionId}`, "PUT", editQuestionData)
        .then((response) => {
        console.log("질문 수정 성공", response);
        setViewEditQuestion(false);
        })
        .catch((error) => {
          console.log(error);
        });
      
    }
  
    const deleteQuestion = () => {

      call(`/lecture/${props.lecturecode}/questions/${questionId}`, "DELETE")
        .then((response) => {
        console.log("질문 삭제 성공", response);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const editQustionVisibility = () => {

      call(`/lecture/${props.lecturecode}/questions/${questionId}/public`, "PUT")
        .then((response) => {
        console.log("질문 공개 수정 성공", response);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const postComment = () => {
      const postcomment = {
        content : comment
      }

      call(`/lecture/${props.lecturecode}/question/${questionId}/comment`, "POST", postcomment)
      .then((response) => {
      console.log("댓글 등록 성공", response);
      })
      .catch((error) => {
        console.log(error);
      });

      renderCommentList();
    }

    const deleteComment = (commentId) => {

      call(`/lecture/${props.lecturecode}/question/${questionId}/comment/${commentId}`, "DELETE")
      .then((response) => {
      console.log("댓글 삭제 성공", response);
      })
      .catch((error) => {
        console.log(error);
      });

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
      <div>
          <button className="icon-button-qna">
            <img src="image/alarm-bell-symbol.png" alt="아이콘 이미지" />
          </button>
          <div className="msg_bubble_wrap-qna">
              {viewEditQuestion === true ? (
              <div className="msg_bubble-qna">
                <input onChange={handleChangeQuestionTitle} className="different-title-qna">{questionTitle}</input>
                <input onChange={handleChangeQuestionContent} className="different-detail-qna">{questionContent}</input>
                <div className="different-footer-qna">
                  <p><span className="different-nickname-qna">{authorNickname}</span></p>
                  <button class="different-nickname-qna" onClick={editQustion}>확인</button>
                  <p><span className="different-time-qna">{createdAt}</span></p>
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
              <div className="icon-button" >
                <img src="./assets/back.png"/>
              </div>
              <div className="msg_bubble-qna">
                <p><span className="different-title-qna">{questionTitle}</span></p>
                <p><span className="different-detail-qna">{questionContent}</span></p>
                <div className="different-footer-qna">
                  <p><span className="different-nickname-qna">{authorNickname}</span></p>
                  <button class="different-nickname-qna" onClick={editButtonClcik}>수정</button>
                  <button class="different-nickname-qna" onClick={deleteQuestion}>삭제</button>
                  <p><span className="different-time-qna">{createdAt}</span></p>
                </div>
              </div>
              <div className="msg_bubble">
                {commentList.map((data, index) => (
                  <p key={index}>{data.commenterNickname} | {data.content} | {data.createdAt}</p>
                ))}
                {Array.from({length:totalPages},(_,index) => (
                  <button key={index} onClick={() => {handlePageChange(index+1)}} className={currentPage === index+1 ? 'active' :''}>
                    {index+1}
                  </button>
                ) )}
                <input onChange={handleCommentChange}></input><button onClick={postComment}>게시</button>
              </div>
            </div>
                )}
              </div>
              </div>
            
    );
};

export default TeacherQuestionDetail;
