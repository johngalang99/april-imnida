import {Fragment, useEffect, useState, useContext} from 'react'
// import courseData from './../data/courseData';

import UserContext from "./../UserContext"

/*components*/
	/*CourseCard is the template for courses*/
import CourseCard from './../components/CourseCard';
import AdminView from "./../components/AdminView";
import UserView from "./../components/UserView";

export default function Courses(){

	const [courses, setCourses] = useState([])
	const {user} = useContext(UserContext)

	const fetchData = () => {
		fetch("http://localhost:4000/api/courses")
		.then(response => response.json())
		.then(data => {
			//console.log(data)	//array of objects
			setCourses(data)
		})
	}
	
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<Fragment>
			{
				(user.isAdmin === true ) ?
					<AdminView courseData= {courses} fetchData={fetchData}/>
				:
					<UserView courseData={courses}/>
			}
		</Fragment>
	)
}