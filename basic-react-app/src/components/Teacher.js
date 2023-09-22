import { useParams } from "react-router-dom";
import TeacherScreen from "./TeacherScreen"
import Chatting from "./Chatting";

function Teacher() {
    const {code} = useParams();
    const {nickname} = useParams();

    return (
        <div className='teacher'>
            <h2>선생 전체 뷰</h2>
            <h3>강의 코드 : {code} / 닉네임 : {nickname}</h3>
            <TeacherScreen code={code}/>
            <Chatting code={code} nickname={nickname}/>
        </div>
    )
}

export default Teacher;