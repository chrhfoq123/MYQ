import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Question from './components/Question';
import Main from './components/Main';
import Header from './components/Header';
import Book from './components/Book';

function App(props) {
  return (
    <div>
      <BrowserRouter>
        <Header/>
        <div className='content'>
          <Routes>
            <Route path='' element={<Main/>}/>
            <Route path='Question' element={<Question/>}/>
            <Route path='Book' element={<Book/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
