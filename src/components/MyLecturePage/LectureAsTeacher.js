import { useEffect, useState } from "react"
import { call, getResultCodeCall } from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

export default function LectureAsTeacher() {

    const navigate = useNavigate();

    const [totalPages, setTotalPages] = useState(0);
    const [lectures_teacher, setLectures_teacher] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        getLectureList();
    }, [pageNumber]);

    const getLectureList = () => {
        getResultCodeCall(`/lectures/taking/teacher?page=${pageNumber}`, "GET")
            .then((response) => {
                if (response.resultCode === "SUCCESS") {
                    setLectures_teacher(response.result.content);
                    setTotalPages(response.result.totalPages);
                }
            });
    }

    const goLecture = (lectureCode) => {
        navigate(`/lecture/${lectureCode}`);
    }

    const acceptLecture = (lectureCode) => {
        call(`/lecture/${lectureCode}/teacher`, 'PUT')
            .then(() => {
                alert("해당 강의의 강사로 임명되었습니다.");
                getLectureList();
            });
    }

    const deleteLecture = (lectureCode) => {
        call(`/lecture/${lectureCode}/teacher`, 'DELETE')
            .then(() => {
                alert("정상적으로 강의 탈퇴되었습니다.");
                getLectureList();
            });
    }

    const handlePageChange = (event, page) => {
        setPageNumber(page - 1);
    };

    return (
        <>
            <div className="table-row table-head">
                <div className="table-cell first-cell">
                    <p>강좌명</p>
                </div>
                <div className="table-cell">
                    <p>강의코드</p>
                </div>
                <div className="table-cell last-cell">
                    <p>구분</p>
                </div>
            </div>

            {
                lectures_teacher.map((lecture, index) => (
                    <div className={lecture.acceptedAt ? "table-row" : "table-row-unaccepted"} key={index}>
                        <div className="table-cell first-cell">
                            <p>{lecture.lectureName}</p>
                        </div>
                        <div className="table-cell">
                            <p>{lecture.lectureCode}</p>
                        </div>
                        <div className="table-cell last-cell">
                            {lecture.acceptedAt ?
                                <Button variant="contained" endIcon={<SendIcon />} onClick={() => { goLecture(lecture.lectureCode) }}>
                                    입장
                                </Button>
                                :
                                <Button variant="contained" color="success" onClick={() => {acceptLecture(lecture.lectureCode)}}>
                                    수락
                                </Button>
                            }
                            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => { deleteLecture(lecture.lectureCode) }}>
                                탈퇴
                            </Button>
                        </div>
                    </div>
                ))
            }
            <Pagination
                count={totalPages}
                page={pageNumber}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                className="lecture-list-pagination"
            />
        </>
    )
}