import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';
//import './src/App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

//for React Context
import { UserProvider } from './UserContext';

/*components*/
import AppNavbar from './components/AppNavbar';

/*pages*/
import Home from './pages/Home';
import Courses from './pages/Courses';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import ErrorPage from './pages/Error';
import CourseView from './pages/CourseView';

export default function App() {
    /*React Context is nothing but a global state to the app. It is a way to make a particular data available to all the components no matter how they are nested. Context helps you broadcast the data and changes happening to that data, to all components.*/
    let token = localStorage.getItem('token');
    // console.log(token)
    //global state
    const [user, setUser] = useState({
        id: null,
        isAdmin: null,
    });

    //function for clearing localStorage on logout
    const unsetUser = () => {
        localStorage.clear();

        setUser({
            id: null,
            isAdmin: null,
        });
    };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data) //object - user details
                // console.log(data !== "undefined")
                if (typeof data._id !== 'undefined') {
                    // console.log("if codeblock")
                    setUser({
                        id: data._id,
                        isAdmin: data.isAdmin,
                    });
                }
            });
    }, []);

    // console.log(user);
    return (
        <UserProvider value={{ user, setUser, unsetUser }}>
            <BrowserRouter>
                <AppNavbar />
                <Container fluid className="m-3">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/courses" component={Courses} />
                        <Route
                            exact
                            path="/courses/:courseId"
                            component={CourseView}
                        />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/logout" component={Logout} />
                        <Route component={ErrorPage} />
                    </Switch>
                </Container>
            </BrowserRouter>
        </UserProvider>
    );
}
