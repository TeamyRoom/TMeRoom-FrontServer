import { useRef } from "react"
import Button from '@mui/material/Button';
import { call } from "../../service/ApiService";
import "../../css/MyPage.css";

export default function ChangePassword({handlePage}) {

    const pwRef = useRef();

    const submit = () => {
        alert('아직 구현되지 않음');
        handlePage(0);
    }

    return (
        <div id="form-container">
            <div id="form-inner-container">
                <div id="my-page-container">
                    <h3 id="my-page-head">비밀번호 변경</h3>
                        <label className="my-page-label">변경 할 비밀번호</label>
                        <input className="my-page-input" type="password" ref={pwRef}/>
                        <Button variant="contained" onClick={submit}>수정</Button>
                </div>
            </div>
        </div>

    )
}