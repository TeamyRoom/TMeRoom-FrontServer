import { useEffect, useState } from "react";
import axios from "axios";
import NewQuestionForm from "./NewQuestionForm";
import TeacherQuestionDetail from "./TeacherQuestionDetail";
import "../../../css/File.css";

function TeacherQuestion(props) {

    const [questionDetail, setQuestionDetail] = useState("");
    const [questionList, setQuestionList] = useState([]);
    const [showQuestion, setShowQuestion] = useState("list");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    


    useEffect(() => {
        renderQuestionList();        
    },[])

    
    const renderQuestionList = () => {

      axios.get(`http://localhost:8080/api/v1/lecture/${props.lecturecode}/questions/permitted-only`, 
      {withCredentials:true, 
        params: {
        page: currentPage, // 페이지 번호를 매개변수로 전달
        size: totalPages
      }})
      .then((response) => {
          setQuestionList(response.data);
          setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
          console.log("질문리스트 불러오기 실패",error);
      })
    }

    const clickQuestion = (questionId) => {
      axios.get(`http://localhost:8080/api/v1/lecture/${props.lecturecode}/question/${questionId}`)
      .then((response) => {
        setQuestionDetail(response.data);
        setShowQuestion('detail');
      })
      .catch((error) => {
        console.log("질문 읽기 실패", error);
      })
    }

    const clickCreateQuestion = () => {
      setShowQuestion('create');
    }

    const clickBackward = () => {
      setShowQuestion('list');
      renderQuestionList();
    }



    const handlePageChange = (page) => {
      setCurrentPage(page);
      renderQuestionList();
    }

    


    return(
<div className="chat_area">
            <main className="msger_chat">
                <p className="Resource">Q&A</p>
  
                <div className="search-container">
                </div>
                <div className="msg_bubble">
                {
              showQuestion === 'list' ? (
                questionList.map((data, index) => {
                  <a href="#" onClick={clickQuestion(data.questionId)} className="question" key={index}>{`Q${index + 1}) ${data.questionTitle}`}</a>
                })
              ) : showQuestion === 'detail' ? (
                <TeacherQuestionDetail {...questionDetail} lecturecode={props.lecturecode} />
              ) : (
                <NewQuestionForm {...questionDetail} lecturecode={props.lecturecode}/>
              )
            }  
                <div className="msg_text">
                </div>
            </div>           
            { showQuestion === 'list' && (
              <div className="page-number">
              {Array.from({length: totalPages},(_,index) => {
                <button key={index} onClick={() => handlePageChange(index+1)} className={currentPage === index+1 ? "active" : ""}>
                  {index+1}
                </button>
              })}
            </div>
            )}
            </main>
            <div className="msger_inputarea"><button onClick={clickCreateQuestion}>질문하기</button></div>  
                
        </div>

      
    );
}

export default TeacherQuestion;

