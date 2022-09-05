import {Button} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BookSolve()
{
    const[subject, setSubject] = useState("");
    const[answer, setAnswer] = useState("");
    const qid = useParams();

    useEffect(() => {
        axios({
            method : "GET",
            url : `http://localhost:5000/question/${qid.qid}`
        }).then(res => {
            setSubject(res.data.subject);
            setAnswer(res.data.answers);
        })
    },[]);

    return(
        <div className='booksolve-main'>
            <div className='booksolve-area'>
                <div className='booksolve-question'>
                    <span>{subject}</span>
                </div>
                <div className='booksolve-answer'>
                    <AnswerCheck answer={answer}/>
                </div>
            </div>
        </div>
    );
}

function AnswerCheck(props)
{
    const[isAnswer, setIsAnswer] = useState(0);
    const[answer, setAnswer] = useState(props.answer);

    const submitAnswer=()=>{
        /*제출 누르면 답 보내는거*/
    }

    return(
        <div className='answer-main'>
            <div className='answer-check'>
            <Button variant={isAnswer?'secondary':'outline-secondary'} onClick={()=> {setIsAnswer(isAnswer?0:1)}}>1</Button>{' '}
            <span>일번답</span>
            </div>
            <div className='answer-submit'>
                <Button variant='secondary' size='lg' onClick={()=>{submitAnswer()}}>제출</Button>
            </div>
        </div>
    )
}

export default BookSolve;