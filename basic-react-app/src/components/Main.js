import "../css/Main.css";
import { gsap } from '../../node_modules/gsap/index.js';
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Main() {

    const navigate = useNavigate();
    const codeRef = useRef("");
    const nickname = "임시닉네임";

    const goTeacher = () => {
        if (codeRef === "") alert('강의 코드를 입력해주세요.');
        else navigate(`teacher/${codeRef.current.value}/${nickname}`);
    }

    const goStudent = () => {
        if (codeRef === "") alert('강의 코드를 입력해주세요.');
        else navigate(`student/${codeRef.current.value}/${nickname}`);
    }


    var wrapper;
    var formBoxs;
    var loginLink;
    var registerLink;
    var btnPopup;
    var iconClose;
    var forgotPwLink;
    var forgotIdLink;
    var loginIdLink;
    var loginPwLink;

    useEffect(() => {
        wrapper = document.querySelector('.wrapper');
        formBoxs = document.querySelectorAll('.form-box');
        loginLink = document.querySelector('.login-link');
        registerLink = document.querySelector('.register-link');
        btnPopup = document.querySelector('.btnLogin-popup');
        iconClose = document.querySelector('.icon-close');
        forgotPwLink = document.querySelector('.remember-forgot a');
        forgotIdLink = document.querySelector('.login-idforgot a');
        loginIdLink = document.querySelector('.find-id .login-register .login-link'); // 아이디찾기 영역에 있는 로그인버튼
        loginPwLink = document.querySelector('.find-pw .login-register .login-link'); // 비번찾기 영역에 있는 로그인버튼
        init();
    }, []);

    function init() {

        const initEl = '.form-box.login';
        gsap.set('.form-box', { 'xPercent': 0 });
        gsap.set(initEl, { 'xPercent': -100 });
        formBoxs.forEach(t => { t.classList.remove('on') });
        document.querySelector(initEl).classList.add('on');
        popupHgt(initEl);

        iconClose.addEventListener('click', () => {
            init(); // init 함수 호출
            wrapper.classList.remove('active-popup');
            wrapper.classList.remove('active');
        });

        window.addEventListener('resize', () => {
            popupHgt();
        });

        registerLink.addEventListener('click', () => {
            popupFrom('.form-box.login');
            popupTo('.form-box.register');
        });

        loginLink.addEventListener('click', () => {
            popupFrom('.form-box.register');
            popupTo('.form-box.login');
        });

        forgotIdLink.addEventListener('click', () => {
            popupFrom('.form-box.login');
            popupTo('.form-box.find-id');
        });

        forgotPwLink.addEventListener('click', () => {
            popupFrom('.form-box.login');
            popupTo('.form-box.find-pw');
        });

        btnPopup.addEventListener('click', () => {
            wrapper.classList.add('active-popup');
        });

        iconClose.addEventListener('click', () => {
            wrapper.classList.remove('active-popup');
            wrapper.classList.remove('active');
        });



        // 아이디찾기 영역에 있는 로그인버튼 클릭시
        loginIdLink.addEventListener('click', () => {
            popupFrom('.form-box.find-id'); // 아이디찾기 영역 숨기기
            popupTo('.form-box.login'); // 로그인영역 보이게
        });

        // 비번찾기 영역에 있는 로그인버튼 클릭시
        loginPwLink.addEventListener('click', () => {
            popupFrom('.form-box.find-pw'); // 비번찾기 영역 숨기기
            popupTo('.form-box.login'); // 로그인영역 보이게
        });

    }


    function popupTo(el) {
        gsap.fromTo(el, { 'xPercent': 0 }, { 'xPercent': -100 });
        formBoxs.forEach(t => { t.classList.remove('on') });
        document.querySelector(el).classList.add('on');
        popupHgt(el);
    }

    function popupFrom(el) {
        gsap.fromTo(el, { 'xPercent': -100 }, { 'xPercent': -200 });
    }

    function popupHgt(el = '.form-box.on') {
        // const hgt = document.querySelector(el).clientHeight;
        // gsap.to(wrapper, { 'height': hgt, duration: 0.2 });
    }

    return (
        <>
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
            <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
            <header>
                <h2 className="logo">TMEROOM</h2>
                <nav className="navigation">
                    <a href="#">Home</a>
                    <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Contact</a>
                    <button className="btnLogin-popup">로그인</button>
                </nav>
            </header>

            <div className="join-box">

                <h1>강의명</h1>
                <form>
                    <input className="join-box-input" type="text" name="" placeholder="강의명을 적어주세요." ref={codeRef}/>
                        <a className="join-box-button" onClick={goTeacher}>선생입장</a>
                        <a className="join-box-button" onClick={goStudent}>학생입장</a>
                </form>
            </div>

            <div className="wrapper active-popup">
                <span className="icon-close">
                    <ion-icon name="close"></ion-icon>
                </span>

                <div className="form-box login active">
                    <h2>로그인</h2>
                    <form action="#">
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="mail"></ion-icon>
                            </span>
                            <input type="text" required />
                            <label>아이디</label>
                        </div>
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="lock-closed"></ion-icon>
                            </span>
                            <input type="password" required />
                            <label>비밀번호</label>
                        </div>
                        <button type="submit" className="btn">로그인</button>
                        <label><input type="checkbox" /> 로그인 유지</label>
                        <div className="login-register">
                            <p>계정이 없으신가요? <a href="#" className="register-link">생성하기</a></p>
                        </div>
                        <div className="login-idforgot">
                            <p>아이디를 잊어버리셨나요? <a href="#" className="register-link">아이디찾기</a></p>
                        </div>
                        <div className="remember-forgot">
                            <p>비밀번호를 잊어버리셨나요? <a href="#" className="register-link">비밀번호찾기</a></p>
                        </div>
                    </form>
                </div>

                <div className="form-box register">
                    <h2>계정 생성</h2>
                    <form action="#">
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="person"></ion-icon>
                            </span>
                            <input type="text" required />
                            <label>계정명</label>
                        </div>
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="mail"></ion-icon>
                            </span>
                            <input type="email" required />
                            <label>이메일</label>
                        </div>
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="lock-closed"></ion-icon>
                            </span>
                            <input type="password" required />
                            <label>비밀번호</label>
                        </div>
                        <div className="remember-forgot">
                            <label><input type="checkbox" /> I agree to the terms & conditions</label>
                        </div>
                        <button type="submit" className="btn">생성하기</button>
                        <div className="login-register">
                            <p>이미계정이있으신가요? <a href="#" className="login-link">Login</a></p>
                        </div>
                    </form>
                </div>

                <div className="form-box find-pw">
                    <h2>비밀번호 찾기</h2>
                    <form action="#">
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="person"></ion-icon>
                            </span>
                            <input type="text" required />
                            <label>계정명</label>
                        </div>
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="mail"></ion-icon>
                            </span>
                            <input type="email" required />
                            <label>이메일</label>
                        </div>
                        <button type="submit" className="btn">찾기</button>
                        <div className="login-register">
                            <div className="login-register">
                                <p>이미계정이있으신가요? <a href="#" className="login-link">Login</a></p>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="form-box find-id">
                    <h2>ID 찾기</h2>
                    <form action="#">
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="mail"></ion-icon>
                            </span>
                            <input type="email" required />
                            <label>이메일</label>
                        </div>
                        <button type="submit" className="btn">찾기</button>
                        <div className="login-register">
                            <p>이미계정이있으신가요? <a href="#" className="login-link">Login</a></p>
                        </div>
                        <div className="login-register">
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Main;