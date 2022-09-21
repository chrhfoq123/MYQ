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
    return(
        <div>{props.cursor} 문제</div>
    );
}

export default BookSolve;
