import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Alert } from 'react-bootstrap';

function BasicExample() {
  return(
    <Alert variant='light' show={true}>
        <Alert.Heading>문제를 처음부터 푸시겠습니까?</Alert.Heading>
        <p>
            '예'를 누르면 처음부터, '아니요'를 누르면 기존 상태가 유지됩니다.
        </p>
        <hr/>
        <div className="d-flex justify-content-end">
            <Button href='/booksolve'>예</Button>{''}
            <Button href='/booksolve'>아니요</Button>
        </div>
    </Alert>
);
}

export default BasicExample;