import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar.component';
import Homepage from './pages/Homepage/Homepage.component';
import NotFound from './pages/NotFound/NotFound.component';
import Signin from './pages/Signin.component';
import Signup from './pages/Signup.component';
import Logout from './pages/Logout/Logout.component';
import { useEffect, useState } from 'react';
import { AccountContext } from './components/accountBox/accountContext';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(-1);
	useEffect(() => {
		const createLocalStorage = () => {
			if (!Array.isArray(JSON.parse(localStorage.getItem('localData')))) {
				localStorage.setItem('localData', JSON.stringify([]));
			}
		};
		createLocalStorage();
	}, []);

	useEffect(() => {
		const isTokenExists = () => {
			const localData = JSON.parse(localStorage.getItem('localData'));
			if (localData) {
				const isTokenExist = localData.findIndex((el) => el.token && el);
				setIsLoggedIn(isTokenExist);
				console.log(isLoggedIn);
			}
		};
		isTokenExists();
	}, [isLoggedIn]);

	return (
		<div>
			<AccountContext.Provider value={isLoggedIn}>
				<Router>
					<Navbar isTokenExist={isLoggedIn} />
					<Switch>
						{/* <Route
						path="/dashboard"
						render={(props) => <Homepage {...props} topRated={data} />}
					/> */}
						<Route
							exact
							path="/"
							component={Homepage}
							// component={() => <Homepage movieData={topRatedMovies} />}
						/>
						<Route exact path="/Signin" component={Signin} />
						<Route exact path="/Signup" component={Signup} />
						<Route exact path="/Logout" component={Logout} />
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
