import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useEffect, useState } from 'react';
import CourseCard from '../CourseCard/CourseCard';
import api from '../../API/api';
// import NextArrow from './NextArrow';
// import PrevArrow from './PrevArrow';
const Carousel = ({ data, onPictureClick, width }) => {
	const [coursesList, setCoursesList] = useState([]);
	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const localData = JSON.parse(localStorage.getItem('localData'));
				const token = localData.find((el) => el.token);

				const { data } = await api.get('/courses', 'top', {
					headers: { Authorization: token.token },
				});
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
	// 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUXn9EndVF5AuFcyVece-nVEhyTLmF3J-vY0ifinxnn0pcLgwfWE6aBEIvFtWGqBIWPHI&usqp=CAU'

	// 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiKDq4s8xYwI5CAiuSPqQ_WlmEuk6DsmaNWOiUBqWm_CHF9IhV6_nHI5-8DRfggVjNRDc&usqp=CAU'

	// 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiKDq4s8xYwI5CAiuSPqQ_WlmEuk6DsmaNWOiUBqWm_CHF9IhV6_nHI5-8DRfggVjNRDc&usqp=CAU'

	// 'https://campustechnology.com/-/media/EDU/CampusTechnology/2019-Images/20191209online.jpg'
	return (
		<div>
			<Slider {...settings}>
				{coursesList.map((movie) => (
					<CourseCard
						key={1}
						id={1}
						title={'title'}
						poster={
							'https://campustechnology.com/-/media/EDU/CampusTechnology/2019-Images/20191209online.jpg'
						}
						tag={'type'}
						width={244}
						height={140}
						onButtonClick={onPictureClick}
					/>
				))}
			</Slider>
		</div>
	);
};
export default Carousel;
