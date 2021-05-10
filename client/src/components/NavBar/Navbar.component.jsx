// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import logo from '../../img/logo.png';
import { NavbarContainer, UL, LI, NavLink } from './Navbar.style';
// import { AccountContext } from '../accountBox/accountContext';

const Navbar = ({ getUser, isLoggedIn }) => {
	const localData = JSON.parse(localStorage.getItem('localData'));
	const userName = () => {
		const user = localData.find((el) => el.user);
		return user.user.name;
	};

	const logoutUser = () => {
		const indexId = localData.findIndex((el) => el.token);
		localData.splice(indexId, 1);
		localStorage.setItem('localData', JSON.stringify(localData));
		getUser();
	};

	return (
		<NavbarContainer>
			<UL>
				{isLoggedIn && (
					<LI>
						<span>Welcome {userName()}</span>
					</LI>
				)}
				{isLoggedIn && (
					<LI>
						<NavLink to="/Courses">
							<h3> My Courses</h3>
						</NavLink>
					</LI>
				)}
				<LI>
					<NavLink to="/">
						<h3>Home</h3>
					</NavLink>
				</LI>

				{!isLoggedIn && (
					<LI>
						<NavLink to="/Signin">
							<h3> Signin</h3>
						</NavLink>
					</LI>
				)}
				{isLoggedIn && (
					<LI>
						<NavLink to="/" onClick={() => logoutUser()}>
							<h3>Logout</h3>
						</NavLink>
					</LI>
				)}

				<LI>
					{/* <Link to="/"> */}
					<img src={logo} alt="" width="115" />
					{/* </Link> */}
				</LI>
			</UL>
		</NavbarContainer>
	);
};

export default Navbar;
