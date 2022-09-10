import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
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
                        <tr>
                            <td>1</td>
                            <td>꺄룰랭</td>
                            <td>
                                <Button className="m-2">수정</Button>
                                <Button className="m-2">삭제</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>꺄룰랭</td>
                            <td>
                                <Button className="m-2">수정</Button>
                                <Button className="m-2">삭제</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>꺄룰랭</td>
                            <td>
                                <Button className="m-2">수정</Button>
                                <Button className="m-2">삭제</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function NoData() {
    return(<tr><td col={3}>NoData</td></tr>);
}

export default QuestionView;