import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isUserAdmin } from './features/auth/authSlice';
import Navbar from './components/NavBar/Navbar.component';
import NotFound from './pages/NotFound/NotFound.component';
import Homepage from './pages/Homepage/Homepage.component';
import Courses from './pages/Courses/Courses.component';
import Profile from './pages/Profile/Profile.component';
import Video from './pages/VideoPage/Video.component';
import AddVideo from './pages/AddVideoPage/AddVideo.component';
import AddCourse from './pages/AddCourse/AddCourse.component';
import SignUp from './pages/SignUp.component';
import SignIn from './pages/SignIn.component';
import useAuth from './features/auth/useAuth';

function App() {
   const [user, userToken] = useAuth();
   const isAdmin = useSelector(isUserAdmin);
   // const userStatus = useSelector(getUserStatus);
   // const error = useSelector(getUserError);

   return (
      <div>
         <Router>
            <Navbar user={user} userToken={userToken} isAdmin={isAdmin} />
            <Switch>
               <Route exact path="/SignIn" component={SignIn} />
               <Route exact path="/Profile" component={Profile} />
               <Route exact path="/" component={Homepage} />
               <Route exact path="/SignUp" component={SignUp} />
               <Route exact path="/Courses" component={Courses} />
               <Route exact path="/Courses/:courseName/Videos/:courseId" component={Video} />
               {isAdmin ? (
                  <Switch>
                     <Route exact path="/Courses/Videos/AddVideo/:courseId" component={AddVideo} />
                     <Route exact path="/Courses/AddCourse" component={AddCourse} />
                  </Switch>
               ) : (
                  <Redirect to="/" />
               )}

               {/*<Route
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
