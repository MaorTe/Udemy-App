import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import api from '../../API/api';
import * as S from './AddOrRemoveBtn.style';
const AddOrRemoveBtn = ({ id }) => {
	const [isExist, setIsExist] = useState(null);
	// const [isExist, setIsExist] = useState(null);

	// useEffect(() => {
	// 	const fetchCourses = async () => {
	// 		try {
	// 			const localData = JSON.parse(localStorage.getItem('localData'));
	// 			const token = localData.find((el) => el.token);

	// 			const { data } = await api.get('/users/mycourses', {
	// 				headers: { Authorization: token.token },
	// 			});
	// 			setIsExist(true);
	// 		} catch (e) {
	// 			console.log(e.message);
	// 		}
	// 	};
	// 	fetchCourses();

	// 	const buttonInit = () => {
	// 		const localData = JSON.parse(localStorage.getItem('localData'));
	// 		const isIdExist = localData.findIndex((el) => el.id === id);
	// 		isIdExist === -1 ? setIsExist(false) : setIsExist(true);
	// 	};
	// 	buttonInit();
	// }, [isExist]);
	const { location } = useHistory();
	const type = location.pathname.slice(1);
	console.log(type);
	const addCourse = async () => {
		try {
			const localData = JSON.parse(localStorage.getItem('localData'));
			const token = localData.find((el) => el.token);
			// console.log(token.token);
			const data = await api.post(
				'/users/addcourse',
				{ id },
				{
					headers: { Authorization: token.token },
				}
			);
			setIsExist(true);
		} catch (e) {
			console.log(e.message);
		}
	};
	const removeCourse = async () => {
		try {
			const localData = JSON.parse(localStorage.getItem('localData'));
			const token = localData.find((el) => el.token);
			const data = await api.patch(
				'/users/deletecourse',
				{ id },
				{
					headers: { Authorization: token.token },
				}
			);
			console.log(data);
			setIsExist(false);
		} catch (e) {
			console.log(e.message);
		}
	};
	const onPosterClick = () => {
		type === 'Courses' && removeCourse();
		type === 'Homepage' ? removeCourse() : addCourse();
	};

	return (
		<S.AddOrRemoveBtn>
			<button className="btn third" onClick={() => onPosterClick()}>
				{type === 'Courses' ? 'Remove from my courses' : 'Add to my courses'}
			</button>
		</S.AddOrRemoveBtn>
	);
};

export default AddOrRemoveBtn;
