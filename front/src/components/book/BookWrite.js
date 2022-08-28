import { Form, Button, Table, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Question from '../Question';
import useFetch from '../../hook/useFetch';
function BookWrite()
{
    return(                
        <div className='book-write'>
            <Form>
                <Form.Group className="mb-4" controlId="subject">
                    <Form.Label>• 문제집 이름</Form.Label>
                    <Form.Control type="text" placeholder="문제를 입력 하세요"/>
                </Form.Group>
                <Form.Label>• 문제 현황</Form.Label>                
                <BookModal/>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>내용</th>
                            <th>답 여부</th>
                            <th>옵션</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                        </tr>
                    </tbody>
                </Table>
                <Button variant="primary" type="submit">
                    등록하기
                </Button>
            </Form>                        
        </div>        
    );
}

function BookModal() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow} style={{float: 'right'}}>
          문제 추가
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>문제 리스트</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BookModalContent/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

function BookModalContent()
{
    const [questionList, setQuestionList] = useState([]);

    const temp = useFetch(`http://localhost:5000/question`);
    console.log(temp);

    return(
        <div>내용이다</div>
    );
}
export default BookWrite;