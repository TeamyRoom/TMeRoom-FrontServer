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
      renderCommentList();
     },[]);

     useEffect(() => {
      renderCommentList();
     },[currentPage]);


     
     
     
  
    const renderCommentList = () => {
      const params = {
        page: currentPage-1,
        size: 4
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

      call(`/lecture/${props.lecturecode}/question/${questionId}`, "PUT", editQuestionData)
        .then((response) => {
        console.log("질문 수정 성공", response, editQuestionData);
        setViewEditQuestion(false);
        })
        .catch((error) => {
          console.log(error);
        });
      
    }
  
    const deleteQuestion = () => {

      call(`/lecture/${props.lecturecode}/question/${questionId}`, "DELETE")
        .then((response) => {
        alert("삭제되었습니다.");
        renderCommentList();
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
        renderCommentList();
      })
      .catch((error) => {
        console.log(error);
      });

      setComment('');


    }

    const deleteComment = (commentId) => {

      call(`/lecture/${props.lecturecode}/question/${questionId}/comment/${commentId}`, "DELETE")
      .then((response) => {
      console.log("댓글 삭제 성공", response);
      })
      .catch((error) => {
        console.log(error);
      });

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

    }

    const handleCommentChange = (e) => {
      setComment(e.target.value);
    }

    return (
      <div>
          <div className="msg_bubble_wrap-qna">
              {viewEditQuestion === true ? (
              <div className="msg_bubble-qna">
                <input maxLength='15' onChange={handleChangeQuestionTitle} className="different-title-qna" value={questionTitle}></input>
                <textarea onChange={handleChangeQuestionContent} className="different-detail-qna" value={questionContent}></textarea>
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
              <div className="msg_bubble-qna">
                <p><span className="different-title-qna">{questionTitle}</span></p>
                <div className="different-footer-qna">
                  <p><span className="different-nickname-qna">{authorNickname}</span></p>
                  <p><span className="different-time-qna">{createdAt[0]}.{createdAt[1]}.{createdAt[2]} {createdAt[3]}:{createdAt[4]}</span></p>
                </div>
                <div className="different-detail-qna">{questionContent}</div>
                <div className="different-footer-qna">
                <button class="different-nickname-qna" onClick={editButtonClcik}>수정</button>
                  <button class="different-nickname-qna" onClick={deleteQuestion}>삭제</button>
                </div>
              </div>
              <div className='comment-area'>
                {commentList.map((data, index) => (
                  <p key={index}>{data.commenterNickname} : {data.content}  <p className='time-type'>{data.createdAt[0]}.{data.createdAt[1]}.{data.createdAt[2]} {data.createdAt[3]}:{data.createdAt[4]}</p></p>
                ))}
                <div className='page-number'>
                {Array.from({length:totalPages},(_,index) => (
                  <button key={index} onClick={() => handlePageChange(index+1)} className='page-number-button'>
                    {index+1}
                  </button>
                ) )}
                </div>
                <input maxLength='50' className='comment-input' value={comment} onChange={handleCommentChange}></input><button onClick={postComment}>게시</button>
              </div>
            </div>
                )}
              </div>
              </div>
            
    );
};

export default TeacherQuestionDetail;
