import { useEffect, useState } from "react";
import { call } from "../../service/ApiService";
import "../../css/MyPage.css";

export default function MyPage({handlePage}) {

    const [myInfo, setMyInfo] = useState({nickname: '', memberId: '', email: ''});

    useEffect(() => {
        call("/member", "GET")
            .then((response) => {
                if(response.resultCode === "SUCCESS") {
                    setMyInfo(response.result);
                }
            })
    }, []);

    return (
        <div id="form-container">
            <div id="form-inner-container">
                <div id="my-page-container">
                    <h3 id="my-page-head">내 정보</h3>
                        <label className="my-page-label">ID</label>
                        <span className="my-page-input" type="text" name="name" id="name">{myInfo.memberId}
                        </span>

                        <label className="my-page-label">닉네임</label>
                        <span className="my-page-input" type="email" name="email" id="email">{myInfo.nickname}
                        <img className="my-page-img" src="/images/pencil.png" onClick={() => handlePage(1)}/>
                        </span>

                        <label className="my-page-label">이메일</label>
                        <span className="my-page-input" type="password" name="password" id="password">{myInfo.email}
                        <img className="my-page-img" src="/images/pencil.png" onClick={() => handlePage(2)}/>
                        </span>
                </div>
            </div>
        </div>

    )
}