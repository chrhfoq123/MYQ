import axios from "axios";
import { useState, useEffect } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";


/*
    1. 객관식 수정 (모달?)    
    2. 객관식 추가
 */

function QuestionView() {

    const { idx } = useParams();
    const [question, setQuestion] = useState();

    const [show, setShow] = useState(false); // 모달
    const [selectId, setSelectId] = useState(-1);
    const handleClose = () => {
        setSelectId(-1);
        setShow(false);
    }
    const handleShow = (idx) => {
        setSelectId(idx);
        setShow(true);
    };
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
        alert("수정되었습니다.");
        window.location.reload();
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

        alert("삭제되었습니다.");
        window.location.href = "/questionList";
    }
    return(
        <div className="question-view">
            {selectId !== -1 ? <AnswerModal idx={selectId} handleClose={handleClose} show={show}/> : ""}            
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
                <div className="question-answers-top">
                    <span>객관식</span>                    
                </div>
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
            <AddAnswerForm idx={idx}/>
        </div>
    );
}

function AddAnswerForm(props) {
    let [state, setState] = useState(0);
    let [str, setStr] = useState(0);    
    let { idx } = props;
    const addAnswerAction = () => {
        axios({
            method : "POST",
            url : `http://localhost:5000/answer/addanswer`,
            data : {
                isAnswer : state,
                pkey : idx,
                subject : str
            }
        })
        .then(res => {
            console.log(res);
        });

        alert("추가되었습니다.");
        window.location.reload();
    }
    return(
        <div className="add-answer-form">
            <input value={str} onChange={(e)=>{setStr(e.target.value)}}/>
            <span className={state == 1 ? "on" : ""} onClick={()=>{setState(state == 1 ? 0 : 1)}}>정답</span>
            <button onClick={()=>{addAnswerAction()}}>추가</button>
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

        alert("삭제되었습니다.");
        window.location.reload();
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
    const [answer, setAnswer] = useState();
    useEffect(()=>{
        axios({
            method : "GET",
            url : `http://localhost:5000/answer/${props.idx}`
        })
        .then(res => {
            setAnswer(res.data[0]);
        });
    }, []);       
    const modifySubmit = (idx) => {
        console.log(answer);
        axios({
            method : "PATCH",
            url : `http://localhost:5000/answer/${idx}`,
            data : answer
        })
        .then(res=> {
            console.log(res);
        });

        alert("수정되었습니다.");
        window.location.reload();

    }
    return(
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title>객관식 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="answer-modal-content">
                    <input onChange={(e)=>{
                        const clone = Object.assign({}, answer);
                        clone.subject = e.target.value;
                        setAnswer(clone);
                    }} value={answer ? answer.subject : ""}/>
                    <span className={answer ? answer.isAnswer == 1 ? "on" : "" : ""} onClick={()=>{
                        const clone = Object.assign({}, answer);
                        clone.isAnswer = clone.isAnswer == 0 ? 1 : 0;
                        setAnswer(clone);
                    }}>정답</span>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>{props.handleClose()}}>
                닫기
            </Button>
            <Button variant="primary" onClick={()=>{modifySubmit(props.idx)}}>
                수정하기
            </Button>
            </Modal.Footer>
        </Modal>
    );
}

function NoData() {
    return(<tr><td col={3}>NoData</td></tr>);
}

export default QuestionView;