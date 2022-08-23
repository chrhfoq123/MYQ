import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import axios from 'axios';

function QuestionList()
{
    return(
        <div className='QuestionList-main'>
            <ListGroup>
                <QuestionView/>
            </ListGroup>
        </div>
    );
}

function QuestionView()
{
    const [subject, setSubject] = useState();

    useEffect(() => {
        axios.get("http://localhost:5000/question")
        .then(res=>{
           console.log(res);
        });
    });

    <ListGroup.Item>{subject}</ListGroup.Item>
}

export default QuestionList;