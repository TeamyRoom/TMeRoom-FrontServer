import { useEffect, useState } from "react"
import { call, getResultCodeCall } from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";


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
                                <button className="apply" onClick={() => { goLecture(lecture.lectureCode) }}>강의실 입장</button>
                                :
                                <button className="apply" onClick={() => { acceptLecture(lecture.lectureCode) }}>수락</button>
                            }
                            <button className="apply" onClick={() => { deleteLecture(lecture.lectureCode) }}>강의 탈퇴</button>
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