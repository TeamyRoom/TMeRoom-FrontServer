import { useState, useEffect, useRef } from "react";

import "../../css/Home.css";
import { getAccessToken, signOut } from "../../service/ApiService.js";
import Login from "../SinglePage/Login.js";
import Main from "./Main";
import MyLecture from "../MyLecturePage/MyLecture";
import MyPageFrame from "../MyPage/MyPageFrame";
import { useNavigate } from "react-router-dom";

function Home(props) {

    const [isLogined, setLogined] = useState(false);
    const navigate = useNavigate();
    const loginRef = useRef({});

    useEffect(() => {
        if (getAccessToken()) setLogined(true)
        else setLogined(false);
    });

    function handleSignOut() {
        signOut();
        alert("로그아웃되었습니다.");
        setLogined(false);
    }

    function renderMainComponent() {
        switch (props.page) {
            case 0: return <Main />;
            case 1: return <MyPageFrame />;
            case 2: return <MyLecture />;
            default: return;
        }
    }

    return (
        <>
            <header className="text-gray-600body-font">
            </header>

            <div className="mainbody">
                <header>
                    <h2 className="logo" onClick={() => { navigate('/') }}>
                        <img className="logo-image" src="./favicon.png" />
                        TMEROOM
                    </h2>
                    <nav className="navigation">
                        <a className="lecture-list" onClick={() => {
                            if (isLogined) {
                                navigate('/mypage')
                            }
                            else loginRef.current.modalOpen();
                        }}>마이 페이지 </a>
                        <a className="lecture-list" onClick={() => {
                            if (isLogined) {
                                navigate('/lecturelist')
                            }
                            else loginRef.current.modalOpen();
                        }}>내 강의 목록 </a>
                        {isLogined ? (
                            // 로그인 상태일 때 버튼 렌더링
                            <button className="btnLogout" onClick={handleSignOut}>Logout</button>
                        ) : <button className="btnLogin-popup">Login</button>}
                    </nav>
                </header>
                <Login ref={loginRef} />
            </div>

            <section className="text-gray-600body-font">
                {renderMainComponent()}
            </section>


            <script src="script.js"></script>
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
            <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

        </>
    )
}

export default Home;