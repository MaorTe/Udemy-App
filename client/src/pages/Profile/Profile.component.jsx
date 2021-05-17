import React, { useEffect, useState } from 'react';
import api from '../../API/api';

const Profile = () => {
	const [user, setUser] = useState([]);
	const [selectedFile, setSelectedFile] = useState(null);
	const [token, setToken] = useState('');
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const localData = JSON.parse(localStorage.getItem('localData'));
				const token = localData.find((el) => el.token);
				setToken(token);
				const { data } = await api.get('/users/me', {
					headers: { Authorization: token.token },
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

	const filesSelectedHandler = (event) => {
		console.log(event);
	};

	const fileUploadHandler = async () => {
		try {
			const fd = new FormData();
			const { data } = await api.post(`/users/me/avatar`, fd, {
				headers: { Authorization: token.token },
			});
			console.log(data);
			// setUser([data]);
		} catch (e) {
			console.log(e.message);
		}
	};
	return (
		<div>
			<h2>User profile, upload picture and edit details</h2>
			{user.map((info) => {
				return (
					<div key={info._id}>
						<h3>{'user Avatar'}</h3>
						<input type="file" onChange={(e) => filesSelectedHandler()} />
						<h3>{info.name}</h3>
						<h3>{info.age}</h3>
						<h3>{info.email}</h3>
					</div>
				);
			})}
		</div>
	);
};
export default Profile;
