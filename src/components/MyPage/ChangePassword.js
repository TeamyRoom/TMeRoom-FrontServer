import { useRef } from "react"
import Button from '@mui/material/Button';
import { call } from "../../service/ApiService";
import "../../css/MyPage.css";

export default function ChangePassword({ handlePage }) {

    const oldpwRef = useRef();
    const pwRef = useRef('');

    const submit = () => {
        if(pwRef.current.value === '') {
            alert("변경 할 비밀번호를 입력해주세요.");
            return;
        }
        call("/member/password", "PUT", { oldPassword: oldpwRef.current.value, newPassword: pwRef.current.value })
            .then((response) => {
                if (response.resultCode === "SUCCESS") {
                    alert('변경되었습니다.');
                    handlePage(0);
                }
            })
            .catch((e) => { console.log(e) });

    }

    return (
        <div id="form-container">
            <div id="form-inner-container">
                <div id="my-page-container">
                    <h3 id="my-page-head">비밀번호 변경</h3>
                    <label className="my-page-label">기존 비밀번호</label>
                    <input className="my-page-input" type="password" ref={oldpwRef} />
                    <label className="my-page-label">변경 할 비밀번호</label>
                    <input className="my-page-input" type="password" ref={pwRef} />
                    <Button variant="contained" onClick={submit}>수정</Button>
                </div>
            </div>
        </div>

    )
}