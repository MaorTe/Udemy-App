import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useEffect, useState } from 'react';
import CourseCard from '../CourseCard/CourseCard';
import api from '../../API/api';
// import NextArrow from './NextArrow';
// import PrevArrow from './PrevArrow';
const Carousel = ({ tag, onPictureClick, width }) => {
	const [coursesList, setCoursesList] = useState([]);
	const [isAdded, setIsAdded] = useState();
	useEffect(() => {
		const fetchCourses = async () => {
			try {
				// const localData = JSON.parse(localStorage.getItem('localData'));
				// const token = localData.find((el) => el.token);
				const { data } = await api.get('/courses/:tag', {
					params: { tag },
				});
				console.log(data);
				setCoursesList(data);
			} catch (e) {
				console.log(e.message);
			}
		};
		fetchCourses();
	}, []);

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
						// key={courses.id}
						// id={courses._id}
						// title={courses.courseName}
						// poster={courses.courseImage}
						// desc={courses.courseDescription}
						tag={tag}
						width={244}
						height={140}
						onButtonClick={onPictureClick}
						course={course}
					/>
				))}
			</Slider>
		</div>
	);
};
export default Carousel;
