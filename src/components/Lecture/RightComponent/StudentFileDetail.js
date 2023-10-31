import React from 'react';
import axios from 'axios';
import {call} from '../../../service/ApiService'
import {Button, Divider} from '@mui/material';
import "../../../css/File.css"

function StudentFileDetail(props) {
    const { fileId, fileLink, fileName, fileUploaderNickname } = props;    

    return (
        <div className='file-list'>
            <p className='file-name-Library'>{fileName}</p>
            <p className='file-uploader-Library'> | {fileUploaderNickname}</p>
            <a href={fileLink} target='_blank' rel='noreferrer'><img src='/images/download.png' className='download-button-Library' alt='DOWNLOAD'></img></a>
            <Divider/>
        </div>
    );
};

export default StudentFileDetail;
