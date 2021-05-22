/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import api from '../../API/api';
import * as S from './AddCourse.style';
import { Marginer } from '../../components/marginer';

const AddCourse = () => {
	const [user, setUser] = useState();
	const [courseInfo, setCourseInfo] = useState({
		courseImage: '',
		courseName: '',
		courseDescription: '',
		tag: '',
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

	const addCourse = async () => {
		try {
			const token = localStorage.getItem('token');
			const data = await api.post('/courses/addcourse', courseInfo, {
				headers: { Authorization: token },
			});
		} catch (e) {
			console.log(e.message);
		}
	};

	const changeHandler = (e) =>
		setCourseInfo({ ...courseInfo, [e.target.name]: e.target.value });
	return (
		<S.BoxContainer>
			<h1>Add new course</h1>
			<S.FormContainer>
				<S.Input
					name={'courseImage'}
					onChange={changeHandler}
					type="text"
					placeholder="Course image"
					required
				/>
				<S.Input
					name={'courseName'}
					onChange={changeHandler}
					type="text"
					placeholder="Course name"
				/>
				<S.Input
					name={'courseDescription'}
					onChange={changeHandler}
					type="text"
					placeholder="Course description"
				/>
				<S.Input
					name={'tag'}
					onChange={changeHandler}
					type="text"
					placeholder="Tag"
				/>
			</S.FormContainer>
			<Marginer direction="vertical" margin={10} />
			<S.SubmitButton type="submit" onClick={() => addCourse()}>
				Create Course
			</S.SubmitButton>
		</S.BoxContainer>
	);
};
export default AddCourse;
