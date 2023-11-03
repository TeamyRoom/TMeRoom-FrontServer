import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FileDetail from './TeacherFileDetail';
import "../../../css/File.css";
import { call, getAccessToken } from "../../../service/ApiService.js"
import {Button} from '@mui/material';

function TeacherFile(props) {
    const [uploadFile, setUploadFile] = useState("");
    const [searchFileType, setSearchFileType] = useState('');
    const [searchFileName, setSearchFileName] = useState('');
    const [searchedFiles, setSearchedFiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        searchFile();
    },[,currentPage]);


    const handleSearchFileTypeChange = (e) => {
        setSearchFileType(e.target.value);
    };

    const handleSearchFileNameChange = (e) => {
        setSearchFileName(e.target.value);
    };

    const handleFileUpload = () => {
         call(`/lecture/${props.lecturecode}/file`, "POST", uploadFile, "file")
         .then((response) => {
            if (response.resultCode === "SUCCESS") {
                alert("파일이 저장되었습니다.")
                handleFileDetail();
            }            
         });         
    };

    const handleUploadFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            if (selectedFile.size > 50 * 1024 * 1024) {
                alert ("파일 크기는 50MB 제한입니다.");
                e.target.value='';
            } else {
                setUploadFile(selectedFile);
            }
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }


    const searchFile = () => {
        const searchfile = {
            type : searchFileType,
            key : searchFileName,
            page: currentPage-1, 
            size: 10
        }
        call(`/lecture/${props.lecturecode}/file`, "GET", searchfile)
        .then((response) => {
            console.log(response);
            setSearchedFiles(response.result.content);
            setTotalPages(response.result.totalPages);
        });
    }

    const handleFileDetail = () => {
        searchFile();
        setCurrentPage(1);
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            if (e.nativeEvent.isComposing === false) {
                e.preventDefault();
                searchFile();
            }
        }
    }
    

    return (
        <div className="chat_area-Library">
            <main className="msger_chat-Library">
                <p className="Resource-Library">자료실</p>
                <div className="search-container-Library">
                <select
                    id="fileTypeDropdown"
                    className="file-type-dropdown-Library"
                    value={searchFileType}
                    onChange={handleSearchFileTypeChange}
                >
                    <option value="">모두</option>
                    <option value="DOCUMENT">문서</option>
                    <option value="IMAGE">사진</option>
                    <option value="VIDEO">영상</option>
                    <option value="AUDIO">음성</option>
                    <option value="ARCHIVE">압축</option>
                    <option value="CODE">코드</option>
                    <option value="EXE">실행</option>
                    <option value="ETC">기타</option>
                </select>
                <input
                    type="text"
                    id="searchBox"
                    className="search-inputLibrary"
                    placeholder="검색어를 입력하세요"
                    value={searchFileName}
                    onChange={handleSearchFileNameChange}
                    onKeyDown={handleKeyDown}
                />
                <Button className="search-button-Library" onClick={searchFile}>검색</Button>
                </div>
                <div className="msg_bubble-Library">
                <div className="msg_text-Library">
                    <div className="file-info-Library">
                    파일명           |            업로더
                    {searchedFiles.map((data, index) => (
                        <FileDetail 
                        key={index} 
                        fileId={data.fileId} 
                        fileLink={data.fileLink} 
                        fileName={data.fileName} 
                        fileUploaderNickname={data.fileUploaderNickname} 
                        lecturecode={props.lecturecode}
                        deleteFile={handleFileDetail} />
                    ))
                    }
                    
                    </div>
                </div>
            </div>
            <div className='page-number'>
                {Array.from({length:totalPages},(_,index) => (
                    <button className='page-number-button' 
                    key={index} onClick={() => handlePageChange(index+1)} >
                        {index+1}   
                    </button>
                ))}
            </div>
            <div className="msger_inputarea-file">
                <input
                type="file"
                className="msger_input"
                placeholder="파일 업로드"
                onChange={handleUploadFileChange}
                />
                <button className="msger_send_btn-file" onClick={handleFileUpload}>
                업로드
                </button>
            </div>
            </main>
        </div>
    );
};

export default TeacherFile;
