import React, { useState } from 'react';
import axios from 'axios';
import FileDetail from './TeacherFileDetail';
import { call, getAccessToken } from "../../../service/ApiService.js"

function TeacherFile(props) {
    const [uploadFile, setUploadFile] = useState("");
    const [searchFileType, setSearchFileType] = useState('');
    const [searchFileName, setSearchFileName] = useState('');
    const [searchedFiles, setSearchedFiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleSearchFileTypeChange = (e) => {
        setSearchFileType(e.target.value);
    };

    const handleSearchFileNameChange = (e) => {
        setSearchFileName(e.target.value);
    };

    const handleFileUpload = () => {
         call(`/lecture/${props.lecturecode}/file`, "POST", uploadFile, "file");         
    };

    const handleUploadFileChange = (e) => {
        setUploadFile(e.target.files[0]);
        console.log("이 파일이야?", e.target.files[0]);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        searchFile();
    }


    const searchFile = () => {
        const searchfile = {
            type : searchFileType,
            key : searchFileName,
            page: currentPage-1, 
        }
        call(`/lecture/${props.lecturecode}/file`, "GET", searchfile)
        .then((response) => {
            console.log(response);
            setSearchedFiles(response.result.content);
            setTotalPages(response.result.totalPages);
        });
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
                    <option value="ETC">기타</option>
                </select>
                <input
                    type="text"
                    id="searchBox"
                    className="search-inputLibrary"
                    placeholder="검색어를 입력하세요"
                    value={searchFileName}
                    onChange={handleSearchFileNameChange}
                />
                <button className="search-button-Library" onClick={searchFile}>검색</button>
                </div>
                <div className="msg_bubble-Library">
                <div className="msg_text-Library">
                    <div className="file-info-Library">
                    파일명 | 업로더 | 업로드 날짜
                    {searchedFiles.map((data, index) => (
                        <FileDetail 
                        key={index} 
                        fileId={data.fileId} 
                        fileLink={data.fileLink} 
                        fileName={data.fileName} 
                        fileUploaderNickname={data.fileUploaderNickname} 
                        lecturecode={props.lecturecode} />
                    ))
                    }
                    
                    </div>
                </div>
            </div>
            <div className='page-number'>
                {Array.from({length:totalPages},(_,index) => (
                    <button key={index} onClick={() => handlePageChange(index+1)} className={currentPage === index+1 ? "active" : ""}>
                        {index+1}   
                    </button>
                ))}
            </div>
            </main>
            <div className="msger_inputarea">
                <input
                type="file"
                className="msger_input"
                placeholder="파일 업로드"
                onChange={handleUploadFileChange}
                />
                <button className="msger_send_btn" onClick={handleFileUpload}>
                업로드
                </button>
            </div>
        </div>
    );
};

export default TeacherFile;
