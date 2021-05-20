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
import AddCourse from './pages/AddCourse/AddCourse.component';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [userAdmin, setUserAdmin] = useState(null);

	const getUser = () => {
		setIsLoggedIn(!isLoggedIn);
	};
	const renderAdmin = (data) => {
		console.log(data);
		setUserAdmin(data);
		console.log(userAdmin);
	};
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const token = localStorage.getItem('token');
				const { data } = await api.get('users/me', {
					headers: { Authorization: token },
				});
				setUser(data.name);
				setUserAdmin(data);
				console.log(userAdmin);
				setIsLoggedIn(true);
			} catch (e) {
				console.log(e.message);
			}
		};
		fetchUser();
	}, [userAdmin && userAdmin.userRole === 'admin']);

	return (
		<div>
			<AccountContext.Provider value={'coursesListId'}>
				<Router>
					<Navbar
						user={user}
						isLoggedIn={isLoggedIn}
						getUser={getUser}
						userAdmin={userAdmin}
						renderAdmin={renderAdmin}
					/>
					<Switch>
						<Route
							exact
							path="/Signin"
							component={() => (
								<Signin getUser={getUser} renderAdmin={renderAdmin} />
							)}
						/>
						<Route exact path="/Profile" component={Profile} />
						<Route exact path="/" component={Homepage} />
						<Route exact path="/Signup" component={Signup} />
						<Route exact path="/Courses" component={Courses} />
						{userAdmin && userAdmin.userRole === 'admin' && (
							<Route
								exact
								path="/Courses/Videos/AddVideo/:courseId"
								component={AddVideo}
							/>
						)}
						{userAdmin && userAdmin.userRole === 'admin' && (
							<Route exact path="/Courses/AddCourse" component={AddCourse} />
						)}
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
