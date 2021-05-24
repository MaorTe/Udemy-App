/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import api from '../../API/api';
import logo from '../../img/logo.png';
import * as S from './Navbar.style';

const Navbar = ({ getUser, isLoggedIn, user, userAdmin }) => {
	const logoutUser = () => {
		localStorage.removeItem('token');
		getUser({
			isAuthenticated: false,
			user: null,
			isAdmin: false,
		});
	};

	return (
		<S.NavbarContainer>
			<div>
				<S.NavLinkLogo to="/">
					<img src={logo} alt="Home" width="115" />
				</S.NavLinkLogo>
			</div>

			<S.ul>
				{isLoggedIn ? (
					<>
						<S.li>
							<span>Welcome {user && user.name}</span>
						</S.li>
						<S.li>
							<S.NavLink to="/Profile">
								<h3>Profile</h3>
							</S.NavLink>
						</S.li>
						{userAdmin && (
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
