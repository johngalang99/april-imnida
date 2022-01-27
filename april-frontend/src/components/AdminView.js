import {useState, Fragment, useEffect} from 'react'
import {Container, Button, Row, Col, Table, Modal, Form} from 'react-bootstrap';

import Swal from 'sweetalert2';

export default function AdminView(props) {
	console.log(props)	//object

	const {courseData, fetchData} = props
	//console.log(courseData)	//array of courses received by adminview component from parent course component
	//console.log(fetchData)

	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [price, setPrice] = useState(0)
	const [courseId, setCourseId] = useState("")

	const [courses, setCourses] = useState([])

	// add course button state
	const [showAdd, setShowAdd] = useState(false)

	//function to open & close button
	const openAdd = () => setShowAdd(true)
	const closeAdd = () => setShowAdd(false)

	useEffect( () => {
		const courseArr = courseData.map(course => {
			// console.log(course)

			return(
				<tr>
					<td>{course.courseName}</td>
					<td>{course.description}</td>
					<td>{course.price}</td>
					<td>
						{
							(course.isActive === true) ?
								<span>Available</span>
							:
								<span>Unavailable</span>
						}
					</td>
					<td>
						<Button onClick={() => openEdit(course._id)}>Update</Button>
						{
							(course.isActive) ?
								<Fragment>
									<Button 
										variant="danger"
										onClick={ () => archiveCourse(course._id, course.isActive)}
										>Disable</Button>
									<Button variant="secondary">Delete</Button>
								</Fragment>
							:
								<Fragment>
									<Button variant="success">Enable</Button>
									<Button variant="secondary">Disable</Button>
								</Fragment>
								
						}
					</td>
				</tr>
			)
		})

		setCourses(courseArr)

	}, [courseData])

	/*Functions*/

		//add course function to be invoked when onSubmit event takes place(see add course modal code)
		const addCourse = (e) => {
			e.preventDefault()

			fetch("http://localhost:4000/api/courses/create-course", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("token")}`
				},
				body: JSON.stringify({
					courseName: name,
					description: description,
					price: price
				})
			})
			.then(response => response.json())
			.then(data => {
				// console.log(data)

				if(data == true){

					Swal.fire({
						title: "Success",
						icon: "success",
						text: "Course successfully added"
					})

					//setting back to original state after successfully added the course
					setName("")
					setDescription("")
					setPrice(0)

					//close the modal after the alert
					closeAdd();

					//function passed from courses page component to retrive all courses
					fetchData()

				} else {
					Swal.fire({
						title: "Something went wrong",
						icon: "error",
						text: "Please try again"
					})

					fetchData()
				}
			})
		}

		//function to populate data in the form upon clicking Update button
		const openEdit = (courseId) => {

			fetch(`http://localhost:4000/api/courses/${courseId}`, {
				headers: {
					"Authorization": `Bearer ${localStorage.getItem("token")}`
				}
			})
			.then(response => response.json())
			.then(data => {
				console.log(data)

				setName(data.courseName)
				setDescription(data.description)
				setPrice(data.price)
			})

			setShowAdd(true)
		}


		//edit course function to be invoked when onSubmit event takes place (see edit course modal code)
		const editCourse = (e, courseId) => {
			e.preventDefault()

			fetch(`http://localhost:4000/api/courses/${courseId}/edit`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("token")}`
				},
				body: JSON.stringify({
					courseName: name,
					description: description,
					price: price
				})
			})
			.then(response => response.json())
			.then(data => {
				// console.log(data) //object

				if(typeof data !== "undefined"){
					fetchData()

					Swal.fire({
						title: "Success",
						icon: "success",
						text: "Course successfully updated."
					})

					closeAdd()
				} else {

					Swal.fire({
						title: "Something went wrong",
						icon: "error",
						text: "Please try again."
					})

					fetchData()
				}
			})
		}

		//archive course
		const archiveCourse = (courseId, isActive) => {
			console.log(isActive)
			fetch(`http://localhost:4000/api/courses/${courseId}/archive`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("token")}`
				},
				body: JSON.stringify({
					isActive: !isActive
				})
			})
			.then(response => response.json())
			.then(data => {
				// console.log(data)

				if(data === true){

					fetchData()

					Swal.fire({
						title: "Success",
						icon: "success",
						text: "Course disabled"
					})
				} else {
					fetchData()

					Swal.fire({
						title: "Something went wrong",
						icon: "error",
						text: "Please try again."
					})
				}
			})
		}

	return(
		<Container>
			<h2 className="text-center">Admin Dashboard</h2>
			<Row className="justify-content-center">
				<Col>
					<div className="text-right">
						<Button onClick={openAdd}>Add New Course</Button>
					</div>
				</Col>
			</Row>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
						<th>Availability</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{courses}
				</tbody>
			</Table>

		{/*Add Course Modal*/}
		<Modal show={showAdd} onHide={closeAdd}>
			<Modal.Header closeButton>
				<Modal.Title>Add Course</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={ (e) => addCourse(e)}>
					<Form.Group controlId="courseName">
						<Form.Label>Course Name:</Form.Label>
						<Form.Control 
							type="text"
							value={name}
							onChange={ (e) => setName(e.target.value)}/>
					</Form.Group>
					<Form.Group controlId="courseDescription">
						<Form.Label>Description:</Form.Label>
						<Form.Control 
							type="text" 
							value={description}
							onChange={ (e) => setDescription(e.target.value)}/>
					</Form.Group>
					<Form.Group controlId="coursePrice">
						<Form.Label>Price:</Form.Label>
						<Form.Control 
							type="number" 
							value={price}
							onChange={ (e) => setPrice(e.target.value)}/>
					</Form.Group>
					<Button variant="success" type="submit">
					    Submit
					</Button>
					<Button 
						variant="secondary" 
						type="submit" 
						onClick={closeAdd}>
					    Close
					</Button>
				</Form>
			</Modal.Body>
		</Modal>

		{/*Edit Course*/}
		<Modal show={showAdd} onHide={closeAdd}>
			<Modal.Header closeButton>
				<Modal.Title>Edit Course</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={ (e) => editCourse(e, courseId)}>
					<Form.Group controlId="courseName">
						<Form.Label>Course Name:</Form.Label>
						<Form.Control 
							type="text"
							value={name}
							onChange={ (e) => setName(e.target.value)}/>
					</Form.Group>
					<Form.Group controlId="courseDescription">
						<Form.Label>Description:</Form.Label>
						<Form.Control 
							type="text" 
							value={description}
							onChange={ (e) => setDescription(e.target.value)}/>
					</Form.Group>
					<Form.Group controlId="coursePrice">
						<Form.Label>Price:</Form.Label>
						<Form.Control 
							type="number" 
							value={price}
							onChange={ (e) => setPrice(e.target.value)}/>
					</Form.Group>
					<Button variant="success" type="submit">
					    Submit
					</Button>
					<Button 
						variant="secondary" 
						type="submit" 
						onClick={closeAdd}>
					    Close
					</Button>
				</Form>
			</Modal.Body>
		</Modal>

		</Container>	
	)
}