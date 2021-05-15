import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar.component';
import NotFound from './pages/NotFound/NotFound.component';
import Signin from './pages/Signin.component';
import Signup from './pages/Signup.component';
import { useEffect, useState } from 'react';
import { AccountContext } from './components/accountBox/accountContext';
import Homepage from './pages/Homepage/Homepage.component';
import api from './API/api';
import Courses from './pages/Courses/Courses.component';
import Profile from './pages/Profile/Profile.component';
import Video from './pages/VideoPage/Video.component';
import AddVideo from './pages/AddVideoPage/AddVideo.component';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	useEffect(() => {
		const createLocalStorage = () => {
			if (!Array.isArray(JSON.parse(localStorage.getItem('localData')))) {
				localStorage.setItem('localData', JSON.stringify([]));
			}
		};
		createLocalStorage();
	}, []);

	const [user, setUser] = useState(null);

	const getUser = () => {
		setIsLoggedIn(!isLoggedIn);
	};

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const localData = JSON.parse(localStorage.getItem('localData'));
				const token = localData.find((el) => el.token);

				const { data } = await api.get('users/me', {
					headers: { Authorization: token.token },
				});
				setUser(data.name);
				setIsLoggedIn(true);
			} catch (e) {
				console.log(e.message);
			}
		};
		fetchUser();
	}, []);

	return (
		<div>
			<AccountContext.Provider value={'coursesListId'}>
				<Router>
					<Navbar user={user} isLoggedIn={isLoggedIn} getUser={getUser} />
					<Switch>
						<Route
							exact
							path="/Signin"
							component={() => <Signin getUser={getUser} />}
						/>
						<Route exact path="/Profile" component={Profile} />
						<Route exact path="/" component={Homepage} />
						<Route exact path="/Signup" component={Signup} />
						<Route exact path="/Courses" component={Courses} />
						<Route exact path="/Courses/Videos/AddVideo" component={AddVideo} />
						<Route
							exact
							path="/Courses/:courseName/Videos/:courseId"
							component={Video}
						/>
						{/*<Route
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
