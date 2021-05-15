import React, { useEffect, useState } from 'react';
import api from '../../API/api';
import ReactPlayer from 'react-player';
// import * as S from './Video.style';
import * as S from './Video.style';
import { useParams } from 'react-router';

const Video = () => {
	const { courseName, courseId } = useParams();
	console.log(courseName, courseId);
	const [user, setUser] = useState();
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
		const fetchVideo = async () => {
			try {
				const localData = JSON.parse(localStorage.getItem('localData'));
				const token = localData.find((el) => el.token);
				const data = await api.post(
					'/video/addvideo',
					{ courseId },
					{
						headers: { Authorization: token.token },
					}
				);
			} catch (e) {
				console.log(e.message);
			}
		};
		fetchVideo();
	}, []);
	return (
		<S.PageContainer>
			<S.VideoPageContainer>
				{/* <S.VideoContainer> */}
				{user ? (
					// <S.PlayerWrapper>
					<ReactPlayer
						// fluid={true}
						width={'100%'}
						height={'70vh'}
						url="https://www.youtube.com/embed/CXa0f4-dWi4"
						muted={false}
						playing={false}
						controls={true}></ReactPlayer>
				) : (
					// </S.PlayerWrapper>
					'Please Login'
				)}
				{/* </S.VideoContainer> */}
			</S.VideoPageContainer>
			<S.VideosMenuContainer></S.VideosMenuContainer>
		</S.PageContainer>
	);
};
export default Video;
