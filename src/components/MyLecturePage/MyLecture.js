import { useState, useEffect } from "react";
import "../../css/MyLecture.css";
import LectureAsStudent from "./LectureAsStudent";
import LectureAsTeacher from "./LectureAsTeacher";
import LectureAsManager from "./LectureAsManager";

export default function MyLecture() {



    const [lectures_manager, setLectures_manager] = useState([]);
    const [tabNow, setTabNow] = useState(0);

    useEffect(() => {


    }, []);

    const tabComponent = () => {
        switch (tabNow) {
            case 0: return <LectureAsStudent />
            case 1: return <LectureAsTeacher />
            case 2: return <LectureAsManager />
            default: break;
        }
    }

    return (
        <div className="table-box">

            <ul className="tabs">
                <li className={tabNow === 0 ? "tab-link current" : "tab-link"} onClick={() => { setTabNow(0) }}>학생</li>
                <li className={tabNow === 1 ? "tab-link current" : "tab-link"} onClick={() => { setTabNow(1) }}>선생</li>
                <li className={tabNow === 2 ? "tab-link current" : "tab-link"} onClick={() => { setTabNow(2) }}>관리자</li>
            </ul>

            {
                tabComponent()
            }

        </div>
    )
}