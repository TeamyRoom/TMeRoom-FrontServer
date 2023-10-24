import { useEffect, useState } from "react"
import { call, getResultCodeCall } from "../../service/ApiService";
import { useNavigate } from "react-router-dom";


export default function LectureAsStudent() {

    const navigate = useNavigate();

    const [lectures_student, setLectures_student] = useState([]);

    useEffect(() => {
        getLectureList();
    }, []);

    const getLectureList = () => {
        getResultCodeCall("/lectures/taking?page=0", "GET")
        .then((response) => {
            if (response.resultCode === "SUCCESS") setLectures_student(response.result.content);
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
                            { lecture.acceptedAt &&
                                <button class="apply" onClick={() => { goLecture(lecture.lectureCode) }}>입장</button>
                            }
                            <button class="apply" onClick={() =>{deleteLecture(lecture.lectureCode)}}>수강취소</button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}