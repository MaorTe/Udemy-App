import React, { useEffect, useState } from 'react';
import api from '../../API/api';
import ReactPlayer from 'react-player';
// import * as S from './Video.style';
import * as S from './Video.style';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';

const Video = () => {
	const { courseDesc } = useLocation().state;
	const { courseName, courseId } = useParams();
	const [user, setUser] = useState('');
	const [showVideo, setShowVideo] = useState('');
	const [videosList, setVideosList] = useState([]);

	//fetch user to check for token
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const token = localStorage.getItem('token');
				const { data } = await api.get('/users/me', {
					headers: { Authorization: token },
				});
				setUser(data);
			} catch (e) {
				console.log(e.message);
			}
		};
		fetchUser();
	}, []);

	//fetch videos of the chosen course
	useEffect(() => {
		const fetchVideos = async () => {
			try {
				const token = localStorage.getItem('token');
				const { data } = await api.get(`users/courses/video/${courseId}`, {
					headers: { Authorization: token },
				});
				setVideosList(data);
				console.log(videosList);
			} catch (e) {
				console.log(e.message);
			}
		};
		fetchVideos();
	}, []);

	return (
		<div>
			<S.UpperPageContainer>
				<S.VideoPageContainer>
					{/* <S.VideoContainer> */}
					{user ? (
						// <S.PlayerWrapper>
						<ReactPlayer
							// fluid={true}
							width={'100%'}
							height={'60vh'}
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
				<S.VideosMenuContainer containerHeight={'60vh'}>
					<S.videosMenuTitle>Course content</S.videosMenuTitle>
					{videosList ? (
						videosList.map((video) => (
							<div key={videosList._id}>
								<button onClick={() => setShowVideo(video.videoLink)}>
									{video.videoTitle}
								</button>
							</div>
						))
					) : (
						<S.NavLink to="/Courses/Videos/AddVideo">
							<h3>Add new videos</h3>
						</S.NavLink>
					)}
				</S.VideosMenuContainer>
			</S.UpperPageContainer>
			<S.LowerPageContainer>
				<S.CommentContainer>
					<h2>About this course</h2>
					{courseDesc}
				</S.CommentContainer>
				<S.CommentContainer>
					<h2>About this course</h2>
					{courseDesc}
				</S.CommentContainer>
			</S.LowerPageContainer>
		</div>
	);
};
export default Video;
