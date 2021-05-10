import React, { useEffect, useState } from 'react';
import api from '../../API/api';
import CourseCard from '../../components/CourseCard/CourseCard';
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
		const fetchUser = async () => {
			try {
				const localData = JSON.parse(localStorage.getItem('localData'));
				const token = localData.find((el) => el.token);

				const { data } = await api.get('/users/mycourses', {
					headers: { Authorization: token.token },
				});
				console.log(data);
			} catch (e) {
				console.log(e.message);
			}
		};
		fetchUser();
	}, []);

	const onButtonClick = () => {
		const localData = JSON.parse(localStorage.getItem('localData'));
		setCoursesList(localData.map((el) => el));
	};
	return (
		<div className="grid-container">
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
		</div>
	);
};

export default Courses;
