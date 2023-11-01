import { useEffect, useState } from "react"
import { call } from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

export default function LectureAsStudent() {

    const navigate = useNavigate();

    const [totalPages, setTotalPages] = useState(0);
    const [lectures_student, setLectures_student] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        getLectureList();
    }, [pageNumber]);

    const getLectureList = () => {
        call(`/lectures/taking/student?page=${pageNumber}`, "GET")
            .then((response) => {
                if (response.resultCode === "SUCCESS") {
                    setLectures_student(response.result.content);
                    setTotalPages(response.result.totalPages);
                }
            });
    }

    const goLecture = (lectureCode) => {
        navigate(`/lecture/${lectureCode}`);
    }

    const deleteLecture = (lectureCode) => {
        call(`/lecture/${lectureCode}/application`, 'DELETE')
            .then(() => {
                alert("수강 철회되었습니다.");
                getLectureList();
            })
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
                lectures_student.map((lecture, index) => (
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
                                <Button variant="contained" disabled>
                                    수락대기중
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