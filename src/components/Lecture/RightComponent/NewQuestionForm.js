import React, {useState} from 'react';
import axios from 'axios';
import {call} from '../../../service/ApiService'
import '../../../css/QuestionDetail.css'
import {Button} from '@mui/material';


function NewQuestionForm(props) {
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionContent, setQuestionContent] = useState('');
    const [questionVisibility, setQuestionVisibility] = useState('');


    
    const uploadQuestion =  () => {
        const questionData = {
            title : questionTitle,
            content : questionContent,
            isPublic : questionVisibility==='public' ? true : false
        };


       call(`/lecture/${props.lecturecode}/question`,"POST",questionData).
       then((response) => {
        if (response.resultCode === "SUCCESS") {
            alert("질문이 등록되었습니다.");
            setQuestionTitle('');
            setQuestionContent('');
            props.addQuestion();
        }            
       });

      }


    const handleChangeQuestionTitle = (e) => {
      setQuestionTitle(e.target.value);
    }

    const handleChangeQuestionContent = (e) => {
      setQuestionContent(e.target.value);
    }

    const handleChangeQuestionVisibility = (e) => {
        setQuestionVisibility(e.target.value);
    }

    return (
      <div>
          <div className="body"></div>
          <div className="msg_bubble_wrap">       
              <div className="msg_bubble_new">
                <div className="different-footer">
                <div className="msg_bubble">
                    <p>제목:</p><input placeholder='제목을 입력해주세요' maxLength="15" value={questionTitle} onChange={handleChangeQuestionTitle} className="different-title-new"></input>
                    <p>내용:</p><textarea placeholder="내용을 입력해주세요" value={questionContent} onChange={handleChangeQuestionContent} className="different-detail-new"></textarea>
                        <div className="different-footer">
                            <div className="msger_input_container">
                                <div className="dropdown">
                                    <Button className="dropbtn">공개 여부</Button>
                                    <div className="dropdown-content">
                                        <label>
                                        <input
                                            type="radio"
                                            name="privacy"
                                            value="public"
                                            checked={questionVisibility === 'public'}
                                            onChange={handleChangeQuestionVisibility}
                                        />
                                        공개
                                        </label>
                                        <label>
                                        <input
                                            type="radio"
                                            name="privacy"
                                            value="private"
                                            checked={questionVisibility === 'private'}
                                            onChange={handleChangeQuestionVisibility}
                                        />
                                        비공개
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <Button variant='contained' sx={{ justifyContent: "flex-end"}} className="different-nickname-new" onClick={uploadQuestion}>등록</Button>
                        </div>
                    </div>
                </div>
              </div>           
          </div>
          </div>
    );
};

export default NewQuestionForm;
