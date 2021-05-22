/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { LoginForm } from './loginForm';
import { AccountContext } from './accountContext';
import { SignupForm } from './signupForm';
import { useHistory } from 'react-router-dom';
import api from '../../API/api';
import * as S from './index.style';

export function AccountBox({ getUser, renderAdmin }) {
	const { location } = useHistory();
	const history = useHistory();

	//animation
	const [isExpanded, setExpanded] = useState(false);
	useEffect(() => {
		const type = location.pathname.slice(1);
		setActive(type);
	}, []);
	// create new user
	const [userData, setUserData] = useState([]);
	const [userInfo, setUserInfo] = useState({
		name: '',
		age: '',
		email: '',
		password: '',
	});
	const [loginInfo, setLoginInfo] = useState({
		email: '',
		password: '',
	});
	const createUser = async () => {
		try {
			const { data } = await api.post('users', userInfo);
			setUserData([data]);
			//redirect to Signin
			history.push('/Signin');
		} catch (e) {
			console.dir(e);
		}
	};

	const loginUser = async () => {
		try {
			const { data } = await api.post('users/login', loginInfo);
			setUserInfo([data]);
			//set profile name on navbar and redirect to homepage
			localStorage.setItem('token', data.token);
			getUser({
				isAuthenticated: true,
				user: data.user,
				isAdmin: data.user.userRole === 'admin',
			});
			history.push('/');
		} catch (e) {
			console.dir(e);
		}
	};

	//animation functions
	const playExpandingAnimation = async () => {
		await setExpanded(true);
		setTimeout(() => {
			setExpanded(false);
		}, S.expandingTransition.duration * 1000 - 1500);
	};

	const [active, setActive] = useState(null);
	const [preActive, setPreActive] = useState(null);
	// const switchToSignup = () => {
	// 	setActive('')
	// 	playExpandingAnimation();
	// 	setTimeout(() => {
	// 		const type = location.pathname.slice(1);
	// 		// replace(`/Signup`);
	// 		setActive(type);
	// 	}, expandingTransition.duration * 1000 - 1500);
	// };

	const switchToSignin = () => {
		const type = location.pathname.slice(1);
		setPreActive(type);
		// playExpandingAnimation();
		// setTimeout(() => {
		// 	setActive(type);
		// }, 4000);
		// setTimeout(() => {
		// 	// replace(`/Signin`);
		// 	setActive(type);
		// }, 400);
	};
	// const renderForm = async () => {
	// 	return setTimeout(() => {
	// 		return (
	// 			<InnerContainer>
	// 				{active === 'Signin' ? (
	// 					<LoginForm />
	// 				) : active === 'Signup' ? (
	// 					<SignupForm />
	// 				) : (
	// 					''
	// 				)}
	// 				{/* {active === 'Signin' && <LoginForm />}
	// 				{active === 'Signup' && <SignupForm />} */}
	// 			</InnerContainer>
	// 		);
	// 	}, 1000);
	// };
	const contextValue = {
		// switchToSignup,
		switchToSignin,
		//passing new user
		createUser,
		userInfo,
		setUserInfo,
		//passing login
		loginUser,
		loginInfo,
		setLoginInfo,
	};

	useEffect(() => {
		playExpandingAnimation();
		const type = location.pathname.slice(1);
		setTimeout(() => {
			setActive(type);
		}, 4000);
	}, [preActive]);

	return (
		<AccountContext.Provider value={contextValue}>
			<S.BoxContainer>
				<S.TopContainer>
					<S.BackDrop
						initial={false}
						animate={isExpanded ? 'expanded' : 'collapsed'}
						variants={S.backdropVariants}
						transition={S.expandingTransition}
					/>
					<S.HeaderContainer>
						<S.HeaderText>
							{active === 'Signin' ? 'Welcome' : 'Create'}
						</S.HeaderText>
						<S.HeaderText>
							{active === 'Signin' ? 'Back' : 'Account'}
						</S.HeaderText>
						<S.SmallText>
							{active === 'Signin'
								? 'Please sign-in to continue!'
								: 'Please sign-up to continue!'}
						</S.SmallText>
					</S.HeaderContainer>
				</S.TopContainer>
				<S.InnerContainer>
					{active === 'Signin' ? (
						<LoginForm />
					) : active === 'Signup' ? (
						<SignupForm />
					) : (
						''
					)}
					{/* {active === 'Signin' && <LoginForm />}
					{active === 'Signup' && <SignupForm />} */}
				</S.InnerContainer>
			</S.BoxContainer>
		</AccountContext.Provider>
	);
}
