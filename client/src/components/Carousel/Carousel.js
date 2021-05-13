import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useContext, useEffect, useState } from 'react';
import CourseCard from '../CourseCard/CourseCard';
import api from '../../API/api';

const Carousel = ({ tag, onPictureClick, width }) => {
	const [coursesList, setCoursesList] = useState([]);
	const [coursesListId, setCoursesListId] = useState(null);
	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const { data } = await api.get('/courses/:tag', {
					params: { tag },
				});
				setCoursesList(data);
			} catch (e) {
				console.log(e.message);
			}
		};
		fetchCourses();
	}, []);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const localData = JSON.parse(localStorage.getItem('localData'));
				const token = localData.find((el) => el.token);

				const { data } = await api.get('/users/me', {
					headers: { Authorization: token.token },
				});
				setCoursesListId(data.courses.map((course) => course.courseId));
			} catch (e) {
				console.log(e.message);
			}
		};
		fetchUser();
	}, [coursesList.length > 0]);
	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow:
			(width >= 1300 && 4) ||
			(width >= 1000 && width < 1300 && 3) ||
			(width < 1000 && 2),
		slidesToScroll: 3,
		initialSlide: 0,
		arrows: true,
		// responsive: [
		// 	{
		// 		breakpoint: 1024,
		// 		settings: {
		// 			slidesToShow: 3,
		// 			slidesToScroll: 3,
		// 			infinite: true,
		// 			dots: true,
		// 		},
		// 	},
		// 	{
		// 		breakpoint: 600,
		// 		settings: {
		// 			slidesToShow: 2,
		// 			slidesToScroll: 2,
		// 			initialSlide: 2,
		// 		},
		// 	},
		// 	{
		// 		breakpoint: 520,
		// 		settings: {
		// 			slidesToShow: 2,
		// 			slidesToScroll: 2,
		// 			arrows: false,
		// 		},
		// 	},
		// ],
	};

	return (
		<div>
			<Slider {...settings}>
				{coursesList.map((course) => (
					<CourseCard
						key={course._id}
						// id={courses._id}
						// title={courses.courseName}
						// poster={courses.courseImage}
						// desc={courses.courseDescription}
						tag={tag}
						width={244}
						height={140}
						onButtonClick={onPictureClick}
						course={course}
						coursesListId={coursesListId}
					/>
				))}
			</Slider>
		</div>
	);
};
export default Carousel;
