import axios from 'axios';
import { useEffect, useState } from 'react';
import {Button, Card} from 'react-bootstrap';

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
    const[subject, setSubject] = useState("");
    const[memo, setMemo] = useState("");

    useEffect(() => {
        axios({
            method : "GET",
            url : "http://localhost:5000/book"
        }).then(res => {
            console.log(res);
            //subject, memo 받아와서 출력
        })
    });
    
    return(
        <div className='book-item'>
            <Card style={{ width: '15rem' }}>
                <Card.Img variant="top" src="img/asdfasdf.png" />
                <Card.Body>
                    <Card.Title>정보처리기사</Card.Title>
                    <Card.Text>
                        2022-08-25 정보처리기사 정리문제집
                    </Card.Text>
                    <Button variant="primary" size='sm'>문제 풀기</Button>{' '}
                    <Button variant="primary" size='sm'>문제집 보기</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Book;