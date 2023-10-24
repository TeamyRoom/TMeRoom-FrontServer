import { useEffect, useState } from "react";
import axios, { all } from "axios";
import NewQuestionForm from "./NewQuestionForm";
import TeacherQuestionDetail from "./TeacherQuestionDetail";
import "../../../css/File.css";
import { call, getAccessToken } from "../../../service/ApiService"

function TeacherQuestion(props) {

    const [questionDetail, setQuestionDetail] = useState("");
    const [questionList, setQuestionList] = useState([]);
    const [showQeustionList, setShowQuestionList] = useState(true);
    const [showQeustionDetail, setShowQuestionDetail] = useState(false);
    const [showQeustionNew, setShowQuestionNew] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    


    useEffect(() => {
        renderQuestionList();        
    },[])

    
    const renderQuestionList = () => {

      const params = {
        page: currentPage-1
      }

      call(`/lecture/${props.lecturecode}/questions`, "GET", params)
        .then((response) => {
            setQuestionList(response.result.content);
            console.log("resp" , response);
            setTotalPages(response.result.totalPages);
        })
        .catch((error) => {
          console.log(error);
        })
    }

    const clickQuestion = (questionId) => {

      console.log("showquestion은 ", questionId);

      call(`/lecture/${props.lecturecode}/question/${questionId}`, "GET")
        .then((response) => {
          console.log("hey", response);
            setQuestionDetail(response.result);
            allClose();
            setShowQuestionDetail(true);
        });
    }

    const clickCreateQuestion = () => {
      allClose();
      setShowQuestionNew(true);
    }

    const clickBackward = () => {
      allClose();
      setShowQuestionList(true);
      renderQuestionList();
    }



    const handlePageChange = (page) => {
      setCurrentPage(page);
      renderQuestionList();
    }

    const allClose = () => {
      setShowQuestionDetail(false);
      setShowQuestionList(false);
      setShowQuestionNew(false);

    }
    


    return(
<div className="chat_area">
            <main className="msger_chat">
                <p className="Resource">Q&A</p>
  
                <div className="search-container">
                </div>
                <div className="msg_bubble">
                {
              showQeustionList && (
                questionList.map((data, index) => (
                  <button onClick={() => {clickQuestion(data.questionId)}} className="question" key={index}>{`Q${index + 1}) ${data.questionTitle}`}</button>
                ))
              ) }
              {showQeustionDetail && (
                <TeacherQuestionDetail 
                questionId={questionDetail.questionId} 
                authorNickname={questionDetail.authorNickname} 
                createdAt={questionDetail.createdAt}
                title={questionDetail.questionTitle}
                content={questionDetail.questionContent}
                lecturecode={props.lecturecode} />
              ) } 
              {showQeustionNew && (
                <NewQuestionForm lecturecode={props.lecturecode}/>
              )
              }  
                <div className="msg_text">
                </div>
            </div>           
            { showQeustionList && (
              <div className="page-number">
              {Array.from({length: totalPages},(_,index) => (
                <button key={index} onClick={() => handlePageChange(index+1)} className={currentPage === index+1 ? "active" : ""}>
                  {index+1}
                </button>
              ))}
            </div>
            )}
            </main>
                
        </div>

      
    );
}

export default TeacherQuestion;

