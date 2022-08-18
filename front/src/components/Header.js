import { Link, Routes, Route } from 'react-router-dom';

function Header(props)
{
    return(
        <div className="header">
            <div className="main-area">
                <Link to='asdf'>aasdf</Link>
            </div>
            <div className="question-area">
                <span className="question-btn" onClick={window.location.href='/Question'}>문제</span>
            </div>
            <div className="book-area">
                <span className="book-btn" onClick={window.location.href='/Book'}>문제집</span>
            </div>
        </div>
    );
}

export default Header;