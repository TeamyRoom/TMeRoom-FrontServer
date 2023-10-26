import { useRef, useState } from "react"
import Button from '@mui/material/Button';
import { call, emailDuplicateCheck } from "../../service/ApiService";
import "../../css/MyPage.css";

export default function ChangeEmail({handlePage}) {
    const [emailDuplicate, setEmailDuplicate] = useState(false);
    const [email, setEmail] = useState("");

    function isEmailValid(emailString) {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailRegex.test(emailString);
      }

    function handleEmailCheck() {
        if (email === "") {
            alert("Email을 기입해주세요.");
            return;
        }
        if (!isEmailValid(email)){
            alert("유효한 Email 형식이 아닙니다.");
            return;
        }

        emailDuplicateCheck(email).then(
            (response) => {
                if (response.resultCode === "SUCCESS") {
                    setEmailDuplicate(!response.result);
                    if (response.result) alert("중복된 Email 입니다.");
                }
            }
        ).catch((e) => { console.log(e) });
    }

    function DupButton({ handleOnclick, isDisable }) {

        const btnStyle = {
            width: '4rem',
            height: '30px',
            backgroundColor: isDisable ? 'grey' : 'green',
            color: isDisable ? '#ccc' : '#fff',
            border: 'none',
            outline: 'none',
            borderRadius: '6px',
            fontSize: '0.8em',
            fontWeight: '500',
            alignSelf: 'center',
            margin: '5px',
        };

        return (
            <button style={btnStyle} onClick={handleOnclick} disabled={isDisable}>
                {isDisable ? "✔" : "중복 체크"}
            </button>
        );
    }

    const submit = () => {
        if(email === '') {
            alert("변경 할 이메일을 입력해주세요.");
            return;
        }
        if(emailDuplicate == false){
            alert("이메일 중복체크를 진행해주세요.");
            return;
        }

        call("/member/email", "PUT", { newEmail: email })
            .then((response) => {
                if (response.resultCode === "SUCCESS") {
                    alert('메일 발송 완료. 입력하신 메일로 이메일 설정 메일이 발송되었습니다.');
                    handlePage(0);
                }
            })
            .catch((e) => { console.log(e) });
    }

    return (
        <div id="form-container">
            <div id="form-inner-container">
                <div id="my-page-container-email">
                    <h3 id="my-page-head">이메일 변경</h3>
                        <label className="my-page-label">변경 할 이메일</label>
                        <div className="my-page-wrapper">
                            <input className="my-page-input" type="email"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setEmailDuplicate(false);
                                    }
                            }/>
                            <DupButton handleOnclick={handleEmailCheck} 
                                    isDisable={emailDuplicate} 
                                />
                        </div>
                        <Button variant="contained" onClick={submit}>수정</Button>
                </div>
            </div>
        </div>

    )
}