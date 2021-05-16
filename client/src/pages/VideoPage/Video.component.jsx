import React, { useEffect, useState } from 'react';
import api from '../../API/api';
import ReactPlayer from 'react-player';
// import * as S from './Video.style';
import * as S from './Video.style';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const Video = () => {
	const { courseName, courseId } = useParams();
	console.log(courseName, courseId);
	const [user, setUser] = useState('');
	const [showVideo, setShowVideo] = useState('');
	const [videosList, setVideosList] = useState([]);
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const localData = JSON.parse(localStorage.getItem('localData'));
				const token = localData.find((el) => el.token);

				const { data } = await api.get('/users/me', {
					headers: { Authorization: token.token },
				});
				setUser(data);
			} catch (e) {
				console.log(e.message);
			}
		};
		fetchUser();
	}, []);

	useEffect(() => {
		const fetchVideos = async () => {
			try {
				const localData = JSON.parse(localStorage.getItem('localData'));
				const token = localData.find((el) => el.token);

				const { data } = await api.get('users/courses/video/', {
					headers: { Authorization: token.token },
				});
				setVideosList(data);
			} catch (e) {
				console.log(e.message);
			}
		};
		fetchVideos();
	}, []);

	return (
		<div>
			<S.PageContainer>
				<S.VideoPageContainer>
					{/* <S.VideoContainer> */}
					{user ? (
						// <S.PlayerWrapper>
						<ReactPlayer
							// fluid={true}
							width={'100%'}
							height={'70vh'}
							url={
								showVideo || (videosList.length > 0 && videosList[0].videoLink)
							}
							muted={false}
							playing={false}
							controls={true}></ReactPlayer>
					) : (
						// </S.PlayerWrapper>
						'Please Login'
					)}
					{/* </S.VideoContainer> */}
				</S.VideoPageContainer>
				<S.VideosMenuContainer containerHeight={'70vh'}>
					<S.videosMenuTitle>Course content</S.videosMenuTitle>
					{videosList ? (
						videosList.map((video) => (
							<button onClick={() => setShowVideo(video.videoLink)}>
								{video.videoTitle}
							</button>
						))
					) : (
						<S.NavLink to="/Courses/Videos/AddVideo">
							<h3>Add new videos</h3>
						</S.NavLink>
					)}
				</S.VideosMenuContainer>
			</S.PageContainer>
			<div>hello</div>
		</div>
	);
};
export default Video;
