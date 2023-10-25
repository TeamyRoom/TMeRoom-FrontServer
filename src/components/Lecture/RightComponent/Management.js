import { useEffect, useState } from "react"
import { call, dismissTeacher as dismissTeacherAPI, rejectStudent, acceptStudent } from "../../../service/ApiService";
import React from 'react';
import Modal from 'react-modal';
import "../../../css/Question.css";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export default function Management(props) {

    const [applications, setApplications] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [searchMemberType, setSearchTeacherType] = useState('ID');
    const [searchTeacherText, setSearchTeacherText] = useState('');
    const [searchedTeachers, setSearchedTeachers] = useState([]);
    const [teacherCurrentPage, setTeacherCurrentPage] = useState(-1);
    const [teacherTotalPages, setTeacherTotalPages] = useState(1);
    const [studentCurrentPage, setStudentCurrentPage] = useState(-1);
    const [studentTotalPages, setStudentTotalPages] = useState(1);
    const [reload, setReload] = useState(true);

    // Modal ------------------------------
    let subtitle;

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    //-------------------------- Modal

    const handleSearchTeacherTypeChange = (e) => {
        setSearchTeacherType(e.target.value);
    };

    const handleSearchTeacherTextChange = (e) => {
        setSearchTeacherText(e.target.value);
    };

    const handleTeacherPageChange = (page) => {
        setTeacherCurrentPage(page);
    }

    const handleStudentPageChange = (page) => {
        setStudentCurrentPage(page);
    }

    const searchTeacher = () => {
        const reqDto = {
            searchType: searchMemberType, // 검색 유형 (예: 'ID' 또는 'Email')
            keyword: searchTeacherText, // 검색 텍스트 (예: 'teacher123')
            page: teacherCurrentPage // 현재 페이지 번호 (예: 1)
        }
        call(`/lecture/${props.lecturecode}/members`, "GET", reqDto)
        .then((response) => {
            if(response.resultCode === "SUCCESS"){
                setSearchedTeachers(response.result.members.content);
            }
        })
        .catch((error) => {
            console.log("멤버 탐색 실패.", error);
        });
    }

    const suggestTeacher = (teacherId) =>{
        call(`/lecture/${props.lecturecode}/teacher`, "POST", {teacherId : teacherId})
        .then((response) => {
            if(response.resultCode === "SUCCESS"){
                alert("초청 성공");
                setReload(!reload);
            }else{
                alert("초청 실패");
            }
        })
        .catch((error) => {
            alert("초청 실패");
        });
    }

    const dismissTeacher = (teacherId) =>{
        dismissTeacherAPI(props.lecturecode, teacherId)
        .then((response) => {
            if(response.resultCode === "SUCCESS"){
                alert("요청 성공");
            }else{
                alert("요청 실패");
            }
        })
        .catch((error) => {
            alert("요청 실패");
        });
    }

    const acceptApplicant = (teacherId) =>{
        acceptStudent(props.lecturecode, teacherId)
        .then((response) => {
            if(response.resultCode === "SUCCESS"){
                alert("요청 성공");
                setReload(!reload);
            }else{
                alert("요청 실패");
            }
        })
        .catch((error) => {
            alert("요청 실패");
        });
    }

    const rejectApplicant = (teacherId) =>{
        rejectStudent(props.lecturecode, teacherId)
        .then((response) => {
            if(response.resultCode === "SUCCESS"){
                alert("요청 성공");
                setReload(!reload);
            }else{
                alert("요청 실패");
            }
        })
        .catch((error) => {
            alert("요청 실패");
        });
    }

    useEffect(() => {
        call(`/lecture/${props.lecturecode}/applications?page=0`, "GET")
            .then((response) => {
                setApplications(response.result.content);
            });
            call(`/lecture/${props.lecturecode}/teachers?page=0`, "GET")
            .then((response) => {
                setTeachers(response.result.content);
            });
    }, [reload]);


    return (
        <div className="chat_area">
            <main className="msger_chat">
                <h2>인원 관리</h2>

                <h3>강사 관리</h3>
                <button onClick={openModal}>초대</button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal">
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>강사 초청</h2>
                    <button onClick={closeModal}>close</button>
                    <select
                        id="searchType"
                        className="search-teacher-type-dropdown"
                        value={searchMemberType}
                        onChange={handleSearchTeacherTypeChange}
                    >
                        <option value="ID">ID</option>
                        <option value="EMAIL">Email</option>
                    </select>
                    <input
                        type="text"
                        id="searchBox"
                        className="search-input"
                        placeholder="검색어를 입력하세요"
                        value={searchTeacherText}
                        onChange={handleSearchTeacherTextChange}
                    />
                    <button className="search-button" onClick={searchTeacher}>검색</button>
                    {searchedTeachers.map((person, index) => (
                        <div key={index}>
                            <span>{person.memberId} / {person.nickname} </span>
                            <button onClick={()=>{suggestTeacher(person.memberId)}}>초청</button>
                        </div>
                    ))}
                </Modal>
                {teachers.map((person, index) => (
                    <div key={index}>
                        <span>{person.id} / {person.nickName} </span>
                        <button onClick={()=>{dismissTeacher(person.memberId)}}>{
                            (person.acceptedAt == null) ? "취소" : "해임"
                        }</button>
                    </div>
                ))}
                <div className='page-number'>
                    {Array.from({ length: teacherTotalPages }, (_, index) => {
                        <button key={index} onClick={() => handleTeacherPageChange(index + 1)} className={teacherCurrentPage === index + 1 ? 'active' : ''}>
                            {index + 1}
                        </button>
                    })}
                </div>

                <h3>학생 관리</h3>
                {applications.map((person, index) => (
                    <div key={index}>
                        <span>{person.id} / {person.nickName}</span>
                        {
                            (person.acceptedAt == null) ?
                                <div>
                                    <button onClick={()=>{acceptApplicant(person.id)}}>승인</button>
                                    <button onClick={()=>{rejectApplicant(person.id)}}>반려</button>
                                </div>
                                : <button onClick={()=>{rejectApplicant(person.id)}}>퇴출</button>
                        }

                    </div>
                ))}
                <div className='page-number'>
                    {Array.from({ length: studentTotalPages }, (_, index) => {
                        <button key={index} onClick={() => handleStudentPageChange(index + 1)} className={studentCurrentPage === index + 1 ? 'active' : ''}>
                            {index + 1}
                        </button>
                    })}
                </div>
            </main>
        </div>
    )
}