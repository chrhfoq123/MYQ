import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function QuestionView() {

    const { idx } = useParams();
    const [question, setQuestion] = useState();
    useEffect(()=>{
        axios({
            method : "GET",
            url : `http://localhost:5000/question/${idx}`
        })
        .then(res => console.log(res));
    }, []);
    return(
        <div className="question-view">
            <div className="question-info">
                <div className="info-item">
                    <div>• 문제 이름</div>
                    <div>어쩌구 아이템</div>
                </div>
                <div className="info-item">
                    <div>• 문제 이름</div>
                    <div>어쩌구 아이템</div>
                </div>
                <div className="info-item">
                    <div>• 문제 이름</div>
                    <div>어쩌구 아이템</div>
                </div>
            </div>
        </div>
    );
}

export default QuestionView;