import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const goTeacher = () => {
        navigate("/teacher");
    }

    const goStudent = () => {
        navigate("/student");
    }

    return (
        <div className='home'>
            <link rel="stylesheet" href="https://unpkg.com/mvp.css" />
            <button onClick={goTeacher}>선생 입장</button>
            <button onClick={goStudent}>학생 입장</button>
        </div>
    )
}

export default Home;