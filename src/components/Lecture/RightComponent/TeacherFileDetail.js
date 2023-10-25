import React from 'react';
import axios from 'axios';
import {call} from '../../../service/ApiService'

function TeacherFileDetail(props) {
    const { fileId, fileLink, fileName, fileUploaderNickname } = props;    

    function handleDeleteFile() {
        call(`/lecture/${props.lecturecode}/file/${fileId}`,"DELETE")
        .then(() => {
            alert("해당 파일이 삭제되었습니다.");
        });

    }

    return (
        <div>
            <p className='file-name-Library'>{fileName}</p>
            <p className='file-uploader-Library'> | {fileUploaderNickname}</p>
            <a href={fileLink} target='_blank' rel='noreferrer'><img src='/images/download.png' className='download-button-Library' alt='DOWNLOAD'></img></a>
            <img src='/images/delete.png' className='delete-button-Library' onClick={handleDeleteFile} alt='DELETE'></img>
        </div>
    );
};

export default TeacherFileDetail;
