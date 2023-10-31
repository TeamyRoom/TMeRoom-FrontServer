import React, {useState, useEffect} from 'react';
import "../../../css/QuestionDetail.css";
import {call} from '../../../service/ApiService';
import {Button, Divider} from '@mui/material';

function StudentQuestionDetail(props) {
    const { questionId, authorNickname, createdAt, content, title } = props;
    const [viewEditQuestion, setViewEditQuestion] = useState("false");
    const [questionTitle, setQuestionTitle] = useState(title);
    const [questionContent, setQuestionContent] = useState(content);
    const [questionVisibility, setQuestionVisibility] = useState("public");
    const [commentList, setCommentList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [comment, setComment] = useState("");
    const [reload, setReload] = useState(true);

    useEffect(() => {
      renderCommentList();
     },[,currentPage,reload]);
  
    const renderCommentList = () => {
      const params = {
        page: currentPage-1,
        size: 4
      };

      call(`/lecture/${props.lecturecode}/question/${questionId}/comments`, "GET", params)
        .then((response) => {
            setCommentList(response.result.content);
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
        props.deleteQuestion();
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
        setComment('');
        setCurrentPage(1);
        setReload(!reload);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    const deleteComment = (commentId) => {
      call(`/lecture/${props.lecturecode}/question/${questionId}/comment/${commentId}`, "DELETE")
      .then((response) => {
        setReload(!reload);
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

    function handleKeyUp(event) {
      if (event.key === 'Enter' ) {
        if (event.nativeEvent.isComposing === false) {
          event.preventDefault();
          postComment();
        }
      }
  }

    return (
      <div>
          <div className="msg_bubble_wrap-qna">
              {viewEditQuestion === true ? (
              <div className="msg_bubble-qna">
                <input maxLength='15' onChange={handleChangeQuestionTitle} className="different-title-qna" value={questionTitle}></input>
                <div className="different-footer-qna">
                 <p><span className="different-nickname-qna">{authorNickname}</span></p>
                  <p><span className="different-time-qna">{createdAt[0]}.{createdAt[1]}.{createdAt[2]} {createdAt[3]}:{createdAt[4]}</span></p>
                </div>
                <textarea onChange={handleChangeQuestionContent} className="different-detail-qna" value={questionContent}></textarea>
                <div className="different-footer-qna">
                <div className="msger_input_container">
                    <div className="dropdown">
                      <Button className="dropbtn">공개 여부</Button>
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
                  
                  <Button variant="contained" className="different-nickname-qna-edit" onClick={editQustion}>수정</Button>

                </div>
              </div>
                ) : (
            <div>
              <div className="msg_bubble-qna">
                <p><span className="different-title-qna">{questionTitle}</span></p>
                <Divider/>
                <div className="different-footer-qna">
                  <p><span className="different-nickname-qna">{authorNickname}</span></p>
                  <p><span className="different-time-qna">{createdAt[0]}.{createdAt[1]}.{createdAt[2]} {createdAt[3]}:{createdAt[4]}</span></p>
                </div>
                <div className="different-detail-qna">{questionContent}</div>
                <div className="different-footer-qna">
                <Button className="different-nickname-qna" onClick={editButtonClcik}>수정</Button>
                <Button className="different-nickname-qna-close" onClick={deleteQuestion}>삭제</Button>
                </div>
              </div>
              <div className='comment-area'>
                {commentList.map((data, index) => (
                  <p key={index}>{data.commenterNickname} : {data.content}  <p className='time-type'>{data.createdAt[0]}.{data.createdAt[1]}.{data.createdAt[2]} {data.createdAt[3]}:{data.createdAt[4]}</p><img src='/images/delete.png' className='comment-delete' onClick={() => {deleteComment(data.commentId)}}></img><Divider light/></p>
                ))}
                <div className='page-number'>
                {Array.from({length:totalPages},(_,index) => (
                  <button key={index} onClick={() => handlePageChange(index+1)} className='page-number-button'>
                    {index+1}
                  </button>
                ) )}
                </div>
                <input placeholder=" 댓글을 남겨주세요." onKeyDown={handleKeyUp} maxLength='50' className='comment-input' value={comment} onChange={handleCommentChange}></input><button className='comment-enter' onClick={postComment}>작성</button>
              </div>
            </div>
                )}
              </div>
              </div>
            
    );
};

export default StudentQuestionDetail;
