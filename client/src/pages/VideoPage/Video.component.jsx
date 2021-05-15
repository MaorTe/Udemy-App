import React, { useEffect, useState } from 'react';
import api from '../../API/api';
import ReactPlayer from 'react-player';
// import * as S from './Video.style';
import * as S from './Video.style';

const Video = () => {
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

	return (
		<S.PageContainer>
			<S.VideoPageContainer>
				{/* <S.VideoContainer> */}
				{user ? (
					// <S.PlayerWrapper>
					<ReactPlayer
						fluid={true}
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
			<S.VideosMenuContainer />
		</S.PageContainer>
	);
};
export default Video;
