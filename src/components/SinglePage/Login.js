import { forwardRef, useEffect, useState, useImperativeHandle } from "react";
import { gsap } from 'gsap/index.js';
import { signUp, signIn, signOut, findId, findPw } from "../../service/ApiService.js";

const Login = forwardRef((props, ref) => {

    const [memberId, setMemberId] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");

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

    useImperativeHandle(ref, () => ({
        modalClose,
        modalOpen
    }));

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

        if (btnPopup) {
            btnPopup.addEventListener('click', (e) => {
                modalOpen();
            });
        }

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
        if (idFindBtn) {
            idFindBtn.addEventListener('click', (e) => {
                e.preventDefault();
                modalOpen();
                setTimeout(() => {
                    wrapper.classList.add('active-popup');
                    popupFrom('.form-box.login', 0);
                    popupTo('.form-box.register', 0);
                }, 10);
            });
        }

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
    }

    function modalOpen() {
        wrapperModal.classList.add('active');
        setTimeout(() => {
            wrapper.classList.remove('active-popup');
            wrapper.classList.remove('active');
        }, 10);

        setTimeout(() => {
            wrapper.classList.add('active-popup');
            popupFrom('.form-box.login', 0);
            popupTo('.form-box.login', 0);
        }, 10);
    }

    function modalClose() {
        popupFrom('.form-box.find-id', 0);
        popupFrom('.form-box.find-pw', 0);
        popupFrom('.form-box.register', 0);
        wrapper.classList.remove('active-popup');
        wrapper.classList.remove('active');
        setTimeout(() => {
            wrapperModal.classList.remove('active');
        }, 500);
    }

    function handleSignUp() {
        console.log("handleSignUp");
        if (memberId === "" || password === "" || nickname === "" || email === "") {
            alert("모든 입력란을 기입해주세요.");
            return;
        }
        signUp({ memberId: memberId, password: password, nickname: nickname, email: email }).then(
            (response) => {
                if (response.resultCode === "SUCCESS") {
                    alert("메일이 정상적으로 전송되었습니다. 확인해주세요.");
                    popupFrom('.form-box.register');
                    popupTo('.form-box.login');
                }
            }
        ).catch((e) => { console.log(e) });
    }

    function handleSignIn() {
        signIn({ id: memberId, pw: password }).then(
            (response) => {
                if (response.resultCode === "SUCCESS") {
                    alert("로그인되었습니다.");
                    window.location.href = window.location.href;
                }
            }
        ).catch((e) => { console.log(e) });
    }

    function handleFindId() {
        findId({ email: email }).then(
            (response) => {
                if (response.resultCode === "SUCCESS") {
                    alert("메일 전송에 성공하였습니다.");
                    window.location.href = window.location.href;
                }
            }
        ).catch((e) => { console.log(e) });
    }

    function handleFindPassword() {
        findPw({ memberId: memberId, email: email }).then(
            (response) => {
                if (response.resultCode === "SUCCESS") {
                    alert("메일 전송에 성공하였습니다.");
                    window.location.href = window.location.href;
                }
            }
        ).catch((e) => { console.log(e) });
    }

    return (

        <div className="wrapper-modal">
            <div className="wrapper-center">
                <div className="wrapper">
                    <span className="icon-close">
                        <ion-icon name="close"></ion-icon>
                    </span>

                    <div className="form-box login active">
                        <h2>로그인</h2>
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="mail"></ion-icon>
                            </span>
                            <input
                                type="text"
                                required
                                autoComplete="one-time-code"
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
                                autoComplete="one-time-code"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label>비밀번호</label>
                        </div>
                        <button type="submit" className="btn" onClick={handleSignIn}>로그인</button>
                        <label><input type="checkbox" /> 로그인 유지</label>
                        <div className="login-register">
                            <p>계정이 없으신가요? <a className="register-link">생성하기</a></p>
                        </div>
                        <div className="login-idforgot">
                            <p>아이디를 잊어버리셨나요? <a className="register-link">아이디찾기</a></p>
                        </div>
                        <div className="remember-forgot">
                            <p>비밀번호를 잊어버리셨나요? <a className="register-link">비밀번호찾기</a></p>
                        </div>
                    </div>

                    <div className="form-box register">
                        <h2>계정 생성</h2>
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="person"></ion-icon>
                            </span>
                            <input
                                type="text"
                                required
                                autoComplete="one-time-code"
                                onChange={(e) => setMemberId(e.target.value)}
                            />
                            <label>ID</label>
                        </div>
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="lock-closed"></ion-icon>
                            </span>
                            <input
                                type="password"
                                required
                                autoComplete="one-time-code"
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
                                autoComplete="one-time-code"
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
                                autoComplete="one-time-code"
                                onChange={(e) => setNickname(e.target.value)}
                            />
                            <label>닉네임</label>
                        </div>
                        <div className="remember-forgot">
                            <label><input type="checkbox" /> I agree to the terms & conditions</label>
                        </div>
                        <button type="submit" className="btn" onClick={handleSignUp}>생성하기</button>
                        <div className="login-register">
                            <p>이미계정이있으신가요? <a className="login-link">Login</a></p>
                        </div>
                    </div>
                    <div className="form-box find-pw">
                        <h2>비밀번호 찾기</h2>
                        <form action="#">
                            <div className="input-box">
                                <span className="icon">
                                    <ion-icon name="person"></ion-icon>
                                </span>
                                <input
                                type="text"
                                required
                                autoComplete="one-time-code"
                                onChange={(e) => setMemberId(e.target.value)}
                                />
                                <label>ID</label>
                            </div>
                            <div className="input-box">
                                <span className="icon">
                                    <ion-icon name="mail"></ion-icon>
                                </span>
                                <input
                                    type="email"
                                    required
                                    autoComplete="one-time-code"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label>이메일</label>
                            </div>
                            <button type="submit" className="btn" onClick={handleFindPassword}>찾기</button>
                            <div className="login-register">
                                <div className="login-register">
                                    <p>이미계정이있으신가요? <a className="login-link">Login</a></p>
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
                                <input
                                    type="email"
                                    required
                                    autoComplete="one-time-code"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label>이메일</label>
                            </div>
                            <button type="submit" className="btn" onClick={handleFindId}>찾기</button>
                            <div className="login-register">
                                <p>이미계정이있으신가요? <a className="login-link">Login</a></p>
                            </div>
                            <div className="login-register">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
});

export default Login;