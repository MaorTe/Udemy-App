// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';
import { NavbarContainer, UL, LI, NavLink } from './Navbar.style';
// import { AccountContext } from '../accountBox/accountContext';

const Navbar = ({ isTokenExist }) => {
	// const { isLoggedIn } = useContext(AccountContext);

	// const [state, setState] = useState(-1);
	// useEffect(() => {
	// 	const test = () => {
	// 		setState(aa);
	// 		console.log(aa);
	// 	};
	// 	test();
	// }, [aa, state]);
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
				{isTokenExist === -1 ? (
					<LI>
						<NavLink to="/Signin">
							<h3> Signin</h3>
						</NavLink>
					</LI>
				) : (
					<LI>
						<NavLink to="/Logout">
							<h3>Logout</h3>
						</NavLink>
					</LI>
				)}
			</UL>
		</NavbarContainer>
	);
};

export default Navbar;
