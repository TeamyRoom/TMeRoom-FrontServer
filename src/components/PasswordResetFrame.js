import { confirmResetCode, resetPassword } from "../service/ApiService";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import "../css/ConfirmPage.css";


function PasswordResetFrame() {
    const { resetcode } = useParams();
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    useEffect(() => {
        confirmResetCode(resetcode).then(
            res => {
                if(res.resultCode !== "SUCCESS"){
                    alert("유효하지 않은 코드 입니다. 이메일을 다시 확인해주세요.");
                    window.location.href = "/";
                }
            }
        );
    }, []);

    const handlePasswordChange = (event) => {
        const { name, value } = event.target;

        if (name === 'password1') {
            setPassword1(value);
        } else if (name === 'password2') {
            setPassword2(value);
        }
    };

    const checkPassword = () => {
        if (password1 === password2) {
            resetPassword({ resetCode: resetcode, newPassword: password1 }).then(
                (response) => {
                    if (response.resultCode === "SUCCESS") {
                        alert("비밀번호가 정상적으로 변경되었습니다.");
                        window.location.href = "/";
                    }
                }
            ).catch((e) => { console.log(e) });
        } else {
            alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.")
        }
    };

    return (
        <div class="form_wrapper">
            <div class="form_container">
                <div class="title_container">
                    <h2>비밀번호 변경</h2>
                </div>
                <div class="row clearfix">
                    <div>
                        <div class="input_field">
                            <span><i class="fa fa-envelope" aria-hidden="true"></i></span>
                            <input
                                type="password"
                                id="password1"
                                name="password1"
                                value={password1}
                                onChange={handlePasswordChange}
                                placeholder="비밀번호를 입력해주세요."
                                required />
                            <span><i class="fa fa-envelope" aria-hidden="true"></i></span>
                            <input
                                type="password"
                                id="password2"
                                name="password2"
                                value={password2}
                                onChange={handlePasswordChange}
                                placeholder="비밀번호를 입력해주세요."
                                required />
                        </div>
                        <button onClick={checkPassword}>확인</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PasswordResetFrame;