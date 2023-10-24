import { useEffect, useState } from "react"

export default function LectureAsTeacher() {

    const [lectures_teacher, setLectures_teacher] = useState([]);

    useEffect(() => {

    }, []);

    return (
        <>
            <h1 className="Title">수강 중인 강의 목록</h1>

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
                    <div className="table-row" key={index}>
                        <div className="table-cell first-cell">
                            <p>{lecture.lectureName}</p>
                        </div>
                        <div className="table-cell">
                            <p>{lecture.lectureCode}</p>
                        </div>
                        <div className="table-cell last-cell">
                            <button class="apply">입장</button>
                            <button class="apply">수강취소</button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}