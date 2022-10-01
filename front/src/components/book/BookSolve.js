import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

function BookSolve() {

    const { bookId } = useParams();
    const [book, setBook] = useState();
    const [cursor, setCursor] = useState(0);

    console.log(book);

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
        <div className="booksolve">
            {/*문제집 Title 큼지막하게*/}
            <div className="book-title">
                문제집 Title : {book ? book[0].subject : "로딩"}
                <Button href="/Book">나가기</Button>
            </div>
            {/*이전, 다음버튼 답체크 밑에 중간으로*/}
            <hr/>
            { book ? book[cursor] ? <Question cursor={cursor} question={book[cursor]}/> : "커서에 맞는 question객체 가 없을때" : "book객체 자체가 없을때 useEffect전" }
            <div className="move-btn">
                <Button className="asdf"onClick={()=>{setCursor(cursor-1)}}>이전</Button>
                <Button onClick={()=>{setCursor(cursor+1)}}>다음</Button>
            </div>
        </div>
    );
}

function Question(props) {    
    const [question, setQuestion] = useState();    
    const [answers, setAnswers] = useState();    
    const [userChoice, setUserChoice] = useState([]);
    const [status, setStatus] = useState(2);

    useEffect(()=>{
        setQuestion(props.question);
    });

    useEffect(()=>{
        axios({
            method : "GET",
            url : `http://localhost:5000/answer/getanswer/${props.question.qid}`
        })
        .then(res=>{
            let temp = new Array();
            let i=0;
            while(i < res.data.length) {
                temp.push(0);
                i++;
            }
            setUserChoice(temp);
            setAnswers(res.data);
            setStatus(2);
        });
    }, [question]);

    const answerChoice = (index) => {
        let temp = [...userChoice];
        temp[index] = temp[index] == 0 ? 1 : 0;
        setUserChoice(temp);
    }

    const compare = () => {
        let i=0;
        //아직안품=2, 정답=1, 오답=0
        while(i < answers.length){
            if(answers[i].isAnswer !== userChoice[i]){
                setStatus(0);
                return;
            }
            i++;
        }
        setStatus(1);
        console.log(status);
    }

    return(
        <div>
            <h1>{props.cursor + 1}. {question ? question.a_subject : ""} <Button onClick={()=>{compare()}}>제출</Button> <StatusManager status={status}/></h1>
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
        <div className="answer-item">
            <div className={props.choice == 1 ? "answer-choice on" : "answer-choice" } onClick={()=>{props.answerChoice(props.index)}}>{ props.index+1 }</div>
            <span>{props.subject}</span>
        </div>
    );
}

function StatusManager(props){
    const [status, setStatus] = useState(2);

    useEffect(()=>{
        setStatus(props.status);
    });

    return(
        <span>{status == 0 ? "오답" : status == 1 ? "정답" : ""}</span>
    )
}

export default BookSolve;
