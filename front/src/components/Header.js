import { Link, Routes, Route } from 'react-router-dom';

function Header(props)
{
    /*다 링크태그로 바꾸기 근데 자꾸 무한로딩됨 이거 좀 고쳐야될듯*/
    return(
        <div className="header">
            <div className="main-area">
                <Link to='/main'>메인</Link>
            </div>
            <div className="question-area">
                <Link to='/question'>문제</Link>
            </div>
            <div className="book-area">
                <Link to='/book'>문제집</Link>
            </div>
        </div>
    );
}

export default Header;