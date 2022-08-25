import {ListGroup, Button, Spinner} from 'react-bootstrap';
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
            <div className='regist-btn'>
                <div className='d-grid gap-2'>
                    <Button variant="dark" href='/question'>문제 등록</Button>
                </div>
            </div>
            
                {list?list.map((obj, index) => {
                    return(
                        <ListGroup>
                            <ListGroup.Item className="my-1"
                                href={`/question/${obj.idx}`}
                                action
                                variant='light'
                            >
                                {index+1}.&nbsp;
                                {obj.subject}
                            </ListGroup.Item>
                        </ListGroup>

                    )
                }): <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}
        </div>
    );
}

export default QuestionList;