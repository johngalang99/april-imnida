import {useState, useEffect} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import Swal from 'sweetalert2'; 

export default function Register(){

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [cpw, setCpw] = useState("")
    
	const [isDisabled, setIsDisabled] = useState(true)


	/*mini activity
		
		create a state for the button
			if email, pw, cpw is empty && pw does not match cpw, keep button disabled
			if states passed the requirement, activiate the button to be able to submit the form

			screenshot the state for the button & the useEffect codes
			answer by 6:20
	*/

	useEffect( ()=>{
		if((email !== "" && password !== "" && cpw !== "") && 
			(password === cpw)){
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}

	}, [email, password, cpw])


	function Register(e){
		e.preventDefault()

		//check if the values are successfully bounded.
		console.log(email);
		console.log(password);
		console.log(cpw);
        
        //send a request to our API collection
        //apply an environment variable in our fetch request.
		fetch(` ${process.env.REACT_APP_API_URL}/api/users/register `, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		}).then(response => response.json()).then(convertedData => {
			console.log(convertedData); 

			//create a control structure
			if (convertedData === true) {
				setEmail("")
				setPassword("")
				setCpw("")
              //successful 
              Swal.fire({
              	title: 'Account Created Successfully',
              	icon: 'success', 
              	text: 'Congrats'
              })
			} else { 
              //unsuccessful 
              Swal.fire({
              	title: 'Account Creation Failed',
              	icon: 'error', 
              	text: 'Something Went Wrong'
              })
			}
		})
		//how to handle a Promise? 3 states
		// Pending => Fulfilled or Rejected



		// alert("Registered Successfully!")
	}

	return(

		<Container>
			<Form 
				className="border p-3 mb-3"
				onSubmit={ (e) => Register(e) }
				>
			{/*email*/}
			  <Form.Group className="mb-3" controlId="email">
			    <Form.Label>Email address</Form.Label>
			    <Form.Control 
			    	type="email" 
			    	placeholder="Enter email" 
			    	value={email} 
			    	onChange={ (e) => setEmail(e.target.value) }
			    	/>
			  </Form.Group>
			{/*password*/}
			  <Form.Group className="mb-3" controlId="password">
			    <Form.Label>Password</Form.Label>
			    <Form.Control 
			    	type="password" 
			    	placeholder="Password" 
			    	value={password} 
			    	onChange={ (e) => setPassword(e.target.value) }
			    	/>
			  </Form.Group>
			{/*confirm password*/}
			<Form.Group className="mb-3" controlId="cpw">
			  <Form.Label>Verify Password</Form.Label>
			  <Form.Control 
			  		type="password" 
			  		placeholder="Verify Password" 
			  		value={cpw} 
			  		onChange={ (e) => setCpw(e.target.value) }
			  		/>
			</Form.Group>
			  
			  <Button 
			  		variant="primary" 
			  		type="submit"
			  		disabled={isDisabled}
			  		>
			    Submit
			  </Button>
			</Form>
		</Container>
	)
}