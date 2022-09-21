import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

function BookSolve() {

    const { bookId } = useParams();
    const [book, setBook] = useState();
    const [cursor, setCursor] = useState(0);

    useEffect(()=>{
        axios({
            method : "GET",
            url : `http://localhost:5000/book/${bookId}`
        })
        .then(res=>{
            setBook(res.data);
        });
    },[]);

    return(
        <div>
            <div>문제풀기이다</div>            
            <Button onClick={()=>{setCursor(cursor-1)}}>이전</Button>
            <Button onClick={()=>{setCursor(cursor+1)}}>다음</Button>
            <Button>제출</Button>
            <button onClick={()=>{console.log(book)}}>TEST</button>
            <hr/>
            { book ? book[cursor] ? <Question cursor={cursor} question={book[cursor]} /> : "커서에 맞는 question객체 가 없을때" : "book객체 자체가 없을때 useEffect전" }
        </div>
    );
}

function Question(props) {    
    const [question, setQuestion] = useState(props.question);
    const [answers, setAnswers] = useState();    
    const [userChoice, setUserChoice] = useState([]);

    useEffect(()=>{
        axios({
            method : "GET",
            url : `http://localhost:5000/answer/getanswer/${props.question.qid}`
        })
        .then(res=>{
            console.log(res.data);
            let temp = new Array();
            let i=0;
            while(i < res.data.length) {
                temp.push(0);
                i++;
            }
            setUserChoice(temp);
            setAnswers(res.data);
        });
    }, []);

    const answerChoice = (index) => {
        let temp = [...userChoice];
        temp[index] = temp[index] == 0 ? 1 : 0;
        setUserChoice(temp);
    }

    return(
        <div>
            <h1>{props.cursor + 1}. {question.a_subject}</h1>
            <div>
                {answers ? answers.map((obj, index) => {
                    return <Answer key={index} index={index} choice={userChoice[index]} subject={obj.subject} answerChoice={answerChoice}/>
                }) : "로딩중..."}
            </div>
        </div>
    );
}

function Answer(props) {
    return(
        <div className={props.choice == 1 ? "answer-choice on" : "answer-choice" } onClick={()=>{props.answerChoice(props.index)}}>{ props.subject }</div>
    );
}

export default BookSolve;
