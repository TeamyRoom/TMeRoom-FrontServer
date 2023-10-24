import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import "../../css/ConfirmPage.css";
import { decisionTeacher } from "../../service/ApiService";


function TeacherAccept() {
    const { lecturecode } = useParams();
    const { answer } = useParams();

    async function handleAnswer(answer, lecturecode) {
        try {
            if (answer === "yes") {
                const res = await decisionTeacher(lecturecode, true);
                handleResponse(res);
            } else if (answer === "no") {
                const res = await decisionTeacher(lecturecode, false);
                handleResponse(res);
            } else {
                alert("유효하지 않은 답변입니다. 'yes' 또는 'no'로 답변해주세요.");
            }
        } catch (error) {
            alert("요청 실패");
        }
        window.location.href = "/";
    }

    function handleResponse(res) {
        switch (res.resultCode) {
            case "SUCCESS":
                alert("요청 성공");
                break;
            default:
                alert("요청 실패");
                break;
        }
    }


    useEffect(() => {
        handleAnswer(answer, lecturecode);
    }, []);

    return (
        <div class="form_wrapper">
            <input class="button" onClick={() => { window.location.href = "/" }} value="메인페이지로 돌아가기" />
        </div>
    )
}
export default TeacherAccept;