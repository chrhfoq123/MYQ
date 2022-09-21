import logo from './logo.svg';
import './App.css';
import  'bootstrap/dist/css/bootstrap.min.css' ;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Question from './components/Question';
import Main from './components/Main';
import Header from './components/Header';
import Book from './components/Book';
import BookWrite from './components/book/BookWrite';
import QuestionList from './components/QuestionList';
import Developer from './components/Developer';
import BookView from './components/book/BookView';
import BookSolve from './components/book/BookSolve';
import QuestionView from './components/question/QuestionView';

function App(props) {
  return (
    <div>
      <BrowserRouter>
        <Header/>
        <div className='content'>
          <Routes>
            <Route path='Main' element={<Main/>}/>
            <Route path='Question' element={<Question/>}/>
            <Route path='Question/:idx' element={<QuestionView/>}/>
            <Route path='Book' element={<Book/>}/>
            <Route path='BookWrite' element={<BookWrite/>}/>
            <Route path='Book/:idx' element={<BookView/>}/>
            <Route path='QuestionList' element={<QuestionList/>}/>
            <Route path='developer' element={<Developer/>}/>
            <Route path='BookSolve/:qid' element={<BookSolve/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
