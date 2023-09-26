import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();
    const codeRef = useRef("");
    const nickname = "임시닉네임";

    const goTeacher = () => {
        if (codeRef === "") alert('강의 코드를 입력해주세요.');
        else navigate(`teacher/${codeRef.current.value}/${nickname}`);
    }

    const goStudent = () => {
        if (codeRef === "") alert('강의 코드를 입력해주세요.');
        else navigate(`student/${codeRef.current.value}/${nickname}`);
    }

    return (
        <div className='home'>
            <link rel="stylesheet" href="https://unpkg.com/mvp.css" />

            <input type="text" placeholder="강의 코드" ref={codeRef} />
            <button onClick={goTeacher}>선생 입장</button>
            <button onClick={goStudent}>학생 입장</button>
        </div>
    )
}

export default Home;