import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";


/*
    1. 문제 수정
    2. 문제 삭제
    3. 객관식 수정 (모달?)
    4. 객관식 삭제
 */

function QuestionView() {

    const { idx } = useParams();
    const [question, setQuestion] = useState();
    useEffect(()=>{
        axios({
            method : "GET",
            url : `http://localhost:5000/question/${idx}`
        })
        .then(res => setQuestion(res.data));
    }, []);
    return(
        <div className="question-view">
            {/* <button onClick={()=>{console.log(question)}}>TEST</button> */}
            <div className="question-info">
                <div className="info-item">
                    <div>• 문제 이름 </div>
                    <div>{question ? question.subject : ""}</div>
                </div>
                <div className="info-item">
                    <div>• 등록 일자 </div>
                    <div>{question ? question.make_time : ""}</div>
                </div>
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
                            return <Answer key={index} answer={obj} index={index}/>
                        }) : <NoData/> : <tr><td>로딩중</td></tr> }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function Answer(props) {
    const [answer, setAnswer] = useState(props.answer);
    return(
        <tr>
            <td>{props.index + 1}</td>
            <td>{answer.subject}</td>
            <td>
                <Button className="m-2">수정</Button>
                <Button className="m-2">삭제</Button>
            </td>
        </tr>
    );
}

function NoData() {
    return(<tr><td col={3}>NoData</td></tr>);
}

export default QuestionView;