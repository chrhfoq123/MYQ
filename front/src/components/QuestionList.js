import {ListGroup, Button} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function QuestionList()
{
    const [list, setList] = useState();

    useEffect(() => {
        axios.get("http://localhost:5000/question")
        .then(res=>{
            setList(res.data);
        });
    }, []);

    return(
        <div className='QuestionList-main'>
            <div>
                <Button href='/question'>문제등록</Button>
            </div>
            <ListGroup numbered>
                {list?list.map((obj, index) => {
                    return(
                        <ListGroup.Item
                            href={`/question/${obj.idx}`}
                            action
                            variant='light'
                        >
                            {obj.subject}
                        </ListGroup.Item>
                    )
                }):"로딩중"}
                
            </ListGroup>
        </div>
    );
}

export default QuestionList;