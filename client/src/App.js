import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar.component';
import NotFound from './pages/NotFound/NotFound.component';
import Signin from './pages/Signin.component';
import Signup from './pages/Signup.component';
import Logout from './pages/Logout/llllLogout.component';
import { useEffect, useState } from 'react';
import { AccountContext } from './components/accountBox/accountContext';
import Homepage from './pages/Homepage/Homepage.component';
import api from './API/api';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	useEffect(() => {
		const createLocalStorage = () => {
			if (!Array.isArray(JSON.parse(localStorage.getItem('localData')))) {
				localStorage.setItem('localData', JSON.stringify([]));
			}
		};
		// isLoggedIn && getUser();
		createLocalStorage();
	}, []);

	const [user, setUser] = useState(null);

	const getUser = (user) => {
		setUser(user);
		setIsLoggedIn(!isLoggedIn);
		console.log(isLoggedIn);
	};

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const localData = JSON.parse(localStorage.getItem('localData'));
				const token = localData.find((el) => el.token);

				const { data } = await api.get('users/me', {
					headers: { Authorization: token.token },
				});
				setIsLoggedIn(true);
				console.log(isLoggedIn);
			} catch (e) {
				console.log(e.message);
			}
		};
		fetchUser();
	}, []);
	return (
		<div>
			<AccountContext.Provider value={'a'}>
				<Router>
					<Navbar user={user} isLoggedIn={isLoggedIn} getUser={getUser} />
					{/* <Route
						exact
						path="/"
						component={() => (
							<Navbar user={user} isLoggedIn={isLoggedIn} getUser={getUser} />
						)}
					/> */}
					<Switch>
						{/* <Route exact path="/" component={Homepage} /> */}
						<Route
							exact
							path="/Signin"
							component={() => <Signin getUser={getUser} />}
						/>
						<Route exact path="/" component={Homepage} />
						<Route exact path="/Signup" component={Signup} />
						{/* <Route
							exact
							path="/Logout"
							component={() => <Logout getUser={getUser} />}
						/> */}
						{/* <Route
						exact
						path="/MovieDetails/:type/:id"
						component={MovieDetails}
					/>
					<Route exact path="/Categories/:type" component={Categories} />
					<Route
						exact
						path="/SearchResults/:type/q=:query"
						component={SearchResults}
					/> */}
						<Route component={NotFound} />
					</Switch>
				</Router>
			</AccountContext.Provider>
		</div>
	);
}
export default App;
