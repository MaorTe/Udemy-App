import React, { useEffect } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import * as S from './Homepage.style';
import hero from '../../img/undraw_Coding_re_iv62.svg';
import waves from '../../img/wave.svg';
import wave2 from '../../img/wave2.svg';
import wavewhite from '../../img/wavewhite.svg';
import waveinverse from '../../img/waveinverse.svg';
import wavetop from '../../img/wavetop.svg';
const Homepage = () => {
	const [width, setWidth] = React.useState(window.innerWidth);
	const updateWidth = () => setWidth(window.innerWidth);
	useEffect(() => {
		window.addEventListener('resize', updateWidth);
		return () => window.removeEventListener('resize', updateWidth);
	}, []);

	return (
		<div className="homepage">
			<S.HeroContainer>
				<S.WaveImg src={waveinverse} alt="wavetop" />

				<S.HeroContentTop>
					<h1>Online learning platform</h1>
					<p>
						Build skills with courses, certificates, and degrees online from
						world-class universities and companies
					</p>
					<a href="/" class="btn hero-btn fadeInLeft">
						Join for Free
					</a>
				</S.HeroContentTop>
				<S.HeroContentBottom>
					<img src={hero} alt="hero" />
				</S.HeroContentBottom>
				{/* <img src={waves} alt="wave" /> */}
			</S.HeroContainer>
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
