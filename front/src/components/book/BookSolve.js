import {Button} from 'react-bootstrap';
import { useState } from 'react';

function BookSolve()
{
    const[isAnswer, setIsAnswer] = useState(0);

    return(
        <div className='booksolve-main'>
            <div className='booksolve-area'>
                <div className='booksolve-question'>
                    <span>1. 문제문제문제문제문제문제문제문제문제문제문제문제문제문제</span>
                </div>
                <div className='booksolve-answer'>
                    <div className='answer-check'>
                        <Button variant={isAnswer?'secondary':'outline-secondary'} onClick={()=> {setIsAnswer(1)}}>1</Button>{' '}
                        <span>일번답</span>
                    </div>
                    <div className='answer-check'>
                        <Button variant={isAnswer?'secondary':'outline-secondary'} onClick={()=> {setIsAnswer(1)}}>2</Button>{' '}
                        <span>이번답</span>
                    </div>
                    <div className='answer-check'>
                        <Button variant={isAnswer?'secondary':'outline-secondary'} onClick={()=> {setIsAnswer(1)}}>3</Button>{' '}
                        <span>삼번답</span>
                    </div>
                    <div className='answer-check'>
                        <Button variant={isAnswer?'secondary':'outline-secondary'} onClick={()=> {setIsAnswer(1)}}>4</Button>{' '}
                        <span>시번답</span>
                    </div>
                    <div className='answer-check'>
                        <Button variant={isAnswer?'secondary':'outline-secondary'} onClick={()=> {setIsAnswer(1)}}>5</Button>{' '}
                        <span>오번답</span>
                    </div>
                    <div className='answer-submit'>
                        <Button variant='secondary' size='lg'>제출</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookSolve;