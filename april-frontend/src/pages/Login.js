import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';

//useContext is used to unpack the data from the UserContext
import { Container, Form, Button } from 'react-bootstrap';
import UserContext from '../UserContext';

export default function Login() {
    const { user, setUser } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        if (email !== '' && password !== '') {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [email, password]);

    function Login(e) {
        e.preventDefault();

        fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                // console.log(data !== "undefined")

                //check if data is undefined or not
                if (typeof data !== 'undefined') {
                    //store data in local storage
                    localStorage.setItem('token', data.access);
                    //invoke the function to retrive user details
                    userDetails(data.access);

                    //alert the user that login is successful
                    Swal.fire({
                        title: 'Login Successful',
                        icon: 'success',
                        text: 'Welcome to Course Booking!',
                    });
                } else {
                    //alert the user that login failed
                    Swal.fire({
                        title: 'Authentication failed',
                        icon: 'error',
                        text: 'Check your login details and try again',
                    });
                }
            });

        setEmail('');
        setPassword('');
    }

    const userDetails = (token) => {
        //send request to the server
        fetch('http://localhost:4000/api/users/details', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                //use setUser() to update the state
                setUser({
                    id: data._id,
                    isAdmin: data.isAdmin,
                });
            });
    };

    console.log(user); //null

    return user.id !== null ? ( //if codeblock
        <Redirect to="/courses" />
    ) : (
        //else codeblock
        <Container>
            <Form className="border p-3 mb-3" onSubmit={(e) => Login(e)}>
                {/*email*/}
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                {/*password*/}
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isDisabled}>
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
