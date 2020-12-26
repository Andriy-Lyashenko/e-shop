import React from 'react'
import {Nav, Navbar, Form,Container} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>La-shop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link><i className='fas fa-shopping-cart'>Zoriana</i></Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/login'>
                                <Nav.Link><i className='fas fa-user'> Login</i></Nav.Link>
                            </LinkContainer>
                        </Nav>
                        <Form inline>
                        {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button  variant="info">Search</Button> */}
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
