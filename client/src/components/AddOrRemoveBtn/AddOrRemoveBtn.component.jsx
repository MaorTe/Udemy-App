import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import api from '../../API/api';
import * as S from './AddOrRemoveBtn.style';
import { SaveBtn } from '../../pages/Profile/Profile.style.jsx';
const AddOrRemoveBtn = ({ id, isCourseExist, setIsCourseExist, type }) => {
	// const [isCourseInFavorites, setIsCourseInFavorites] = useState(isCourseExist);

	// useEffect(() => {
	// 	const buttonInit = () => {
	// 		setIsCourseInFavorites(isCourseExist);
	// 	};
	// 	buttonInit();
	// }, [isCourseExist]);

	// const { location } = useHistory();
	// const type = location.pathname.slice(1);

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
			setIsCourseExist((prev) => !prev);
		} catch (e) {
			console.log(e.message);
		}
	};
	const removeCourse = async () => {
		try {
			const token = localStorage.getItem('token');
			const data = await api.patch(
				'/users/deletecourse',
				{ id },
				{
					headers: { Authorization: token },
				}
			);
			setIsCourseExist((prev) => !prev);
		} catch (e) {
			console.log(e.message);
		}
	};
	const onPosterClick = () => {
		if (type === 'Courses') removeCourse();
		else if (isCourseExist) removeCourse();
		else addCourse();
	};
	return (
		<S.AddOrRemoveBtn>
			<S.CardBtn className="btn third" onClick={() => onPosterClick()}>
				{!type && (isCourseExist ? 'Remove course' : 'Add course')}
				{type && 'Remove course'}
			</S.CardBtn>
		</S.AddOrRemoveBtn>
	);
};

export default AddOrRemoveBtn;
