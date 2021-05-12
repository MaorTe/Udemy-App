import React, { useEffect, useState } from 'react';
import api from '../../API/api';

const Profile = () => {
	const [user, setUser] = useState([]);
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const localData = JSON.parse(localStorage.getItem('localData'));
				const token = localData.find((el) => el.token);

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

	return (
		<div>
			<h2>User profile, upload picture and edit details</h2>
			{user.map((info) => {
				return (
					<div key={info._id}>
						<h3>{'user Avatar'}</h3>
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
