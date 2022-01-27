import {useEffect, useState, useContext} from 'react'
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import {useParams, useHistory, Link} from 'react-router-dom'

import UserContext from './../UserContext'

import Swal from "sweetalert2";

export default function CourseView(){
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [price, setPrice] = useState(0)

	const {user} = useContext(UserContext)
	console.log(user)

	const {courseId} = useParams()
	// console.log(courseId)

	let history = useHistory();

	useEffect( () => {

		fetch(`http://localhost:4000/api/courses/${courseId}`, {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(response => response.json())
		.then(data => {
			console.log(data) //object

			setName(data.courseName)
			setDescription(data.description)
			setPrice(data.price)

		})
	}, [courseId])

	const enroll = (courseId) => {

		fetch('http://localhost:4000/api/users/enroll', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				courseId: courseId
			})
		})
		.then(response => response.json())
		.then(data => {
			// console.log(data)	//true

			if(data === true){
				Swal.fire({
					title: "Successfully enrolled.",
					icon: "success",
					text: "You have Successfully enrolled for this course"
				})

				history.push("/courses")
			} else {
				Swal.fire({
					title: "Something went wrong.",
					icon: "error",
					text: "Please try again."
				})
			}
		})
	}

	return(
		<Container>
			<Row className="justify-content-center">
				<Col xs={8} md={4}>
					<Card>
						<Card.Body>
							<Card.Title>Name:</Card.Title>
							<Card.Text>{name}</Card.Text>
							<Card.Subtitle>Description:</Card.Subtitle>
							<Card.Text>{description}</Card.Text>
							<Card.Subtitle>Price:</Card.Subtitle>
							<Card.Text>{price}</Card.Text>
							<Card.Subtitle>Class Schedule</Card.Subtitle>
							<Card.Text>8 AM - 5 PM</Card.Text>

							{
								(user.id !== null) ?
									<Button onClick={() => enroll(courseId)}>Enroll</Button>
								:
									<Link 
										className="btn btn-primary" 
										to="/login">Login to Enroll</Link>
							}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}