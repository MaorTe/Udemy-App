import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import CourseCard from '../CourseCard/CourseCard';
// import NextArrow from './NextArrow';
// import PrevArrow from './PrevArrow';
const Carousel = ({ data, onPictureClick, width }) => {
	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow:
			(width >= 1300 && 4) ||
			(width >= 1000 && width < 1300 && 3) ||
			(width < 1000 && 2),
		slidesToScroll: 3,
		// prevArrow: <PrevArrow />,
		// nextArrow: <NextArrow />,
		// prevArrow: <PrevArrow onClick={() => {}} className="" />,
		// nextArrow: <NextArrow onClick={() => {}} className="" />,

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
				{/* {data.map((movie) => ( */}
				<CourseCard
					key={1}
					id={1}
					title={'title'}
					poster={
						'https://campustechnology.com/-/media/EDU/CampusTechnology/2019-Images/20191209online.jpg'
					}
					type={'type'}
					width={244}
					height={140}
					onButtonClick={onPictureClick}
				/>
				<CourseCard
					key={1}
					id={1}
					title={'title'}
					poster={
						'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUXn9EndVF5AuFcyVece-nVEhyTLmF3J-vY0ifinxnn0pcLgwfWE6aBEIvFtWGqBIWPHI&usqp=CAU'
					}
					type={'type'}
					width={244}
					height={140}
					onButtonClick={onPictureClick}
				/>
				<CourseCard
					key={1}
					id={1}
					title={'title'}
					poster={
						'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiKDq4s8xYwI5CAiuSPqQ_WlmEuk6DsmaNWOiUBqWm_CHF9IhV6_nHI5-8DRfggVjNRDc&usqp=CAU'
					}
					type={'type'}
					width={244}
					height={140}
					onButtonClick={onPictureClick}
				/>
				<CourseCard
					key={1}
					id={1}
					title={'title'}
					poster={
						'https://campustechnology.com/-/media/EDU/CampusTechnology/2019-Images/20191209online.jpg'
					}
					type={'type'}
					width={244}
					height={140}
					onButtonClick={onPictureClick}
				/>
				<CourseCard
					key={1}
					id={1}
					title={'title'}
					poster={
						'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiKDq4s8xYwI5CAiuSPqQ_WlmEuk6DsmaNWOiUBqWm_CHF9IhV6_nHI5-8DRfggVjNRDc&usqp=CAU'
					}
					type={'type'}
					width={244}
					height={140}
					onButtonClick={onPictureClick}
				/>
				<CourseCard
					key={1}
					id={1}
					title={'title'}
					poster={
						'https://campustechnology.com/-/media/EDU/CampusTechnology/2019-Images/20191209online.jpg'
					}
					type={'type'}
					width={244}
					height={140}
					onButtonClick={onPictureClick}
				/>
				{/* ))} */}
			</Slider>
		</div>
	);
};
export default Carousel;
