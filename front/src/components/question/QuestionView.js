import axios from "axios";
import { useState, useEffect } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";


/*
    1. 객관식 수정 (모달?)
    2. 객관식 삭제
    3. 객관식 추가
 */

function QuestionView() {

    const { idx } = useParams();
    const [question, setQuestion] = useState();
    const [show, setShow] = useState(false); // 모달
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(()=>{
        axios({
            method : "GET",
            url : `http://localhost:5000/question/${idx}`
        })
        .then(res => setQuestion(res.data));
    }, []);

    const modifyQuestion = (e) => {
        e.preventDefault();
        modifyQuestionAction()
        .then(res => console.log(res));
    }

    const modifyQuestionAction = () => {
        return axios({
            method : "PATCH",
            url : `http://localhost:5000/question/${idx}`,
            data : {subject : question.subject}
        });
    }

    const deleteQuestion = (e) => {
        e.preventDefault();
        axios({
            method : "DELETE",
            url : `http://localhost:5000/question/${idx}`
        })
        .then(res => {console.log(res)});
    }
    return(
        <div className="question-view">
            <AnswerModal handleClose={handleClose} show={show}/>
            {/* <button onClick={()=>{console.log(question)}}>TEST</button> */}
            <div className="question-info">
                <div className="info-item">
                    <div>• 문제 이름 </div>                    
                    <input value={question ? question.subject : ""} onChange={(e)=>{
                        const clone = Object.assign({}, question);
                        clone.subject = e.target.value;
                        setQuestion(clone);
                    }} />
                </div>
                <div className="info-item">
                    <div>• 등록 일자 </div>
                    <div>{question ? question.make_time : ""}</div>
                </div>
            </div>       
            <div className="question-option mt-3">
                <Alert variant="primary"><a href="" onClick={(e)=>{modifyQuestion(e)}}>수정하기</a></Alert>            
                <Alert variant="danger"><a href="" onClick={(e)=>{deleteQuestion(e)}}>삭제하기</a></Alert>
            </div>
            <div className="question-answers">
                <table className="question-answers-table">
                    <colgroup>
                        <col width={'10%'}/>
                        <col width={'65%'}/>
                        <col width={'25%'}/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>문제</th>
                            <th>옵션</th>
                        </tr>
                    </thead>
                    <tbody>
                        { question ? question.answers[0].idx !== null ? question.answers.map((obj, index) => {
                            return <Answer key={index} answer={obj} index={index} handleShow={handleShow}/>
                        }) : <NoData/> : <tr><td>로딩중</td></tr> }
                    </tbody>
                </table>
            </div>            
        </div>
    );
}

function Answer(props) {
    const [answer, setAnswer] = useState(props.answer);
    const idx = props.answer.idx;
    const removeAnswer = () => {
        axios({
            method : "DELETE",
            url : "http://localhost:5000/answer/" + idx
        })
        .then(res => console.log(res));
    }
    return(
        <tr>
            <td>{props.index + 1}</td>
            <td>{answer.subject}</td>
            <td>
                <Button className="m-2" onClick={()=>{
                    props.handleShow(idx);
                }}>수정</Button>
                <Button className="m-2" onClick={()=>{removeAnswer()}}>삭제</Button>
            </td>
        </tr>
    );
}

function AnswerModal(props) {
    return(
        <Modal show={props.show}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>{props.handleClose()}}>
                Close
            </Button>
            <Button variant="primary">
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    );
}

function NoData() {
    return(<tr><td col={3}>NoData</td></tr>);
}

export default QuestionView;