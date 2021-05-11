import React, { useEffect, useState } from 'react';
import api from '../../API/api';
import CourseCard from '../../components/CourseCard/CourseCard';
import { gridContainer } from './Courses.style';
// import MyLoader from '../components/MyLoader';

const Courses = () => {
	const [coursesList, setCoursesList] = useState([]);
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
				const localData = JSON.parse(localStorage.getItem('localData'));
				const token = localData.find((el) => el.token);

				const { data } = await api.get('/users/mycourses', {
					headers: { Authorization: token.token },
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
	return (
		<gridContainer>
			{coursesList.length ? (
				coursesList.map((movie, index) => (
					<CourseCard
						key={1}
						id={1}
						title={'title'}
						// poster={'pic'}
						type={movie.type}
						width={200}
						height={300}
						onButtonClick={onButtonClick}
					/>
				))
			) : (
				<h1>coursesList is empty</h1>
			)}
		</gridContainer>
	);
};

export default Courses;
