import {useState, useEffect, Fragment} from 'react';
import CourseCard from './CourseCard';

export default function UserView({courseData}) {
	//console.log(courseData)	//array of objects
	const [courses, setCourses] = useState([])

	// console.log(courseData)

	useEffect( () => {
		const courseArr = courseData.map( course => {
			// console.log(course)

			//checks if course is active
			if(course.isActive === true){
				return(
					//pass each element of the array to CourseCard component
					<CourseCard 
						courseProp={course} 
						key={course._id}
					/>
				)
			} else {
				return null
			}
		})

		setCourses(courseArr)

	}, [courseData])


	return(
		<Fragment>
			{courses}
		</Fragment>
	)
}