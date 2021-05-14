import React, { useEffect, useState } from 'react';
import Carousel from '../../components/Carousel/Carousel';

const Homepage = () => {
	const [token] = useState(localStorage.getItem('localData'));

	const [width, setWidth] = React.useState(window.innerWidth);
	const updateWidth = () => setWidth(window.innerWidth);
	useEffect(() => {
		window.addEventListener('resize', updateWidth);
		return () => window.removeEventListener('resize', updateWidth);
	}, []);

	return (
		<div className="homepage">
			<h1>Homepage</h1>
			{/* <h1>Welcome {token}</h1> */}
			<h2>Top courses in Web Development</h2>
			<Carousel tag={'top'} width={width}></Carousel>
			<h2>Newest courses in JavaScript</h2>
			<Carousel tag={'top'} width={width}></Carousel>
		</div>
	);
};

export default Homepage;
