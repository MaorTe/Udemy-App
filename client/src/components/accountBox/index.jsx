import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { LoginForm } from './loginForm';
import { AccountContext } from './accountContext';
import { SignupForm } from './signupForm';
import { useHistory } from 'react-router-dom';
import api from '../../API/api';
import {
	BoxContainer,
	BackDrop,
	backdropVariants,
	expandingTransition,
	HeaderContainer,
	HeaderText,
	InnerContainer,
	SmallText,
	TopContainer,
} from './index.style';
// import { BoxContainer } from './common.styles';

export function AccountBox({ getUser }) {
	const { location } = useHistory();
	const history = useHistory();

	//animation
	const [isExpanded, setExpanded] = useState(false);

	// const params = useParams();
	useEffect(() => {
		const type = location.pathname.slice(1);
		// const Checktype = async () => {
		setActive(type);
		// };
		// Checktype();
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
			//redirect to homepage
			history.push('/Signin');
		} catch (e) {
			console.dir(e);
		}
	};

	const loginUser = async () => {
		try {
			const { data } = await api.post('users/login', loginInfo);
			setUserInfo([data]);
			// console.log(data);
			//set profile name on navbar and redirect to homepage
			const localData = JSON.parse(localStorage.getItem('localData'));
			localData.push({ token: data.token, user: data.user });
			localStorage.setItem('localData', JSON.stringify(localData));
			getUser();
			history.push('/');
			// const isTokenExist = localData.findIndex((el) => el.token && el);
			// console.log(isTokenExist);
			// return isTokenExist;
		} catch (e) {
			console.dir(e);
		}
	};

	//animation functions
	const playExpandingAnimation = async () => {
		await setExpanded(true);
		setTimeout(() => {
			setExpanded(false);
		}, expandingTransition.duration * 1000 - 1500);
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
			<BoxContainer>
				<TopContainer>
					<BackDrop
						initial={false}
						animate={isExpanded ? 'expanded' : 'collapsed'}
						variants={backdropVariants}
						transition={expandingTransition}
					/>
					<HeaderContainer>
						<HeaderText>
							{active === 'Signin' ? 'Welcome' : 'Create'}
						</HeaderText>
						<HeaderText>{active === 'Signin' ? 'Back' : 'Account'}</HeaderText>
						<SmallText>
							{active === 'Signin'
								? 'Please sign-in to continue!'
								: 'Please sign-up to continue!'}
						</SmallText>
					</HeaderContainer>
				</TopContainer>
				<InnerContainer>
					{active === 'Signin' ? (
						<LoginForm />
					) : active === 'Signup' ? (
						<SignupForm />
					) : (
						''
					)}
					{/* {active === 'Signin' && <LoginForm />}
					{active === 'Signup' && <SignupForm />} */}
				</InnerContainer>
			</BoxContainer>
		</AccountContext.Provider>
	);
}
