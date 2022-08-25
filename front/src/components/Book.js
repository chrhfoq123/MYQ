import {Button, Card} from 'react-bootstrap';

function Book()
{
    return(
        <div className='book-main'>
            <div className='d-grid gap-2'>
                <Button variant="dark" href='/question'>문제집 등록</Button>
            </div>
            <div className='book-area'>
                <div className='book-item'>
                    <Card style={{ width: '15rem' }}>
                        <Card.Img variant="top" src="img/asdfasdf.png" />
                        <Card.Body>
                            <Card.Title>정보처리기사</Card.Title>
                            <Card.Text>
                                2022-08-25 정보처리기사 정리문제집
                            </Card.Text>
                            <Button variant="primary" size='sm'>문제 풀기</Button>{' '}
                            <Button variant="primary" size='sm'>문제집 보기</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className='book-item'>
                    <Card style={{ width: '15rem' }}>
                        <Card.Img variant="top" src="img/asdfasdf.png" />
                        <Card.Body>
                            <Card.Title>영어단어장</Card.Title>
                            <Card.Text>
                                토익 많이틀리는 영어단어
                            </Card.Text>
                            <Button variant="primary" size='sm'>문제 풀기</Button>{' '}
                            <Button variant="primary" size='sm'>문제집 보기</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className='book-item'>
                    <Card style={{ width: '15rem' }}>
                        <Card.Img variant="top" src="img/asdfasdf.png" />
                        <Card.Body>
                            <Card.Title>전공지식</Card.Title>
                            <Card.Text>
                                외워야되는 전공지식
                            </Card.Text>
                            <Button variant="primary" size='sm'>문제 풀기</Button>{' '}
                            <Button variant="primary" size='sm'>문제집 보기</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className='book-item'>
                    <Card style={{ width: '15rem' }}>
                        <Card.Img variant="top" src="img/asdfasdf.png" />
                        <Card.Body>
                            <Card.Title>외워야하는 단어</Card.Title>
                            <Card.Text>
                                대충 그냥 무조건 알아야하는 단어들
                            </Card.Text>
                            <Button variant="primary" size='sm'>문제 풀기</Button>{' '}
                            <Button variant="primary" size='sm'>문제집 보기</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className='book-item'>
                    <Card style={{ width: '15rem' }}>
                        <Card.Img variant="top" src="img/asdfasdf.png" />
                        <Card.Body>
                            <Card.Title>책 이름</Card.Title>
                            <Card.Text>
                                그냥 책이름들 아니그냥 테스트용
                            </Card.Text>
                            <Button variant="primary" size='sm'>문제 풀기</Button>{' '}
                            <Button variant="primary" size='sm'>문제집 보기</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Book;