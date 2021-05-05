import styled from 'styled-components';
import { Link } from 'react-router-dom';
/* -------------NavBar------------- */
export const NavbarContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	/* background: #3a497d; */
	/* background: #3498db; */
	background: #2980b9;
	background: rgb(241, 196, 15);
	background: linear-gradient(
		58deg,
		rgba(241, 196, 15, 1) 20%,
		rgba(243, 172, 18, 1) 100%
	);
	height: auto;
	z-index: 5;
`;
export const UL = styled.ul`
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const LI = styled.li`
	list-style-type: none;
`;

export const NavLink = styled(Link)`
	/* .category-link { */
	display: block;
	padding: 20px;
	text-decoration: none;
	color: #fff;
	font-family: sans-serif;
	font-size: 1rem;
	&:hover {
		color: #bbbbc1;
		background: #303a62;
	}
	&:focus {
		color: #bbbbc1;
		background: #201f32;
	}
`;
