import { useRef } from "react";
import { createLecture } from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';



export default function Main() {

    const navigate = useNavigate();
    const codeRef = useRef("");

    const goLecture = () => {
        console.log(codeRef);
        if (codeRef.current.value === "") alert('강의 코드를 입력해주세요.');
        else navigate(`lecture/${codeRef.current.value}`);
    }

    function handleCreateLecture() {
        createLecture({ lectureName: "새로운 강의" });
    }

    return (
        <div className="container mx-auto flex md:px-16 px-5 md:py-24 py-12 md:flex-row flex-col items-center">
            <div
                className="lg:flex-grow md:w-1/2 md:pr-24 md:pr-16 flex flex-col md:items-start text-left mb-16 md:mb-0 items-center text-center premium_meeting">
                <h1 className="md:title-font md:text-4xl text-2xl mb-10 font-medium text-gray-900">
                    강의를 되돌리고 싶을 때 당신을 도와줄 친구 TMEROOM
                </h1>
                <p className="mb-8 leading-relaxed w-[90%] md:text-lg text-normal text-gray-600 font-normal">
                    다양한 강의실 기능과 되돌리기로 학습을 향상시켜보세요.
                </p>
                <div className="flex md:flex-row md:justify-center items-center flex-col start_meeting">
                    <Button component="label" variant="contained" onClick={handleCreateLecture} color="info">
                        강의제작하기
                    </Button>
                    <div className="v-line" />
                    <input type="text" id="참여코드를 입력하세요"
                        className="md:ml-2 pl-5 inline-flex font-normal placeholder:text-gray-500 bg-white border border-gray-300 py-2 px-2 outline-gray-500 rounded text-lg relative"
                        placeholder="코드를 입력해주세요"
                        autoComplete="one-time-code"
                        ref={codeRef} 
                        onKeyUp={(e) => {if(e.key === 'Enter') goLecture()}}
                        />
                    <Button variant="contained" endIcon={<SendIcon />} onClick={goLecture} color="info">
                        입장
                    </Button>
                </div>
            </div>
            <div className="md:max-w-lg md:w-full md:w-1/2 w-5/6 first-image-parent">
                <img src="./images/main.png" alt="first image" id="first-image"
                    className="object-cover object-center rounded" />

            </div>
        </div>
    )
}