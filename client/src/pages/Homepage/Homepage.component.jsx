import Carousel from '../../components/Carousel/Carousel';

const Homepage = () => {
	return (
		<div>
			<h1>Homepage</h1>
			<div className="flex">
				{/* font-size: 2.4rem; */}
				<h2>Top courses in Web Development</h2>
			</div>
			<Carousel></Carousel>
			<div className="flex">
				{/* font-size: 2.4rem; */}
				<h2>Newest courses in JavaScript</h2>
			</div>
			<Carousel></Carousel>
		</div>
	);
};

export default Homepage;
