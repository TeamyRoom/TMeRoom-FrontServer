import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Question.css";

function StudentQuestion(props) {

    const [question, setQuestion] = useState("");
    const [questionDetail, setQuestionDetail] = useState("");
    const [questionList, setQuestionList] = useState([]);
    const [editQuestion, setEditQuestion] = useState("");
    const [visibility, setVisibility] = useState("");
    const [showQuestionList, setShowQuestionList] = useState(true);
    const [showQuestionDetail, setShowQuestionDetail] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    


    useEffect(() => {
        renderQuestionList();        
    },[])

    
    const renderQuestionList = () => {
        axios.get(`/api/v1/lecture/${props.code}/questions/permitted-only`, currentPage)
        .then((response) => {
            setQuestionList(response.data);
            setTotalPages(response.data.totalPages);
        })
        .catch((error) => {
            console.log("질문리스트 불러오기 실패",error);
        })

    }

    const handleVisibilityChange= (e) => {
        setVisibility(e.target.value);
    }

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    }

    const handleQuestionEdit = (e) => {
      setEditQuestion(e.target.value);
    }

    const clickQuestion = (questionId) => {
      axios.get(`/api/v1/lecture/${props.code}/question/${questionId}`)
      .then((response) => {
        setQuestionDetail(response.data);
        setShowQuestionDetail(true);
        setShowQuestionList(false);
      })
      .catch((error) => {
        console.log("질문 읽기 실패", error);
      })
    }

    const clickBackward = () => {
      setShowQuestionList(true)
      setShowQuestionDetail(false);
      renderQuestionList();
    }

    const uploadQustion = () => {
      axios.post(`/api/v1/lecture/${props.code}/question`,question)
      .then((response) => {
        console.log("질문 업로드 성공", response);
      })
      .catch((error) => {
        console.log("질문 업로드 실패", error);
      })
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
                      {questionList.map((data, index) => {
                        <a href="#" onClick={clickQuestion(data.questionId)} className="question" key={index}>{`Q${index + 1}) ${data.questionTitle}`}</a>
                      })}
          </div>
          <div className="msg_bubble">
            <div className="msg_info"></div>
            <div className="msg_text">
              <p className="answer">A1) </p>
            </div>
            <div className="page-number">
              {Array.from({length: totalPages},(_,index) => {
                <button key={index} onClick={() => handlePageChange(index+1)} className={currentPage === index+1 ? "active" : ""}>
                  {index+1}
                </button>

              })}
            </div>
          </div>
        </main>
        <form className="msger_inputarea" >
          <div className="msger_input_container">
              <select
                className="dropbtn"
                value={visibility}
                onChange={handleVisibilityChange}
              >
                <option value="선택안함">선택 안 함</option>
                <option value="공개">공개</option>
                <option value="비공개">비공개</option>
              </select>
            <input
              type="text"
              className="msger_input"
              placeholder="질문을 입력하세요"
              value={question}
              onChange={handleQuestionChange}
            />
            <button onClick={uploadQustion} type="submit" className="msger_send_btn">
              질문
            </button>
          </div>
        </form>
      </div>
    );
}

export default StudentQuestion;