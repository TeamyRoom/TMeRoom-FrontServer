import React from 'react';
import axios from 'axios';

function StudentFileDetail(props) {
    const { fileId, fileLink, fileName, fileUploaderNickName } = props;    

    return (
        <div>
            <p>{fileName}</p>
            <p>{fileUploaderNickName}</p>
            <a href={fileLink} target='_blank' rel='noreferrer'><img src='./assets/download.png' >download</img></a>
        </div>
    );
};

export default StudentFileDetail;
