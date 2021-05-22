import React, { useEffect, useState } from 'react';
import api from '../../API/api';
import CourseCard from '../../components/CourseCard/CourseCard';
import * as S from './Courses.style';

const Courses = () => {
	const [coursesList, setCoursesList] = useState([]);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const token = localStorage.getItem('token');
				const { data } = await api.get('/users/mycourses', {
					headers: { Authorization: token },
				});
				setCoursesList(data);
				console.log(data);
			} catch (e) {
				console.log(e.message);
			}
		};
		fetchCourses();
	}, []);

	console.log('in courses.js is' + coursesList);
	return (
		<S.GridContainer>
			{coursesList.length ? (
				coursesList.map((course) => (
					<CourseCard
						key={course._id}
						width={244}
						height={140}
						onButtonClick={'onPictureClick'}
						course={course.courseId}
					/>
				))
			) : (
				<h1>coursesList is empty</h1>
			)}
		</S.GridContainer>
	);
};

export default Courses;
