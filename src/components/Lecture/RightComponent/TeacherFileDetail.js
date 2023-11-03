import React from 'react';
import axios from 'axios';
import {call} from '../../../service/ApiService'
import {Button, Divider} from '@mui/material';
import "../../../css/File.css"

function TeacherFileDetail(props) {
    const { fileId, fileLink, fileName, fileUploaderNickname } = props;    

    function handleDeleteFile() {
        call(`/lecture/${props.lecturecode}/file/${fileId}`,"DELETE")
        .then((response) => {
            if (response.resultCode === "SUCCESS") {
                alert("해당 파일이 삭제되었습니다.");
                props.deleteFile();
            }
        });
    }

    function downloadFile() {
        window.open((fileLink), '_blank', 'noreferrer');
    }

    return (
        <div className='file-list'>
            <p className='file-name-Library'>{fileName}</p>
            <p className='file-uploader-Library'> | {fileUploaderNickname}</p>
            <img src='/images/download.png' className='download-button-Library' onClick={downloadFile} alt='DOWNLOAD'></img>
            <img src='/images/delete.png' className='delete-button-Library' onClick={handleDeleteFile} alt='DELETE'></img>
            <Divider/>
        </div>
    );
};

export default TeacherFileDetail;
