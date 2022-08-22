import { useState } from 'react';
import axios from 'axios';

function Question()
{
    const [subject, setSubject] = useState();
    const [answer, setAnswer] = useState();
    const [isAnswer, setIsAnswer] = useState(0);

    const submitQuestion = () => {
        const url = "http://localhost:5000/question";
        const data = {
            subject: subject,
            answers: [
                {
                    subject: answer,
                    isAnswer: isAnswer
                }
            ]
        }
        console.log(data);
        axios.post(url, data);
    }

    return(
        <div className='Question-main'>
            <div className='subject-title'>
                <span className='subject'>• 문제</span>
                <input className='subject-input' value={subject} onChange={(e) => {setSubject(e.target.value)}}></input>
            </div>
            <div className='answer-title'>
                <span className='answer'>• 답</span>
                <div className='answer-input-area'>
                    <label><input className='answer-input' value={answer} onChange={(e) => {setAnswer(e.target.value)}}></input></label>
                    <span className={isAnswer?"isAnswer-btn on":"isAnswer-btn"} onClick={()=>{setIsAnswer(isAnswer?0:1)}}>정답</span>
                </div>
            </div>
            <div className='regist-area'>
                <button className='regist-btn' onClick={() => {submitQuestion()}}>등록하기</button>
            </div>
        </div>
    )
}

export default Question;