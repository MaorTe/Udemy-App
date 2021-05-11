import React, { useState, useEffect } from 'react';
import api from '../../API/api';
import * as S from './AddOrRemoveBtn.style';
const AddOrRemoveBtn = ({ id }) => {
	const [isExist, setIsExist] = useState(null);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const localData = JSON.parse(localStorage.getItem('localData'));
				const token = localData.find((el) => el.token);

				const { data } = await api.get('/users/mycourses', {
					headers: { Authorization: token.token },
				});
				setIsExist(true);
			} catch (e) {
				console.log(e.message);
			}
		};
		fetchCourses();

		const buttonInit = () => {
			const localData = JSON.parse(localStorage.getItem('localData'));
			const isIdExist = localData.findIndex((el) => el.id === id);
			isIdExist === -1 ? setIsExist(false) : setIsExist(true);
		};
		buttonInit();
	}, [isExist]);

	const addCourse = async () => {
		try {
			const localData = JSON.parse(localStorage.getItem('localData'));
			const token = localData.find((el) => el.token);

			await api.post('/api/users/addcourse', {
				headers: { Authorization: token.token },
			});
		} catch (e) {
			console.log(e.message);
		}
	};
	const onPosterClick = () => {
		// !isExist
		// 	? setIsExist(MyUtilFunc(id, poster, title, type))
		// 	: setIsExist(removeMovie());
		// onButtonClick();
	};
	const removeMovie = () => {
		const localData = JSON.parse(localStorage.getItem('localData'));
		const indexId = localData.findIndex((el) => el.id === id);
		localData.splice(indexId, 1);
		localStorage.setItem('localData', JSON.stringify(localData));
		return false;
	};
	return (
		<S.AddOrRemoveBtn>
			<button className="btn third" onClick={() => onPosterClick()}>
				{isExist ? 'Remove from Watchlist' : 'Add To Watchlist'}
			</button>
		</S.AddOrRemoveBtn>
	);
};

export default AddOrRemoveBtn;
