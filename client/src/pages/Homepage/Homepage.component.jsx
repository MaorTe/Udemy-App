import React, { useEffect, useState } from 'react';
import api from '../../API/api';
import Carousel from '../../components/Carousel/Carousel';

const Homepage = () => {
	const [token] = useState(localStorage.getItem('localData'));

	const [width, setWidth] = React.useState(window.innerWidth);
	const updateWidth = () => setWidth(window.innerWidth);
	useEffect(() => {
		window.addEventListener('resize', updateWidth);
		return () => window.removeEventListener('resize', updateWidth);
	}, []);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const localData = JSON.parse(localStorage.getItem('localData'));
				const token = localData.find((el) => el.token);

				const { data } = await api.get('/courses');
				console.log(data);
			} catch (e) {
				console.log(e.message);
			}
		};
		fetchUser();
	}, []);

	return (
		<div className="homepage">
			<h1>Homepage</h1>
			<h1>Welcome {token}</h1>
			<h2>Top courses in Web Development</h2>
			<Carousel width={width}></Carousel>
			<h2>Newest courses in JavaScript</h2>
			<Carousel width={width}></Carousel>
		</div>
	);
};

export default Homepage;
