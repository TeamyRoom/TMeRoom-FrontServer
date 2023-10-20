import { useState, useEffect } from "react";
import "../css/MyLecture.css";
import { call } from "../service/ApiService";

export default function MyLecture() {

    const [lectures, setLectures] = useState([]);

    useEffect(() => {
        call("/lectures/taking?page=0", "GET")
            .then((response) => {
                setLectures(response.result.content);
            })
    }, []);

    return (
        <div className="table-box">
            <h1 className="Title">전체 강의 목록</h1>
            <div className="table-row table-head">
                <div className="table-cell first-cell">
                    <p>강좌명</p>
                </div>
                <div className="table-cell">
                    <p>강사</p>
                </div>
                <div className="table-cell last-cell">
                    <p>강좌신청</p>
                </div>
            </div>

            {
                lectures.map((lecture, index) => (
                    <div className="table-row" key={index}>
                        <div className="table-cell first-cell">
                            <p>{lecture.lectureName}</p>
                        </div>
                        <div className="table-cell">
                            <p>{lecture.lectureCode}</p>
                        </div>
                        <div className="table-cell last-cell">
                            <p>테스트</p>
                        </div>
                    </div>
                ))}

        </div>
    )
}