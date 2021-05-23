/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import api from '../../API/api';
import * as S from './AddVideo.style';
import { useParams } from 'react-router';
import { Marginer } from '../../components/marginer';

const AddVideo = () => {
	const { courseId } = useParams();
	const [user, setUser] = useState();
	const [videoInfo, setVideoInfo] = useState({
		videoLink: '',
		videoTitle: '',
		videoDescription: '',
		courseId: courseId,
	});
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

	const addVideo = async () => {
		try {
			const token = localStorage.getItem('token');
			const data = await api.post('/video/addvideo', videoInfo, {
				headers: { Authorization: token },
			});
			console.log(data);
		} catch (e) {
			console.log(e.message);
		}
	};

	const changeHandler = (e) =>
		setVideoInfo({ ...videoInfo, [e.target.name]: e.target.value });
	return (
		<S.BoxContainer>
			<h1>Add new video</h1>
			<S.FormContainer>
				<S.Input
					name={'videoLink'}
					onChange={changeHandler}
					type="text"
					placeholder="Video Link"
					required
				/>
				<S.Input
					name={'videoTitle'}
					onChange={changeHandler}
					type="text"
					placeholder="Video title"
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
