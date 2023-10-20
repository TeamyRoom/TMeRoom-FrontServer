import React, { useState } from 'react';
import axios from 'axios';
import FileDetail from './TeacherFileDetail';
import { call, getAccessToken } from "../service/ApiService.js"

function TeacherFile(props) {
    const [uploadFile, setUploadFile] = useState("");
    const [searchFileType, setSearchFileType] = useState('선택 안 함');
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

    const handleFileUpload = async () => {

        await call(`/lecture/${props.lecturecode}/file`, "POST", uploadFile, "multipart/form-data");

        
        
    };

    const handleUploadFileChange = (e) => {
        setUploadFile(e.target.files[0]);
        console.log("이 파일이야?", e.target.files[0]);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }


    const searchFile = () => {
        axios.get(`http://localhost:8080/api/v1/lecture/${props.lecturecode}/file`, searchFileType, searchFileName, currentPage)
        .then((response) => {
            setSearchedFiles(response.data);
            setTotalPages(response.data.totalPages);
        })
        .catch((error) => {
            console.log("파일 탐색 실패.", error)
        });
    }
    

    return (
        <div className="chat_area">
            <main className="msger_chat">
                <p className="Resource">자료실</p>
                <div className="search-container">
                <select
                    id="fileTypeDropdown"
                    className="file-type-dropdown"
                    value={searchFileType}
                    onChange={handleSearchFileTypeChange}
                >
                    <option value="선택안함">선택 안 함</option>
                    <option value="문서">문서</option>
                    <option value="사진">사진</option>
                    <option value="영상">영상</option>
                    <option value="기타">기타</option>
                </select>
                <input
                    type="text"
                    id="searchBox"
                    className="search-input"
                    placeholder="검색어를 입력하세요"
                    value={searchFileName}
                    onChange={handleSearchFileNameChange}
                />
                <button className="search-button" onClick={searchFile}>검색</button>
                </div>
                <div className="msg_bubble">
                <div className="msg_text">
                    <div className="file-info">
                    파일명 | 업로더 | 업로드 날짜
                    {searchedFiles.map((file, index) => {
                        <FileDetail key={index} {...file} />
                    })}
                    
                    </div>
                </div>
            </div>
            <div className='page-number'>
                {Array.from({length:totalPages},(_,index) => {
                    <button key={index} onClick={() => handlePageChange(index+1)} className={currentPage === index+1 ? "active" : ""}>
                        {index+1}
                    </button>
                })}
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
