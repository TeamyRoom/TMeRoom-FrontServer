import { useEffect, useState } from "react"
import { call, getResultCodeCall } from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";


export default function LectureAsStudent() {

    const navigate = useNavigate();

    const [totalPages, setTotalPages] = useState(0);
    const [lectures_student, setLectures_student] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        getLectureList();
    }, []);

    const getLectureList = () => {
        getResultCodeCall(`/lectures/taking?page=${pageNumber}`, "GET")
            .then((response) => {
                if (response.resultCode === "SUCCESS") {
                    setLectures_student(response.result.content);
                    setTotalPages(response.result.totalPages);
                }
            });
    }

    const goLecture = (lectureCode) => {
        navigate(`lecture/${lectureCode}`);
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
        getLectureList();
    };

    return (
        <>
            <h1 className="Title">수업 중인 강의 목록</h1>

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
                    <div className="table-row" key={index}>
                        <div className="table-cell first-cell">
                            <p>{lecture.lectureName}</p>
                        </div>
                        <div className="table-cell">
                            <p>{lecture.lectureCode}</p>
                        </div>
                        <div className="table-cell last-cell">
                            {lecture.acceptedAt &&
                                <button class="apply" onClick={() => { goLecture(lecture.lectureCode) }}>입장</button>
                            }
                            <button class="apply" onClick={() => { deleteLecture(lecture.lectureCode) }}>수강취소</button>
                        </div>
                    </div>
                ))
            }
            <Pagination
                count={totalPages} // 전체 페이지 수
                page={pageNumber} // 현재 페이지
                onChange={handlePageChange} // 페이지 변경 핸들러
                variant="outlined"
                shape="rounded"
                className="lecture-list-pagination"
            />
        </>
    )
}