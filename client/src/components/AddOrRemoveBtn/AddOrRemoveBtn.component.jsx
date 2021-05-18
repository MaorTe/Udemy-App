import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import api from '../../API/api';
import * as S from './AddOrRemoveBtn.style';
const AddOrRemoveBtn = ({ id, isCourseExist }) => {
	const [isCourseInFavorites, setIsCourseInFavorites] = useState(isCourseExist);
	useEffect(() => {
		const buttonInit = () => {
			setIsCourseInFavorites(isCourseExist);
		};
		buttonInit();
	}, [isCourseExist]);

	const { location } = useHistory();
	const type = location.pathname.slice(1);

	const addCourse = async () => {
		try {
			const token = localStorage.getItem('token');
			const data = await api.post(
				'/users/addcourse',
				{ id },
				{
					headers: { Authorization: token },
				}
			);
			setIsCourseInFavorites(true);
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
			setIsCourseInFavorites(false);
		} catch (e) {
			console.log(e.message);
		}
	};
	const onPosterClick = () => {
		isCourseInFavorites ? removeCourse() : addCourse();
		type === 'Courses' && removeCourse();
	};
	return (
		<S.AddOrRemoveBtn>
			<button className="btn third" onClick={() => onPosterClick()}>
				{!type && (isCourseInFavorites ? 'Remove course' : 'Add course')}
				{type && 'Remove course'}
			</button>
		</S.AddOrRemoveBtn>
	);
};

export default AddOrRemoveBtn;
