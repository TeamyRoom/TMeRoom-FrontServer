import React from 'react';
import axios from 'axios';

function QuestionDetail(props) {
    const { questionId, questionTitle, questionContent, authorNickname, createdAt } = props;    

    const editQustion = (questionId) => {
        axios.put(`/api/v1/lecture/${props.code}/question/${questionId}`,editQuestion)
        .then((response) => {
          console.log("질문 수정 성공", response);
        })
        .catch((error) => {
          console.log("질문 수정 실패", error);
        })
      }
  
    const deleteQuestion = (questionId) => {
        axios.delete(`/api/v1/lecture/${props.code}/question/${questionId}`)
        .then((response) => {
            console.log("질문 삭제 성공", response);
        })
        .catch((error) => {
            console.log("질문 삭제 실패", error);
        })
    }

    const editQustionVisibility = (questionId) => {
        axios.put(`/api/v1/lecture/${props.code}/question/${questionId}/public`)
        .then((response) => {
          console.log("질문 공개 수정 성공", response);
        })
        .catch((error) => {
          console.log("질문 공개 수정 실패", error);
        })
      }

    return (
        <div>
            <p>{fileName}</p>
            <p>{fileUploaderNickName}</p>
            <a href={fileLink} target='_blank' rel='noreferrer'>download</a>
            <button onClick={handleDeleteFile}>Delete</button>
        </div>
    );
};

export default QuestionDetail;
