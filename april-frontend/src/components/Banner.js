
import {Container, Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({data}){

	console.log(data)
	const {title, content, destination, label} = data;


	return(
		<Container fluid>
			<Row>
				<Col>
					<div className="jumbotron">
						<h1>{title}</h1>
						<p>{content}</p>
						<Link to={destination}> {label} </Link>
					</div>
				</Col>
			</Row>
		</Container>

	)
}