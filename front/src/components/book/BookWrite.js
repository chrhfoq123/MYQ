import { Form, Button, Table, Modal } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
function BookWrite()
{
    const [subject, setSubject] = useState();
    const [memo, setMemo] = useState();

    const submitBook = (event) =>{
        event.preventDefault();
        const data = {
            subject : subject,
            memo : memo
        }

        axios({
            method : "POST",
            url : "http://localhost:5000/book",
            data : data
        })
        .then(res => {
            if(res.status == 200){
                alert("문제집이 등록되었습니다.");
                window.location.href="/book";
            }
        });
    }

    return(                
        <div className='book-write'>
            <Form>
                <Form.Group className="mb-4" controlId="subject">
                    <Form.Label>• 문제집 이름</Form.Label>
                    <Form.Control type="text" placeholder="문제를 입력하세요." onChange={(e)=>{setSubject(e.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-4" controlId="subject-content">
                    <Form.Label>• 메모</Form.Label>
                    <Form.Control type="text" placeholder="메모를 입력하세요." onChange={(e)=>{setMemo(e.target.value)}}/>
                </Form.Group>
                <Button variant="primary" onClick={(event) => {submitBook(event)}} type="submit">
                    등록하기
                </Button>
            </Form>
        </div>
    )
}
export default BookWrite;