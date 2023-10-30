import { useEffect, useState } from "react";
import NewQuestionForm from "./NewQuestionForm";
import StudentQuestionDetail from "./StudentQuestionDetail";
import "../../../css/Question.css";
import { call, getAccessToken } from "../../../service/ApiService"
import { List, ListItem, ListItemText, Divider, Button, TextField} from "@mui/material";

function StudentQuestion(props) {

    const [questionDetail, setQuestionDetail] = useState("");
    const [questionList, setQuestionList] = useState([]);
    const [showQeustionList, setShowQuestionList] = useState(true);
    const [showQeustionDetail, setShowQuestionDetail] = useState(false);
    const [showQeustionNew, setShowQuestionNew] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [toMain, setToMain] = useState(false);


    useEffect(() => {
        renderQuestionList();        
    },[,currentPage,showQeustionList])


    
    const renderQuestionList = () => {

      const params = {
        page: currentPage-1,
        size: '9'
      }

      call(`/lecture/${props.lecturecode}/questions`, "GET", params)
        .then((response) => {
            setQuestionList(response.result.content);
            setTotalPages(response.result.totalPages);
        })
        .catch((error) => {
          console.log(error);
        })
    }

    const clickQuestion = (questionId) => {

      call(`/lecture/${props.lecturecode}/question/${questionId}`, "GET")
        .then((response) => {
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
      setCurrentPage(1);
    }



    const handlePageChange = (page) => {
      setCurrentPage(page);
    }

    const allClose = () => {
      setShowQuestionDetail(false);
      setShowQuestionList(false);
      setShowQuestionNew(false);

    }

    const handleQuestionDetail = () => {
      allClose();
      setShowQuestionList(true);
    }
    


    return(
<div className="chat_area">
            <main className="msger_chat-qna-main">
                <p className="Resource-qna-main">Q&A</p>
  
                <div className="search-container">
                </div>
                <div className="msg_bubble-qna-main">
                  <List>
                {showQeustionList && (
                questionList.map((data, index) => (
                  <ListItem button divider onClick={() => {clickQuestion(data.questionId)}} className="question" key={index}><ListItemText primary={`Q) ${data.questionTitle}`}/></ListItem>
                ))
              ) }
              {showQeustionDetail && (
                <StudentQuestionDetail 
                questionId={questionDetail.questionId} 
                authorNickname={questionDetail.authorNickname} 
                createdAt={questionDetail.createdAt}
                title={questionDetail.questionTitle}
                content={questionDetail.questionContent}
                lecturecode={props.lecturecode}
                deleteQuestion={handleQuestionDetail} />
              ) } 
              {showQeustionNew && (
                <NewQuestionForm lecturecode={props.lecturecode} addQuestion={handleQuestionDetail}/>
              )
              } 
                </List>
            </div>           
            { showQeustionList && (
              <div className="page-number-qna-main">
              {Array.from({length: totalPages},(_,index) => (
                <button key={index} onClick={() => handlePageChange(index+1)} className='page-number-button'>
                  {index+1}
                </button>
              ))}
            </div>
            )}
            <Button variant="contained" onClick={clickCreateQuestion}>
              질문하기
            </Button>
            <Button onClick={clickBackward} className="to-main">
              메인으로
            </Button>
            </main>
                
        </div>

      
    );
}

export default StudentQuestion;

