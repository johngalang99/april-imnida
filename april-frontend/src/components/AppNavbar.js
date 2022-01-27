import { useState, Fragment, useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';
//import '../pages/App.css'

export default function AppNavbar() {
    const { user } = useContext(UserContext);

    /*const [user, setUser] = useState(localStorage.getItem("email"))*/
    //   console.log(user)

    let leftNav =
        user.id != null ? (
            <Nav.Link as={NavLink} to="/logout">
                Logout
            </Nav.Link>
        ) : (
            <Fragment>
                <Nav.Link as={NavLink} to="/login">
                    Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                    Register
                </Nav.Link>
            </Fragment>
        );

    return (
        <Navbar bg="primary" expand="lg">
            <Navbar.Brand as={Link} to="/">
                Course Booking
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="bottom-navbar">
                    <Nav.Link as={NavLink} to="/">
                        Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/courses">
                        Courses
                    </Nav.Link>
                    {/*
              <Nav.Link >Register</Nav.Link>
              <Nav.Link >Login</Nav.Link>
              <Nav.Link >Logout</Nav.Link>
            */}
                </Nav>
                <Nav className="bottom-navbar">{leftNav}</Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
