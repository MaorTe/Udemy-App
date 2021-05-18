import React, { useEffect, useState } from 'react';
import api from '../../API/api';
import CourseCard from '../../components/CourseCard/CourseCard';
import * as S from './Courses.style';
// import MyLoader from '../components/MyLoader';

const Courses = () => {
	const [coursesList, setCoursesList] = useState([]);
	// const [falsy, setFalsy] = useState(false);
	// const localData = JSON.parse(localStorage.getItem('localData'));
	//iterate over the local storage and set items to coursesList
	// useEffect(() => {
	// 	const fetchMyCourses = () => {
	// 		const localData = JSON.parse(localStorage.getItem('localData'));
	// 		console.log(localData.length);
	// 		setCoursesList(localData.map((el) => el));
	// 	};
	// 	fetchMyCourses();
	// }, [localData.length]);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const token = localStorage.getItem('token');
				const { data } = await api.get('/users/mycourses', {
					headers: { Authorization: token },
				});
				setCoursesList(data);
			} catch (e) {
				console.log(e.message);
			}
		};
		fetchCourses();
	}, []);

	const onButtonClick = () => {
		const localData = JSON.parse(localStorage.getItem('localData'));
		setCoursesList(localData.map((el) => el));
	};

	console.log(coursesList);
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
