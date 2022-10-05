import { useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap'
import axios from 'axios';
function Question()
{    
    const [title, setTitle] = useState();
    const [answers, setAnswers] = useState([]);
    const [subject, setSubject] = useState("");
    const [isAnswer, setIsAnswer] = useState(0);    

    const addAnswer = () => {
        const answer = {
            subject : subject,
            isAnswer : isAnswer
        }        
        let arr;
        if(answers[0] === undefined) {
            arr = new Array();
            if(answer.subject === "" || answer.subject === undefined){
                alert("답을 입력해주세요.");
                return;
            }
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

    const submitAction = async (e) => {
        e.preventDefault();
        postQuestion()
        .then(res=>{
            console.log(res);
            if(res.status === 200)
            {
                alert("문제가 등록되었습니다.");
                window.location.href="questionlist";
            }
        });
    }

    const postQuestion = async () => {
        console.log(answers.subject);
        if(title === "" || title === undefined){
            alert("문제를 입력해주세요.");
            return;
        }

        const data = {
            subject : title,
            answers : answers
        };
        return axios({
            url : "http://localhost:5000/question",
            method : "POST",
            data : data
        });
    }
    
    return(
        <div className='Question-main'>
            <Form onSubmit={(e)=>{submitAction(e)}}>
                <Form.Group className="mb-3" controlId="title" value={title} onChange={(e)=>{setTitle(e.target.value)}}>
                    <Form.Label>• 문제</Form.Label>
                    <Form.Control type="text" placeholder="문제를 입력 하세요"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>• 답안</Form.Label>                    
                    <QuestionAnswer 
                        answers={answers}
                        addAnswer={addAnswer}
                        setIsAnswer={setIsAnswer}
                        isAnswer={isAnswer}
                        setSubject={setSubject}
                        removeAnswer={removeAnswer}
                        subject={subject}
                    />
                </Form.Group>                
                <Button variant="primary" type="submit">
                    등록하기
                </Button>
            </Form>
        </div>
    )
}

function QuestionAnswer(props) {    
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
                {props.answers[0] ? props.answers.map((obj, index)=>{
                    obj.index = index;
                    return <Answer key={index} answer={obj} removeAnswer={props.removeAnswer}/>;
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
                        <input placeholder='객관식 내용을 입력하여 주세요' value={props.subject} onChange={(e)=>{props.setSubject(e.target.value)}}/>
                        <span className={props.isAnswer ? "select-isAnswer on" : "select-isAnswer"} onClick={()=>{props.setIsAnswer(props.isAnswer ? 0 : 1)}}>정답</span>
                        <span className='add-btn' onClick={()=>{props.addAnswer()}}>추가</span>
                    </td>                                          
                </tr>
                </tbody>
            </Table>            
        </>
    );
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
export default Question;