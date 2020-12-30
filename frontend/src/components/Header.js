import React from 'react'
import {Nav, Navbar, Form,Container, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {logout} from '../actions/userActions';

import {useDispatch, useSelector} from 'react-redux';

const Header = () => {
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state => state.userLogin);
    const logoutHandler = () => {
        dispatch(logout())
    };

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
                                <Nav.Link><i className='fas fa-shopping-cart'>Cart</i></Nav.Link>
                            </LinkContainer>
                                {userInfo ? (
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <LinkContainer to='/login'>
                                    <Nav.Link><i className='fas fa-user'> Login</i></Nav.Link>
                                </LinkContainer>
                                )}
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
