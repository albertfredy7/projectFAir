import React, { useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import Logo from '../Assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';

function Header({Dashboard,isLogin}) {

    const navigate = useNavigate()
    const handleLogout = () => {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("existingUser")
        navigate('/')
    }

    const [showNavbar, setShowNavbar] = useState(false);

    const toggleNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    const [token,setToken] = useState(sessionStorage.getItem("token"))

    return (
        <div>
            <Navbar className='bg-light' style={{height:'6rem'}} expand="lg">
                <Container>
                    <Navbar.Brand href="#home"><Link to={'/'}><img src={Logo} width={200}  alt="" /></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
                    <Navbar.Collapse id="basic-navbar-nav" className={showNavbar ? 'show' : ''}>
                        <Nav className="ms-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/project">Projects</Nav.Link>
                        </Nav>
                        {  token ? <Button variant="outline-primary" onClick={handleLogout}>Sign Out</Button> :
                            <Link to={'/login'}><Button variant="outline-primary">Sign In</Button></Link>
                        }
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
