import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import axios from 'axios';

function QuestionList()
{
    const [list, setList] = useState();

    useEffect(() => {
        axios.get("http://localhost:5000/question")
        .then(res=>{
            console.log(res.data);
            setList(res.data);
        });
    }, []);

    return(
        <div className='QuestionList-main'>
            <ListGroup>
                {list?list.map((obj, index) => {
                    return(
                        <ListGroup.Item>{obj.subject}</ListGroup.Item>
                    )
                }):"로딩중"}
                
            </ListGroup>
        </div>
    );
}

export default QuestionList;