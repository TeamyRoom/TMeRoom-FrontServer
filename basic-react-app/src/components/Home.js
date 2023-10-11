import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from '../../node_modules/gsap/index.js';
import "../css/Home.css";
import "https://kit.fontawesome.com/7433d3320f.js";
import { signUp, signIn } from "../service/ApiService.js";

function Home() {

    const navigate = useNavigate();
    const codeRef = useRef("");

    const [memberId, setMemberId] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");

    const goTeacher = () => {
        if (codeRef === "") alert('강의 코드를 입력해주세요.');
        else navigate(`teacher/${codeRef.current.value}/${nickname}`);
    }

    const goStudent = () => {
        if (codeRef === "") alert('강의 코드를 입력해주세요.');
        else navigate(`student/${codeRef.current.value}/${nickname}`);
    }

    var wrapperModal;
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
    var idFindBtn;

    useEffect(() => {
        wrapperModal = document.querySelector('.wrapper-modal');
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
        idFindBtn = document.querySelector('.id-find-btn');

        init();
    }, []);

    function init() {
        const initEl = '.form-box.login';
        gsap.set('.form-box', { 'xPercent': 0 });
        gsap.set(initEl, { 'xPercent': -100 });
        formBoxs.forEach(t => { t.classList.remove('on') });
        document.querySelector(initEl).classList.add('on');
        popupHgt(initEl);

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

        btnPopup.addEventListener('click', (e) => {
            e.preventDefault();
            modalOpen();
            setTimeout(() => {
                wrapper.classList.add('active-popup');
                popupFrom('.form-box.login', 0);
                popupTo('.form-box.login', 0);
            }, 10);
        });

        iconClose.addEventListener('click', () => {
            modalClose();
        });

        loginIdLink.addEventListener('click', () => {
            popupFrom('.form-box.find-id');
            popupTo('.form-box.login');
        });

        loginPwLink.addEventListener('click', () => {
            popupFrom('.form-box.find-pw');
            popupTo('.form-box.login');
        });

        idFindBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalOpen();
            setTimeout(() => {
                wrapper.classList.add('active-popup');
                popupFrom('.form-box.login', 0);
                popupTo('.form-box.register', 0);
            }, 10);
        });

        iconClose.addEventListener('click', () => {
            init(); // init 함수 호출
            wrapper.classList.remove('active-popup');
            wrapper.classList.remove('active');
        });
    }


    function popupTo(el, du = 0.5) {
        gsap.fromTo(el, { 'xPercent': 0 }, { 'xPercent': -100, duration: du });
        formBoxs.forEach(t => { t.classList.remove('on') });
        document.querySelector(el).classList.add('on');
        popupHgt(el);
    }

    function popupFrom(el, du = 0.5) {
        gsap.fromTo(el, { 'xPercent': -100 }, { 'xPercent': -200, duration: du });
    }

    function popupHgt(el = '.form-box.on') {
        const element = document.querySelector(el);
        if (element) {
            const hgt = element.clientHeight;
            gsap.to(wrapper, { 'height': hgt, duration: 0.2 });
        }

        // const hgt = document.querySelector(el).clientHeight;
        // gsap.to(wrapper, { 'height': hgt, duration: 0.2 });
    }

    function modalOpen() {
        wrapperModal.classList.add('active');
        setTimeout(() => {
            wrapper.classList.remove('active-popup');
            wrapper.classList.remove('active');
        }, 10);
    }
    function modalClose() {
        wrapper.classList.remove('active-popup');
        wrapper.classList.remove('active');
        setTimeout(() => {
            wrapperModal.classList.remove('active');
        }, 500);
    }

    function handleSignUp() {
        console.log("handleSignUp");
        signUp({ memberId: memberId, password: password, nickname: nickname, email: email }).then(
            (response) => {
                alert("회원가입되었습니다.");
            }
        );
    }

    function handleSignIn() {
        signIn({ id: memberId, pw: password }).then(
            (response) => {
                alert("로그인되었습니다.");
            }
        );
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
                                className="md:inline-flex text-white bg-blue-600 border-0 py-2 px-6 md:mb-0 mb-4 focus:outline-none             hover:bg-blue-800 rounded text-lg flex justify-center">
                                <i className="fa-solid fa-video pr-2 py-1.5"></i>
                                강의 제작하기
                            </button>

                            <input type="text" id="참여코드를 입력하세요"
                                className="md:ml-2 pl-5 inline-flex font-normal placeholder:text-gray-500 bg-white border border-gray-300 py-2 px-2 outline-gray-500 rounded text-lg relative"
                                placeholder="코드를 입력해주세요" ref={codeRef} />

                            <p className="md:ml-4 mt-2.5 text-gray-500 font-semibold cursor-pointer text-[17px]" onClick={goTeacher}>선생 참여</p>
                            <p className="md:ml-4 mt-2.5 text-gray-500 font-semibold cursor-pointer text-[17px]" onClick={goStudent}>학생 참여</p>
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

                        <button className="btnLogin-popup">Login</button>
                    </nav>
                </header>
                <div className="wrapper-modal">
                    <div className="wrapper-center">
                        <div className="wrapper">
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
                                        <input
                                            type="text"
                                            required
                                            value={memberId}
                                            onChange={(e) => setMemberId(e.target.value)}
                                        />
                                        <label>아이디</label>
                                    </div>
                                    <div className="input-box">
                                        <span className="icon">
                                            <ion-icon name="lock-closed"></ion-icon>
                                        </span>
                                        <input
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <label>비밀번호</label>
                                    </div>
                                    <button type="submit" className="btn" onClick={handleSignIn}>로그인</button>
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
                                        <input
                                            type="text"
                                            required
                                            value={memberId}
                                            onChange={(e) => setMemberId(e.target.value)}
                                        />
                                        <label>계정명</label>
                                    </div>
                                    <div className="input-box">
                                        <span className="icon">
                                            <ion-icon name="lock-closed"></ion-icon>
                                        </span>
                                        <input
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <label>비밀번호</label>
                                    </div>
                                    <div className="input-box">
                                        <span className="icon">
                                            <ion-icon name="mail"></ion-icon>
                                        </span>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <label>이메일</label>
                                    </div>
                                    <div className="input-box">
                                        <span className="icon">
                                            <ion-icon name="person"></ion-icon>
                                        </span>
                                        <input
                                            type="text"
                                            required
                                            value={nickname}
                                            onChange={(e) => setNickname(e.target.value)}
                                        />
                                        <label>닉네임</label>
                                    </div>
                                    <div className="remember-forgot">
                                        <label><input type="checkbox" /> I agree to the terms & conditions</label>
                                    </div>
                                    <button type="submit" className="btn" onClick={handleSignUp}>생성하기</button>
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
                    </div>
                </div>
            </div>

            <script src="script.js"></script>
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
            <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

        </>
    )
}

export default Home;