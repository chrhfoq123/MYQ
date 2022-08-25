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

function Answer(props)
{    
    const answer = props.answer;    
    return(
        <tr>
            <td>{answer.index + 1}</td>
            <td>{answer.subject}</td>
            <td>{answer.isAnswer ? "O" : "X"}</td>
            <td><Button onClick={()=>{props.removeAnswer(answer.index)}}>취소</Button></td>
        </tr>
    );

}

function QuestionAnswer(prop) {
    const [answers, setAnswers] = useState();
    const [subject, setSubject] = useState("");
    const [isAnswer, setIsAnswer] = useState(0);

    const addAnswer = () => {
        const answer = {
            subject : subject,
            isAnswer : isAnswer
        }                
        let arr;
        if(answers === undefined) {
            arr = new Array();
            arr.push(answer);
            setAnswers(arr);
        } else {
            arr = [...answers, answer];
            setAnswers(arr);
        }        
        setSubject("");
        setIsAnswer(0);
    }

    const removeAnswer = (index) => {
        let arr = [...answers];        
        arr.splice(index,1);
        setAnswers(arr);
    }

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
                {answers ? answers.map((obj, index)=>{
                    obj.index = index;
                    return <Answer key={index} answer={obj} removeAnswer={removeAnswer}/>;
                })
                : (
                    <tr>
                        <td style={{textAlign : "center"}} colSpan={4}>No Dap</td>
                    </tr>
                )
                }
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
                        <input placeholder='객관식 내용을 입력하여 주세요' value={subject} onChange={(e)=>{setSubject(e.target.value)}}/>
                        <span className={isAnswer ? "select-isAnswer on" : "select-isAnswer"} onClick={()=>{setIsAnswer(isAnswer ? 0 : 1)}}>정답</span>
                        <span className='add-btn' onClick={()=>{addAnswer()}}>추가</span>
                    </td>                                          
                </tr>
                </tbody>
            </Table>            
        </>
    );
}

export default Question;
