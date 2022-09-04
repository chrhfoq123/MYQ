import { Form, Button, Table, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
function BookView()
{

    /**     
     * 2. 문제추가 함수
     * 3. 백엔드 통신
     */

    const { idx } = useParams();
    const [ book, setBook ] = useState();
    useEffect(() => {
        axios({
            method : "GET",
            url : `http://localhost:5000/book/${idx}`
        })
        .then(res => {setBook(res.data)});
    }, []);
    return(                
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
                <span className='child-question-addbtn'>+ 추가하기</span>                
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
                            return  <BookAnswer key={index} index={index} subject={obj.a_subject}/>;
                        }) : <tr><td>로딩</td></tr>}
                        
                    </tbody>
                </table>
            </div>
        </div>
    );

}

function BookAnswer(props)
{
    return(
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.subject}</td>
            <td><Button className='m-1'>수정</Button><Button className='m-1'>삭제</Button></td>
        </tr>
    );

}
export default BookView;
