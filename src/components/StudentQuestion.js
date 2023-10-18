import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Question.css";
import NewQuestionForm from "./NewQuestionForm";
import StudentQuestionDetail from "./StudentQuestionDetail";

function StudentQuestion(props) {

    const [questionDetail, setQuestionDetail] = useState("");
    const [questionList, setQuestionList] = useState([]);
    const [showQuestion, setShowQuestion] = useState("list");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    


    useEffect(() => {
        renderQuestionList();        
    },[])

    
    const renderQuestionList = () => {
        axios.get(`/api/v1/lecture/${props.lecturecode}/questions/permitted-only`, currentPage)
        .then((response) => {
            setQuestionList(response.data);
            setTotalPages(response.data.totalPages);
        })
        .catch((error) => {
            console.log("질문리스트 불러오기 실패",error);
        })

    }

    const clickQuestion = (questionId) => {
      axios.get(`/api/v1/lecture/${props.lecturecode}/question/${questionId}`)
      .then((response) => {
        setQuestionDetail(response.data);
        setShowQuestion('detail');
      })
      .catch((error) => {
        console.log("질문 읽기 실패", error);
      })
    }

    const clickBackward = () => {
      setShowQuestion('list')
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
          <button className="icon-button" >
            <img src="image/alarm-bell-symbol.png" alt="아이콘 이미지" />
          </button>
          <div className="msg left_msg">
          {
              showQuestion === 'list' ? (
                questionList.map((data, index) => {
                  <a href="#" onClick={clickQuestion(data.questionId)} className="question" key={index}>{`Q${index + 1}) ${data.questionTitle}`}</a>
                })
              ) : showQuestion === 'detail' ? (
                <StudentQuestionDetail {...questionDetail} lecturecode={props.lecturecode} />
              ) : (
                <NewQuestionForm {...questionDetail} lecturecode={props.lecturecode}/>
              )
            }   
          </div>       
          <div className="msg_bubble">
            <div className="msg_info"></div>
            { showQuestion === 'list' && (
              <div className="page-number">
              {Array.from({length: totalPages},(_,index) => {
                <button key={index} onClick={() => handlePageChange(index+1)} className={currentPage === index+1 ? "active" : ""}>
                  {index+1}
                </button>
              })}
            </div>
            )}
          </div>
        </main>
      </div>
    );
}

export default StudentQuestion;