import axios from 'axios';
import React, { useEffect, useState } from 'react';
import api from '../../API/api';

const Profile = () => {
	const [user, setUser] = useState([]);
	const [token, setToken] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const localData = JSON.parse(localStorage.getItem('localData'));
				const token = localData.find((el) => el.token);
				const newToken = localStorage.getItem('token');
				// console.log(newToken);
				// console.log(token);
				setToken(token);
				const { data } = await api.get('/users/me', {
					headers: { Authorization: newToken },
				});
				console.log(data);
				setUser([data]);
			} catch (e) {
				console.log(e.message);
			}
		};
		fetchUser();
	}, []);

	// useEffect(() => {
	const uploadFile = async () => {
		try {
			const { data } = await api.get(`/users/${user[0]._id}/avatar`, {
				headers: { Authorization: token.token },
			});
			console.log(data);
			// setUser([data]);
		} catch (e) {
			console.log(e.message);
		}
	};
	// uploadFile();
	// }, [user]);

	// const filesSelectedHandler = (e) => {
	// 	setSelectedFile(e.target.files[0]);
	// 	console.log(selectedFile);
	// };

	const fileUploadHandler = async () => {
		try {
			// const localData = JSON.parse(localStorage.getItem('localData'));
			// const token = localData.find((el) => el.token);

			const fd = new FormData();
			fd.append('avatar', selectedFile);
			console.log(fd.get('avatar'));

			const { data } = await axios.post(
				`http://localhost:3001/api/users/special/me/avatar`,
				fd,
				{
					headers: {
						Authorization: token.token,
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			console.log(data);
		} catch (e) {
			console.log(e.message);
		}
	};

	// const deleteFile = async () => {
	// 	try {
	// 		const { data } = await api.delete(`/users/me/avatar`, {
	// 			headers: {
	// 				Authorization: token.token,
	// 			},
	// 		});
	// 		console.log(data);
	// 	} catch (e) {
	// 		console.log(e.message);
	// 	}
	// };
	return (
		<div>
			<h2>User profile, upload picture and edit details</h2>
			{user.map((info) => {
				return (
					<div key={info._id}>
						<h3>{'user Avatar'}</h3>
						<input
							type="file"
							onChange={(e) => setSelectedFile(e.target.files[0])}
						/>

						<button onClick={fileUploadHandler}>upload</button>

						{/* <button onClick={() => deleteFile()}>delete</button> */}
						<h3>{info.name}</h3>
						<h3>{info.age}</h3>
						<h3>{info.email}</h3>
						<img src={`data: image/png;base64,${user[0].avatar}`} alt="" />
					</div>
				);
			})}
		</div>
	);
};
export default Profile;
