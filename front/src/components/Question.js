import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import QueryString from 'qs';

function Question()
{
    const [subject, setSubject] = useState();

    return(
        <div className="question-regist-main">
            <div className="question-regist-subject">
                <span className="title">• 문제 &nbsp;</span>
                <input className="subject" onChange={(e)=>{setSubject(e.target.value)}}></input>
            </div>
            <div className="question-regist-answer">
                <span className="title">• 답</span>
                <InputAnswer subject={subject}/>
            </div>
        </div>
    );
}

function InputAnswer(props)
{
    const [answer, setAnswer] = useState();
    const [isAnswer, setIsAnswer] = useState(0);
    const qs = require('qs');

    const RegistQuestion = () => {

        const url = "http://localhost:5000/question"
        const data = {
            subject: props.subject,
            answers: [
                {
                    subject: answer,
                    isAnswer: isAnswer
                }
            ]
        }

        console.log(data);
        
        return axios.post(url, data);
    }

    return(
        <div className="input-answer-main">
            <div className='input-answer'>
                <input className="input-answer" onChange={(e)=>{setAnswer(e.target.value)}}></input>
                <span className={isAnswer?"answer-btn on":"answer-btn"} onClick={()=>{setIsAnswer(isAnswer?0:1)}}>정답</span>
            </div>
            <div className="question-regist">
                <button className="regist-btn" onClick={() => {RegistQuestion()}}>등록하기</button>
            </div>
        </div>
    );
}

export {Question, InputAnswer}