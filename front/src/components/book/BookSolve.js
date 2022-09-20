import {Button} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';

function BookSolve()
{
    const[obj, setObj] = useState();

    useEffect(() => {
        let params = queryString.parse(window.location.search);
        axios({
            method : "GET",
            url : `http://localhost:5000/question/${params.question}`
        }).then(res => {
            setObj(res.data);
        })
    }, []);
    
    return(
        <div className='booksolve-main'>
            <div className='booksolve-area'>
                <div className='booksolve-question'>
                    <span>{obj? obj.subject : "로딩중.."}</span>
                </div>
                <div className='booksolve-answer'>
                     {obj? <AnswerCheck answer={obj.answers}/> : "로딩중"}
                </div>
            </div>
        </div>
    );
}

function AnswerCheck(props)
{
    const[answer, setAnswer] = useState(props.answer);
    const[userAnswer, setUserAnswer] = useState([]);

    useEffect(() => {
        let tmp = [];
        for(let i=0; i<answer.length; i++){
            tmp[i]=0;
        }
        setUserAnswer(tmp);
    }, [])

    return(
        <div className='answer-main'>
            {answer.map((obj, index) => {
                return <AnswerChoice answers={obj.subject} index={index+1} userAnswer={userAnswer}/>
            })}
        </div>
    )
}

function AnswerChoice(props)
{
    const [isAnswer, setIsAnswer] = useState(0);
    const [answer, setAnswer] = useState(props.answers);
    const [index, setIndex] = useState(props.index);
    const [userAnswer, setUserAnswer] = useState(props.userAnswer);

    return(
        <div className='answer-check'>
            <Button variant={isAnswer?'secondary':'outline-secondary'} onClick={()=> {setIsAnswer(isAnswer?0:1)}}>{index}</Button>{' '}
            <span>{answer}</span>
            <SubmitBtn userAnswer={userAnswer} isAnswer={isAnswer}/>
        </div>
    )
}

function SubmitBtn(props)
{
    const [userAnswer, setUserAnswer] = useState(props.userAnswer);
    const [isAnswer, setIsAnswer] = useState(props.isAnswer);

    const grading = () => {
        let answer = [];
        for(let i=0; i<userAnswer.length; i++){
            answer[i] = isAnswer;
        }
        let cursor = 0;
        while(cursor < userAnswer.length){
            if(answer[cursor] !== userAnswer[cursor]){
                return false;
            }
        }
    }
    return(
        <div className='answer-submit'>
            <Button variant='secondary' size='lg' onClick={()=>{grading(isAnswer)}}>제출</Button>
        </div>
    )
}

export default BookSolve;