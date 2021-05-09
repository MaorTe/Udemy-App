// import React, { useState } from 'react';
// // import { useParams } from 'react-router-dom';
// import styled from 'styled-components';
// import { LoginForm } from './loginForm';
// import { motion } from 'framer-motion';
// import { AccountContext } from './accountContext';
// import { SignupForm } from './signupForm';
// import { useHistory } from 'react-router-dom';
// import api from '../../API/api';

// const BoxContainer = styled.div`
// 	width: 280px;
// 	min-height: 550px;
// 	top: 50px;
// 	display: flex;
// 	flex-direction: column;
// 	border-radius: 19px;
// 	background-color: #fff;
// 	box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
// 	position: relative;
// 	overflow: hidden;
// `;

// const TopContainer = styled.div`
// 	width: 100%;
// 	height: 250px;
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: flex-end;
// 	padding: 0 1.8em;
// 	padding-bottom: 5em;
// `;

// const BackDrop = styled(motion.div)`
// 	width: 160%;
// 	height: 550px;
// 	position: absolute;
// 	display: flex;
// 	flex-direction: column;
// 	border-radius: 50%;
// 	transform: rotate(60deg);
// 	top: -290px;
// 	left: -70px;
// 	background: rgb(241, 196, 15);
// 	background: linear-gradient(
// 		58deg,
// 		rgba(241, 196, 15, 1) 20%,
// 		rgba(243, 172, 18, 1) 100%
// 	);
// `;

// const HeaderContainer = styled.div`
// 	width: 100%;
// 	display: flex;
// 	flex-direction: column;
// `;

// const HeaderText = styled.h2`
// 	font-size: 35px;
// 	font-weight: 600;
// 	line-height: 1.24;
// 	color: #fff;
// 	z-index: 10;
// 	margin: 0;
// `;

// const SmallText = styled.h5`
// 	color: #fff;
// 	font-weight: 500;
// 	font-size: 15px;
// 	z-index: 10;
// 	margin: 0;
// 	margin-top: 7px;
// `;

// const InnerContainer = styled.div`
// 	width: 100%;
// 	display: flex;
// 	flex-direction: column;
// 	padding: 0 1.8em;
// `;

// //animation
// const backdropVariants = {
// 	expanded: {
// 		width: '233%',
// 		height: '1050px',
// 		borderRadius: '20%',
// 		transform: 'rotate(60deg)',
// 	},
// 	collapsed: {
// 		width: '160%',
// 		height: '550px',
// 		borderRadius: '50%',
// 		transform: 'rotate(60deg)',
// 	},
// };

// const expandingTransition = {
// 	type: 'spring',
// 	duration: 2.3,
// 	stiffness: 30,
// };

// export function AccountBox(props) {
// 	const { location } = useHistory();
// 	//animation
// 	const [isExpanded, setExpanded] = useState(false);

// 	// const params = useParams();

// 	// useEffect(() => {
// 	// 	const type = location.pathname.slice(1);
// 	// 	const Checktype = async () => {
// 	// 		setActive(type);
// 	// 	};
// 	// 	Checktype();
// 	// }, []);
// 	//create new user
// 	// const [userData, setUserData] = useState([]);
// 	// const [userInfo, setUserInfo] = useState({
// 	// 	name: '',
// 	// 	age: '',
// 	// 	email: '',
// 	// 	password: '',
// 	// });
// 	// const createUser = async () => {
// 	// 	try {
// 	// 		const { data } = await api.post('users', userInfo);
// 	// 		setUserData([data]);
// 	// 	} catch (e) {
// 	// 		console.dir(e);
// 	// 	}
// 	// 	//set profile name on navbar and redirect to homepage
// 	// };
// 	// //animation functions
// 	const playExpandingAnimation = async () => {
// 		console.log(isExpanded);
// 		await setExpanded(true);
// 		console.log(isExpanded);
// 		setTimeout(() => {
// 			setExpanded(false);
// 		}, expandingTransition.duration * 1000 - 1500);
// 	};
// 	// const [active, setActive] = useState('Signin');
// 	// console.log(location.pathname.slice(1));

// 	// const contextValue = {
// 	// 	createUser,
// 	// 	userInfo,
// 	// 	setUserInfo,
// 	// };

// 	return (
// 		<BoxContainer>
// 			<TopContainer>
// 				<BackDrop
// 					initial={false}
// 					animate={isExpanded ? 'expanded' : 'collapsed'}
// 					variants={backdropVariants}
// 					transition={expandingTransition}
// 				/>
// 				{/* {
// 					<HeaderContainer>
// 						<HeaderText>
// 							{active === 'Signin' ? 'Welcome' : 'Create'}
// 						</HeaderText>
// 						<HeaderText>{active === 'Signin' ? 'Back' : 'Account'}</HeaderText>
// 						<SmallText>
// 							{active === 'Signin'
// 								? 'Please sign-in to continue!'
// 								: 'Please sign-up to continue!'}
// 						</SmallText>
// 					</HeaderContainer>
// 				}
// 				{active === 'Signup' && (
// 					<HeaderContainer>
// 						<HeaderText>Create</HeaderText>
// 						<HeaderText>Account</HeaderText>
// 						<SmallText>Please sign-up to continue!</SmallText>
// 					</HeaderContainer>
// 				)} */}
// 			</TopContainer>
// 			<InnerContainer>
// 				<LoginForm />
// 			</InnerContainer>
// 		</BoxContainer>
// 	);
// }
