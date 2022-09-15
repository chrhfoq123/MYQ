import {Button} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';

function BookSolve()
{
    const[obj, setObj] = useState();
    const[subject, setSubject] = useState();
    const[answer, setAnswer] = useState([]);

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
    const[isAnswer, setIsAnswer] = useState(0);
    const[answer, setAnswer] = useState(props.answer);

    const submitAnswer=()=>{
        /*제출 누르면 답 보내는거*/
    }
    console.log(answer);

    return(
        <div className='answer-main'>
            <div className='answer-check'>
            <Button variant={isAnswer?'secondary':'outline-secondary'} onClick={()=> {setIsAnswer(isAnswer?0:1)}}>1</Button>{' '}
            {/*하나하나 따로 나오게 수정해야됨*/}
            <span>{answer.map((obj, index) => {
                return obj.subject
            })}</span>
            </div>
            <div className='answer-submit'>
                <Button variant='secondary' size='lg' onClick={()=>{submitAnswer()}}>제출</Button>
            </div>
        </div>
    )
}

export default BookSolve;