import { useState, useEffect } from "react";

import "../../css/Home.css";
import { getAccessToken, signOut } from "../../service/ApiService.js";
import Login from "../SinglePage/Login.js";
import Main from "./Main";
import MyLecture from "../MyLecturePage/MyLecture";
import MyPageFrame from "../MyPage/MyPageFrame";

function Home() {

    const [isLogined, setLogined] = useState(false);
    const [mainComponent, setMainComponent] = useState(0);

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
        switch (mainComponent) {
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
                    <h2 className="logo" onClick={() => {window.location.reload();}}>TMEROOM</h2>
                    <nav className="navigation">
                        <a className="lecture-list" onClick={() => setMainComponent(1)}>마이 페이지 </a>
                        <a className="lecture-list" onClick={() => setMainComponent(2)}>내 강의 목록 </a>
                        {isLogined ? (
                            // 로그인 상태일 때 버튼 렌더링
                            <button className="btnLogout" onClick={handleSignOut}>Logout</button>
                        ) : <button className="btnLogin-popup">Login</button>}
                    </nav>
                </header>
                <Login />
            </div>

            <section className="text-gray-600body-font">
                {
                    renderMainComponent()
                }
            </section>


            <script src="script.js"></script>
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
            <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

        </>
    )
}

export default Home;