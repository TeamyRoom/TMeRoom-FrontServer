import { useRef } from "react"
import Button from '@mui/material/Button';
import { call } from "../../service/ApiService";
import "../../css/MyPage.css";

export default function ChangeEmail({handlePage}) {

    const nicknameRef = useRef('');

    const submit = () => {
        if(nicknameRef.current.value === '') {
            alert('변경 할 닉네임을 입력해주세요.');
            return;
        }
        call("/member", "PUT", {nickname: nicknameRef.current.value})
        .then((response) => {
            if(response.resultCode === "SUCCESS") {
                alert("변경되었습니다.");
                handlePage(0);
            }
            else alert("변경에 실패했습니다.");
        })
        .catch((e) => {alert(e)});
    }

    return (
        <div id="form-container">
            <div id="form-inner-container">
                <div id="my-page-container">
                    <h3 id="my-page-head">닉네임 변경</h3>
                        <label className="my-page-label">변경 할 닉네임</label>
                        <input className="my-page-input" type="text" ref={nicknameRef}/>
                        <Button variant="contained" onClick={submit}>수정</Button>
                </div>
            </div>
        </div>

    )
}