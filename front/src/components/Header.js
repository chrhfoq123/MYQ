import { Link, Routes, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header(props)
{
    return(        
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="/">MYQ</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">메인</Nav.Link>
                    <Nav.Link href="/questionList">문제</Nav.Link>
                    <Nav.Link href="/book">문제집</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;