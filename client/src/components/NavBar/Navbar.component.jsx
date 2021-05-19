import React, { useEffect, useState } from 'react';
import api from '../../API/api';
import logo from '../../img/logo.png';
import * as S from './Navbar.style';

const Navbar = ({ getUser, isLoggedIn, user }) => {
	const [userAdmin, setUserAdmin] = useState(null);
	const logoutUser = () => {
		localStorage.removeItem('token');
		getUser();
	};
	console.log(userAdmin);
	// const displayNavbarItems = () => {
	// 	if (isLoggedIn) {
	// 		<>
	// 			<li></li>
	// 			<li></li>
	// 			<li></li>
	// 		</>;
	// 	} else {
	// 		<>
	// 			<li></li>
	// 			<li></li>
	// 		</>;
	// 	}
	// };

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const token = localStorage.getItem('token');
				const { data } = await api.get('users/me', {
					headers: { Authorization: token },
				});
				setUserAdmin(data);
			} catch (e) {
				console.log(e.message);
			}
		};
		fetchUser();
	}, []);
	return (
		<S.NavbarContainer>
			<div>
				<S.NavLinkLogo to="/">
					<img src={logo} alt="Home" width="115" />
				</S.NavLinkLogo>
			</div>

			{/* {isLoggedIn && (
				<S.li>
					<span>Welcome {userName()}</span>
				</S.li>
			)} */}
			<S.ul>
				{isLoggedIn ? (
					<>
						<S.li>
							<span>Welcome {user}</span>
						</S.li>
						<S.li>
							<S.NavLink to="/Profile">
								<h3>Profile</h3>
							</S.NavLink>
						</S.li>
						{userAdmin.userRole === 'admin' && (
							<S.li>
								<S.NavLink to="/Courses/AddCourse">
									<h3>Add Course</h3>
								</S.NavLink>
							</S.li>
						)}
						<S.li>
							<S.NavLink to="/Courses">
								<h3> My Courses</h3>
							</S.NavLink>
						</S.li>
						<S.li>
							<S.NavLink to="/" onClick={() => logoutUser()}>
								<h3>Logout</h3>
							</S.NavLink>
						</S.li>
					</>
				) : (
					<S.li>
						<S.NavLink to="/Signin">
							<h3> Signin</h3>
						</S.NavLink>
					</S.li>
				)}
			</S.ul>
		</S.NavbarContainer>
	);
};

export default Navbar;
