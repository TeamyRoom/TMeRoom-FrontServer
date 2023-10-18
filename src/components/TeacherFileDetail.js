import React from 'react';
import axios from 'axios';

function TeacherFileDetail(props) {
    const { fileId, fileLink, fileName, fileUploaderNickName } = props;    

    function handleDeleteFile() {

        axios.delete(`/api/v1/lecture/${props.lecturecode}/file/${fileId}`)
        .then((response) => {
            console.log("해당 파일 삭제 성공", response);
        }) 
        .catch((error) => {
            console.log("파일 삭제 실패", error);
        })
    }

    return (
        <div>
            <p>{fileName}</p>
            <p>{fileUploaderNickName}</p>
            <a href={fileLink} target='_blank' rel='noreferrer'><img src='./assets/download.png' >download</img></a>
            <img src='./assets/delete.png' onClick={handleDeleteFile}>Delete</img>
        </div>
    );
};

export default TeacherFileDetail;
