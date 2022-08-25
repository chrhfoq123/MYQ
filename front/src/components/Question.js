import { useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap'

function Question()
{
    const submitAction = (e) => {
        e.preventDefault();
    }
    return(
        <div className='Question-main'>
            <Form onSubmit={(e)=>{submitAction(e)}}>
                <Form.Group className="mb-3" controlId="subject">
                    <Form.Label>• 문제</Form.Label>
                    <Form.Control type="text" placeholder="문제를 입력 하세요"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="subject">
                    <Form.Label>• 답안</Form.Label>                    
                    <QuestionAnswer/>
                </Form.Group>                
                <Button variant="primary" type="submit">
                    등록하기
                </Button>
            </Form>
        </div>
    )
}

function QuestionAnswer() {
    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>내용</th>
                    <th>답 여부</th>
                    <th>옵션</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>O</td>
                    <td><Button>취소</Button></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>X</td>
                    <td><Button>취소</Button></td>
                </tr>
                </tbody>
            </Table>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th className='text-center'>객관식 추가</th>                    
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="question-answer-add">
                        <input/>
                        <span className='select-isAnswer'>정답</span>
                        <span className='add-btn'>추가</span>
                    </td>                                          
                </tr>
                </tbody>
            </Table>            
        </>
    );
  }

export default Question;
