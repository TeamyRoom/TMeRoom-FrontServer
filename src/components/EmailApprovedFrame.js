import { confirmEmail } from "../service/ApiService";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "../css/ConfirmPage.css";


function EmailApprovedFrame() {
    const { confirmcode } = useParams();
    const [isSuccess, setSuccess] = useState([]);

    useEffect(() => {
        confirmEmail(confirmcode).then(
            res => {
                try{
                    switch(res.resultCode){
                        case "SUCCESS":
                            setSuccess(true);
                            break;
                        default:
                            setSuccess(false);
                            break;
                    }
                }
                catch{
                    setSuccess(false);
                }
            }
        );
    }, []);

    return (
        <div class="form_wrapper">
            <div class="form_container">
                <div class="title_container">
                    <h2 class="email-check">이메일 인증안내</h2>
                </div>
                <div class="row clearfix">
                    <div>
                        <form>
                            {
                                isSuccess ?
                                    <div class="input_field">
                                        <h2 class="title-text">이메일 인증이 완료되었습니다. 메인페이지에서 로그인을 진행해 주세요.</h2>
                                    </div>
                                    :
                                    <div class="input_field">
                                        <h2 class="title-text">이메일 인증에 실패했습니다. 다시 시도해 주세요.</h2>
                                    </div>
                            }
                            <input class="button" onClick={() => {window.location.href="/"}} value="메인페이지로 돌아가기" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EmailApprovedFrame;