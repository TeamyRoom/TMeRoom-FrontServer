import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";
import { signUp, signIn, call, getAccessToken, signOut, createLecture } from "../service/ApiService.js";
import Login from "./Login.js";

function Home() {

    const navigate = useNavigate();
    const codeRef = useRef("");


    const [isLogined, setLogined] = useState(false);

    const goLecture = () => {
        if (codeRef === "") alert('강의 코드를 입력해주세요.');
        else navigate(`lecture/${codeRef.current.value}`);
    }


    useEffect(() => {
        if (getAccessToken()) setLogined(true)
        else setLogined(false);
    });


    function handleSignOut() {
        signOut();
        alert("로그아웃되었습니다.");
        setLogined(false);
    }

    function handleCreateLecture() {
        createLecture({ lectureName: "임시 강의명" });
    }

    return (
        <>
            <header className="text-gray-600body-font">
            </header>

            <section className="text-gray-600body-font">
                <div className="container mx-auto flex md:px-16 px-5 md:py-24 py-12 md:flex-row flex-col items-center">
                    <div
                        className="lg:flex-grow md:w-1/2 md:pr-24 md:pr-16 flex flex-col md:items-start text-left mb-16 md:mb-0 items-center text-center premium_meeting">
                        <h1 className="md:title-font md:text-4xl text-2xl mb-10 font-medium text-gray-900 w-3/4 home-text">
                            강의 중 수업이 이해가 안되거나 수업을 되돌리고싶다면 당신을 도와줄 친구 TMEROOM
                        </h1>
                        <p className="mb-8 leading-relaxed w-[90%] md:text-lg text-normal text-gray-600 font-normal">
                            저희는 강의 중 질문과 수업 되돌리기 기능을 통하여 당신의 학습의 질을 높이는 경험을 선사합니다.
                        </p>
                        <div className="flex md:flex-row md:justify-center items-center flex-col start_meeting">

                            <button type="button"
                                className="md:inline-flex text-white bg-blue-600 border-0 py-2 px-6 md:mb-0 mb-4 focus:outline-none           hover:bg-blue-800 rounded text-lg flex justify-center"
                                onClick={handleCreateLecture}>
                                <i className="fa-solid fa-video pr-2 py-1.5"></i>
                                강의 제작하기
                            </button>

                            <input type="text" id="참여코드를 입력하세요"
                                className="md:ml-2 pl-5 inline-flex font-normal placeholder:text-gray-500 bg-white border border-gray-300 py-2 px-2 outline-gray-500 rounded text-lg relative"
                                placeholder="코드를 입력해주세요" 
                                autocomplete="one-time-code"
                                ref={codeRef} />

                            <p className="md:ml-4 mt-2.5 text-gray-500 font-semibold cursor-pointer text-[17px]" onClick={goLecture}>입장</p>
                        </div>
                        <a href="https://support.google.com/accounts/answer/27441?hl=en" className="mt-10 font-medium id-find-btn">
                            아이디가 있으신가요?
                            <span className="text-blue-500 cursor-pointer">아이디를 만들어보세요</span>
                        </a>
                    </div>
                    <div className="md:max-w-lg md:w-full md:w-1/2 w-5/6 first-image-parent">
                        <img src="./images/image1.webp" alt="first image" id="first-image"
                            className="object-cover object-center rounded" />

                    </div>
                </div>
            </section>

            <div className="mainbody">
                <header>
                    <h2 className="logo">TMEROOM</h2>
                    <nav className="navigation">
                        {isLogined ? (
                            // 로그인 상태일 때 버튼 렌더링
                            <button className="btnLogout" onClick={handleSignOut}>Logout</button>
                        ) : <button className="btnLogin-popup">Login</button>}
                    </nav>
                </header>
                <Login />
            </div>


            <script src="script.js"></script>
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
            <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

        </>
    )
}

export default Home;