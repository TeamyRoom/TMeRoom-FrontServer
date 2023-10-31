import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FileDetail from './StudentFileDetail';
import "../../../css/File.css";
import { call, getAccessToken } from "../../../service/ApiService.js"

function StudentFile(props) {
    const [uploadFile, setUploadFile] = useState("");
    const [searchFileType, setSearchFileType] = useState('');
    const [searchFileName, setSearchFileName] = useState('');
    const [searchedFiles, setSearchedFiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        searchFile();
    },[currentPage]);

    useEffect(() => {
        searchFile();
    },[]);

    useEffect(() => {

    },[searchedFiles]);

    const handleSearchFileTypeChange = (e) => {
        setSearchFileType(e.target.value);
    };

    const handleSearchFileNameChange = (e) => {
        setSearchFileName(e.target.value);
    };

    const handleUploadFileChange = (e) => {
        setUploadFile(e.target.files[0]);
        console.log("이 파일이야?", e.target.files[0]);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }


    const searchFile = () => {
        const searchfile = {
            type : searchFileType,
            key : searchFileName,
            page: currentPage-1, 
            size: 8
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
                />
                <button className="search-button-Library" onClick={searchFile}>검색</button>
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
            </main>
        </div>
    );
};

export default StudentFile;
