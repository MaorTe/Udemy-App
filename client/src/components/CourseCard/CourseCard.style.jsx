import styled from 'styled-components';
import { Link } from 'react-router-dom';
/* -------------CourseCard------------- */
export const NavbarContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	/* background: #3a497d; */
	/* background: #3498db; */
	/* background: #2980b9; */
	background: #29303b;
	/* background: rgb(241, 196, 15);
	background: linear-gradient(
		58deg,
		rgba(241, 196, 15, 1) 20%,
		rgba(243, 172, 18, 1) 100%
	); */
	height: auto;
	z-index: 5;
`;
export const CourseTitle = styled.div`
	font-weight: bold;
	/* font-size: 18px; */
	line-height: 1.5;
	padding: 5px 29px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const CardWrapper = styled.div`
	margin-left: 10px;
	width: 300px;
	/* background: #f0f0f0; */
	border-radius: 10px;
	padding: 20px 0px;
	line-height: 2.7rem;
	transition: all 0.3s;
	/* &:hover {
	} */
	img {
		border-radius: 5px;
	}
	button {
	}
`;

export const li = styled.li`
	list-style-type: none;
`;

export const NavLink = styled(Link)`
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

export const NavLinkLogo = styled(Link)`
	display: block;
	text-decoration: none;
	color: #fff;
	font-family: sans-serif;
	font-size: 1rem;
	&:hover {
		/* color: #bbbbc1; */
		/* background: rgba(255, 255, 249, 0.376); */
		transform: scale(1.2);
	}
	&:focus {
		/* color: #bbbbc1;
		background: #201f32; */
	}
`;
