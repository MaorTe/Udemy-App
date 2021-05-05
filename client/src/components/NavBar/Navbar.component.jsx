import React from 'react';
// import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';
import { NavbarContainer, UL, LI, NavLink } from './Navbar.style';

const Navbar = () => {
	return (
		<NavbarContainer>
			<UL>
				<LI>
					{/* <Link to="/"> */}
					<img src={logo} alt="" width="115" />
					{/* </Link> */}
				</LI>
				<LI>
					<NavLink to="/">
						<h3>Home</h3>
					</NavLink>
				</LI>
				<LI>
					<NavLink to="/Signin">
						<h3>Signin</h3>
					</NavLink>
				</LI>
				<LI>
					<NavLink to="/Signup">
						<h3>Signup</h3>
					</NavLink>
				</LI>
			</UL>
		</NavbarContainer>
	);
};

export default Navbar;
