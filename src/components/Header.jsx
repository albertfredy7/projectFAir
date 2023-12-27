import React, { useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import Logo from '../Assets/logo.png';
import { Link } from 'react-router-dom';

function Header({Dashboard,isLogin}) {
    const [showNavbar, setShowNavbar] = useState(false);

    const toggleNavbar = () => {
        setShowNavbar(!showNavbar);
    };

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
                        { isLogin || Dashboard ? <Button variant="outline-primary">Sign Out</Button> :
                            <Link to={'/login'}><Button variant="outline-primary">Sign In</Button></Link>
                        }
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
