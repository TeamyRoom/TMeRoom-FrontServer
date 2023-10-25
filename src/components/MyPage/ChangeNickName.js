import { useRef } from "react"
import Button from '@mui/material/Button';
import { call } from "../../service/ApiService";
import "../../css/MyPage.css";

export default function ChangeEmail({handlePage}) {

    const emailRef = useRef();

    const submit = () => {
        alert('아직 구현되지 않음');
        handlePage(0);
    }

    return (
        <div id="form-container">
            <div id="form-inner-container">
                <div id="my-page-container">
                    <h3 id="my-page-head">닉네임 변경</h3>
                        <label className="my-page-label">변경 할 닉네임</label>
                        <input className="my-page-input" type="text" ref={emailRef}/>
                        <Button variant="contained" onClick={submit}>수정</Button>
                </div>
            </div>
        </div>

    )
}