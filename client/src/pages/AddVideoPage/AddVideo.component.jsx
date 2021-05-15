import React, { useEffect, useState } from 'react';
import api from '../../API/api';
import ReactPlayer from 'react-player';
import * as S from './AddVideo.style';
import { useParams } from 'react-router';
import { Marginer } from '../../components/marginer';

const AddVideo = () => {
	const { courseName, courseId } = useParams();
	console.log(courseName, courseId);
	const [user, setUser] = useState();
	const [videoInfo, setVideoInfo] = useState({
		videoLink: '',
		videoDescription: '',
		courseId: courseId,
	});
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

	const addVideo = async () => {
		try {
			const localData = JSON.parse(localStorage.getItem('localData'));
			const token = localData.find((el) => el.token);
			const data = await api.post('/video/addvideo', videoInfo, {
				headers: { Authorization: token.token },
			});
		} catch (e) {
			console.log(e.message);
		}
	};

	// const { switchToSignin, createUser, userInfo, setUserInfo } =
	// 	useContext(AccountContext);

	const changeHandler = (e) =>
		setVideoInfo({ ...videoInfo, [e.target.name]: e.target.value });
	return (
		<S.BoxContainer>
			<S.FormContainer>
				<S.Input
					// value={userInfo.name}
					name={'videoLink'}
					onChange={changeHandler}
					type="text"
					placeholder="Video Link"
					required
				/>
				<S.Input
					name={'videoDescription'}
					onChange={changeHandler}
					type="text"
					placeholder="Video description"
				/>
			</S.FormContainer>
			<Marginer direction="vertical" margin={10} />
			<S.SubmitButton type="submit" onClick={() => addVideo()}>
				Create Video
			</S.SubmitButton>
		</S.BoxContainer>
	);
};
export default AddVideo;
