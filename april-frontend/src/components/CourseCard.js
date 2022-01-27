import {useState, useEffect} from 'react';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function CourseCard({courseProp}){
	console.log(courseProp)	/*object*/

	const {courseName, description, isActive, price, _id} = courseProp

	const [isDisabled, setIsDisabled] = useState(false)

	return(
		<Container>
			<Row className="justify-content-center">
				<Col xs={8} md={4}>
					<Card>
					  <Card.Body>
					    <Card.Title>{courseName}</Card.Title>
					    <Card.Subtitle>Description:</Card.Subtitle>
					    <Card.Text>{description}</Card.Text>
					    <Card.Subtitle>Price:</Card.Subtitle>
					    <Card.Text>{price}</Card.Text>
					    <Link className="btn btn-primary" to={`/courses/${_id}`}>Details</Link>
					  </Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}