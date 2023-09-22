import Chatting from "./Chatting";
import StudentScreen from "./StudentScreen";
import { useParams } from "react-router-dom";

function Student() {

    const {code} = useParams();
    const {nickname} = useParams();

    return (
        <div className='studenet'>
            <h2>학생 페이지</h2>
            <h3>강의 코드 : {code} / 닉네임 : {nickname}</h3>
            <StudentScreen code={code}/>
            <Chatting code={code} nickname={nickname}/>
        </div>
    )
}

export default Student;