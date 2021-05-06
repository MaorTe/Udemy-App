import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar.component';
import Homepage from './pages/Homepage.component';
import NotFound from './pages/NotFound.component';
import Signin from './pages/Signin.component';
import Signup from './pages/Signup.component';
import { useEffect } from 'react';
// import MovieDetails from './pages/MovieDetails.component';
// import SearchResults from './pages/SearchResults.component';
// import Categories from './pages/Categories.component';

function App() {
	useEffect(() => {
		const createLocalStorage = () => {
			if (!Array.isArray(JSON.parse(localStorage.getItem('tableData')))) {
				localStorage.setItem('tableData', JSON.stringify([]));
			}
		};
		createLocalStorage();
	}, []);

	return (
		<div>
			<Router>
				<Navbar />
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
		</div>
	);
}
export default App;
