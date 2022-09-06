import axios from 'axios';
import { useEffect, useState } from 'react';
import {Button, Card, Alert} from 'react-bootstrap';

function Book()
{
    return(
        <div className='book-main'>
            <div className='d-grid gap-2'>
                <Button variant="dark" href='/bookwrite'>문제집 등록</Button>
            </div>
            <div className='book-area'>
                <BookCard/>
            </div>
        </div>
    );
}

function BookCard()
{
    const[obj, setObj] = useState();

    useEffect(() => {
        axios({
            method : "GET",
            url : "http://localhost:5000/book"
        }).then(res => {
            setObj(res.data);
            setTimeout(()=>{console.log(obj)}, 5000);
        })
    },[]);

    const showAlert = () => {
        if(window.confirm("문제를 처음부터 푸시겠습니까?")==true){
            window.location.href=`/booksolve/${obj[0].idx}`;
        }else{
            /*그대로유지*/
            window.location.href='/booksolve';
        }
    }
    
    return(
        <>
        {obj?obj.map((obj, index)=>{
            return(
                <div className='book-item'>
                    <Card style={{ width: '14.8rem' }}>
                        <Card.Img variant="top" src="img/asdfasdf.png" />
                        <Card.Body>
                            <Card.Title>{obj.subject}</Card.Title>
                            <Card.Text>{obj.memo}</Card.Text>
                            <Button variant="primary" size='sm' onClick={()=>{showAlert()}}>문제 풀기</Button>{' '}
                            <Button variant="primary" size='sm' href={`/book/${obj.idx}`}>문제집 보기</Button>
                        </Card.Body>
                    </Card>
                </div>
            )
        }):"로딩중..."}
        </>
    )
}

export default Book;