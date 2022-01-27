import { useContext, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import UserContext from '../UserContext';

export default function Logout() {
	const { unsetUser, setUser } = useContext(UserContext);

	//Clear the localStorage of the user's info
	unsetUser();
	
	useEffect(() => {
		//Set the user state back to it's original value
		setUser({id: null, isAdmin: null})
	}, [])

	return(

		<Redirect to="/login"/>
	)
}