import { useState, useEffect, useRef } from "react";

import "../../css/Home.css";
import { call, getAccessToken, signOut } from "../../service/ApiService.js";
import Login from "../SinglePage/Login.js";
import Main from "./Main";
import MyLecture from "../MyLecturePage/MyLecture";
import MyPageFrame from "../MyPage/MyPageFrame";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Home(props) {

    const [isLogined, setLogined] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const loginRef = useRef({});

    useEffect(() => {
        if (getAccessToken()) setLogined(true)
        else setLogined(false);
    });

    function handleSignOut() {
        signOut();
        setLogined(false);
    }

    function handleSignOutAll() {
        call("/auth/refresh", "DELETE");
        signOut();
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

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <header className="text-gray-600body-font">
            </header>

            <div className="mainbody">
                <header>
                    <h2 className="logo" onClick={() => {window.location.href="/"}}>
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
                        {isLogined ?
                            <button className="btnLogout" onClick={() => {setOpen(true)}}>Logout</button>
                            : <button className="btnLogout" onClick={() => {loginRef.current.modalOpen()}}>Login</button>}
                    </nav>
                </header>
                <Login ref={loginRef} />
            </div>

            <section className="text-gray-600body-font">
                {renderMainComponent()}
            </section>

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            로그아웃
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            모든 기기에서 로그아웃 하시겠습니까?
                        </Typography>
                        <Button className="apply-button" onClick={handleSignOutAll}>예</Button>
                        <button className="reject-button" onClick={handleSignOut}>아니오</button>
                    </Box>
                </Modal>
            </div>


            <script src="script.js"></script>
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
            <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

        </>
    )
}

export default Home;