import axios from 'axios';
import React, { useEffect, useState } from 'react';
import api from '../../API/api';
import * as S from './Profile.style';
const Profile = () => {
	const [user, setUser] = useState([]);
	const [selectedFile, setSelectedFile] = useState(null);
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const token = localStorage.getItem('token');
				const { data } = await api.get('/users/me', {
					headers: { Authorization: token },
				});
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
			const token = localStorage.getItem('token');
			const { data } = await api.get(`/users/${user[0]._id}/avatar`, {
				headers: { Authorization: token },
			});
			// setUser([data]);
		} catch (e) {
			console.log(e.message);
		}
	};
	// uploadFile();
	// }, [user]);

	const fileUploadHandler = async () => {
		try {
			const token = localStorage.getItem('token');
			const fd = new FormData();
			fd.append('avatar', selectedFile);

			const { data } = await axios.post(
				`/api/users/special/me/avatar`,
				fd,
				// {
				// 	onUploadProgress: (progressEvent) => {
				// 		console.log(
				// 			'Upload Progress: ' +
				// 				Math.round((progressEvent.loaded / progressEvent.total) * 100) +
				// 				'%'
				// 		);
				// 	},
				// },
				{
					headers: {
						Authorization: token,
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			setSelectedFile(null);
			// setUser((prev) => prev);
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
	// 	} catch (e) {
	// 		console.log(e.message);
	// 	}
	// };
	// <script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
	// console.log(user[0]._id);
	return (
		<S.PageContainer>
			<S.CardWrapper>
				<S.CardWrapperLeft>
					<S.ImageBorder>
						{/* <img
							src={`/users/${user[0]._id}/avatar?v=${Date.now()}`}
							alt="user"
							width="100"
						/> */}
						{user.length > 0 && (
							<img
								src={
									!selectedFile
										? `/users/${user[0]._id}/avatar?v=${Date.now()}`
										: URL.createObjectURL(selectedFile)
								}
								alt=""
							/>
						)}
					</S.ImageBorder>
					{/* <S.UserTitle>Alex William</S.UserTitle> */}
				</S.CardWrapperLeft>
				<S.CardWrapperRight>
					<S.CardWrapperRightInfo>
						<S.InfoTitle>User Profile</S.InfoTitle>
						<S.InfoData>
							<S.InfoDataContent>
								{user.map((info) => {
									return (
										<div key={info._id}>
											<input
												type="file"
												onChange={(e) => setSelectedFile(e.target.files[0])}
											/>

											<button onClick={fileUploadHandler}>Save</button>

											{/* <button onClick={() => deleteFile()}>delete</button> */}
											<S.EmailTitle>Name</S.EmailTitle>
											<S.EmailParagraph>{info.name}</S.EmailParagraph>
											<S.EmailTitle>Age</S.EmailTitle>
											<S.EmailParagraph>{info.age}</S.EmailParagraph>
											<S.EmailTitle>Email</S.EmailTitle>
											<S.EmailParagraph>{info.email}</S.EmailParagraph>
											{/* <img src={`data: image/png;base64,${user[0].avatar}`} alt="" /> */}
										</div>
									);
								})}
							</S.InfoDataContent>
						</S.InfoData>
					</S.CardWrapperRightInfo>
				</S.CardWrapperRight>
			</S.CardWrapper>

			{/* <S.CardWrapper>
				<img src={`/users/${user[0]._id}/avatar?v=${Date.now()}`} alt="" />
				<h2>User Profile</h2>
				{user.map((info) => {
					return (
						<div key={info._id}>
							<input
								type="file"
								onChange={(e) => setSelectedFile(e.target.files[0])}
							/>

							<button onClick={fileUploadHandler}>upload</button>

							<button onClick={() => deleteFile()}>delete</button>
							<h3>{info.name}</h3>
							<h3>{info.age}</h3>
							<h3>{info.email}</h3>
							<img src={`data: image/png;base64,${user[0].avatar}`} alt="" />
						</div>
					);
				})}
			</S.CardWrapper> */}
		</S.PageContainer>
	);
};
export default Profile;
