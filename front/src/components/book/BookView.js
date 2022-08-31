import { Form, Button, Table, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
function BookView()
{
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
                    <span className='item-text'><strong>대충 문제집 이름이다</strong></span>
                </div>
                <div className='info-item'>
                    <span>• 생성 일자</span>
                    <span className='item-text'><strong>대충 문제집 이름이다</strong></span>
                </div>                
            </div>
            <div className='child-question'>
                <strong>포함 문제</strong>
                <table>
                    <colgroup>
                        <col width={'10%'} />
                        <col width={'65%'} />
                        <col width={'25%'} />
                    </colgroup>
                    <thead>
                        <td>번호</td>
                        <td>문제</td>
                        <td>옵션</td>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>테스트</td>
                            <td><Button className='m-1'>수정</Button><Button className='m-1'>삭제</Button></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>테스트</td>
                            <td><Button className='m-1'>수정</Button><Button className='m-1'>삭제</Button></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>테스트</td>
                            <td><Button className='m-1'>수정</Button><Button className='m-1'>삭제</Button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );

}
export default BookView;
