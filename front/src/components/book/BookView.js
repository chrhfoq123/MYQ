import { Form, Button, Table, Modal, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
function BookView()
{

    /**                       
     * 5. 문제집 수정 구현
     * 6. 문제집 삭제 구현
     */

    const { idx } = useParams();
    const [ book, setBook ] = useState();
    const [ show, setShow ] = useState(false);
    const handleClose = () => setShow(false); 
    const handleShow = () => setShow(true);
    useEffect(() => {
        axios({
            method : "GET",
            url : `http://localhost:5000/book/${idx}`
        })
        .then(res => {setBook(res.data)});
    }, []);

    const [question, setQuestion] = useState([]);
    useEffect(() => {
        axios({
            method : "GET",
            url : `http://localhost:5000/question`
        })
        .then(res => {setQuestion(res.data)});
    }, [question]);

    const addQuestion = (_idx, subject) => {        
        console.log(_idx);
        const question = {
            qid : _idx,
            a_subject : subject,
            idx : idx
        }
        const arr = [...book, question];
        setBook(arr);
    }
    const sendChildQuestion = () => {
        const data = book;
        const url = `http://localhost:5000/answer`;
        return axios({
            url : url,
            method : 'POST',
            data : data
        });
    }

    const bookViewSubmit = () => {
        sendChildQuestion()
        .then(res=>{
            
            if(res.data.msg === "success"){
                alert("정상적으로 등록되었습니다.");
            }
        });
    }

    const cancelChildQuestion = (index) => {        
        const arr =[...book];
        arr.splice(index, 1);
        setBook(arr);        
    }

    const bookDeleteAction = (e) => {
        e.preventDefault();
        axios({
            method : "DELETE",
            url : `http://localhost:5000/book/${idx}`
        })
        .then(res=>{            
            if(res.data.msg === "success"){
                alert("정삭적으로 삭제되었습니다.");
                window.location.href="/book";
            }
        });
    }

    return(            
        <>        
        <button onClick={()=>{console.log(book);}}>12312</button>
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                <Modal.Title>• 문제 추가</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead className='question-add-modal-head'>
                            <tr>
                                <th>번호</th>
                                <th>문제</th>
                                <th>생성일자</th>
                                <th>등록</th>
                            </tr>
                        </thead>
                        <tbody className='question-add-modal'>                            
                            {question[0] === undefined ? <tr><td colSpan={4}>NoData</td></tr> : 
                            question.map((obj,index) => {
                                return <ModalQuestion key={index} question={obj} index={index} addQuestion={addQuestion}/>;
                            })}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        
            <div className='book-view'>            
                <div className='book-info'>
                    <div className='info-item'>
                        <span>• 문제집 이름</span>
                        <span className='item-text'><strong>{book ? book[0].subject : ""}</strong></span>
                    </div>
                    <div className='info-item'>
                        <span>• 생성 일자</span>
                        <span className='item-text'><strong>{book ? book[0].make_time : ""}</strong></span>
                    </div>
                    <div className='info-item'>
                        <span>• 메모</span>
                        <span className='item-text'><strong>{book ? book[0].memo : ""}</strong></span>
                    </div>
                </div>
                <div className='child-question'>
                    <strong>포함 문제</strong>
                    <span className='child-question-addbtn' onClick={handleShow}>+ 추가하기</span>                                
                    <table>
                        <colgroup>
                            <col width={'10%'} />
                            <col width={'65%'} />
                            <col width={'25%'} />
                        </colgroup>
                        <thead>
                            <tr>
                                <td>번호</td>
                                <td>문제</td>
                                <td>옵션</td>
                            </tr>
                        </thead>
                        <tbody>
                            {book ? book.map((obj, index)=>{
                                return  <BookAnswer key={index} index={index} subject={obj.a_subject} cancelChildQuestion={cancelChildQuestion}/>;
                            }) : <tr><td>로딩</td></tr>}
                            
                        </tbody>
                    </table>
                </div>
                <div>                    
                    <Button onClick={()=>{bookViewSubmit()}} className='m-3' variant='secondary' size='lg'>등록하기</Button>
                    <Alert variant='danger'><a href="" onClick={(e)=>{bookDeleteAction(e)}}>문제집삭제</a></Alert>                        
                </div>
            </div>
        </>    
    );

}

function BookAnswer(props)
{
    return(
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.subject}</td>
            <td><Button className='m-1' onClick={() => {props.cancelChildQuestion(props.index)}}>삭제</Button></td>
        </tr>
    );

}

function ModalQuestion(props)
{
    const question = props.question;
    return(
        <tr>
            <td>{props.index+1}</td>
            <td>{question.subject}</td>
            <td>{question.make_time}</td>
            <td><Button onClick={() => {props.addQuestion(question.idx, question.subject)}}>등록</Button></td>
        </tr>
    );    
}
export default BookView;
