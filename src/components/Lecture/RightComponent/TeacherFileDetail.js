import React from 'react';
import axios from 'axios';

function TeacherFileDetail(props) {
    const { fileId, fileLink, fileName, fileUploaderNickname } = props;    

    function handleDeleteFile() {

        axios.delete(`http://localhost:8080/api/v1/lecture/${props.lecturecode}/file/${fileId}`)
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
            <p>{fileUploaderNickname}</p>
            <a href={fileLink} target='_blank' rel='noreferrer'><img src='./assets/download.png' className='download-button-Library'></img></a>
            <img src='./assets/delete.png' className='delete-button-Library' onClick={handleDeleteFile}></img>
        </div>
    );
};

export default TeacherFileDetail;
