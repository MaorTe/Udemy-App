import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar.component';
import NotFound from './pages/NotFound/NotFound.component';
import Homepage from './pages/Homepage/Homepage.component';
import api from './API/api';
import Courses from './pages/Courses/Courses.component';
import Profile from './pages/Profile/Profile.component';
import Video from './pages/VideoPage/Video.component';
import AddVideo from './pages/AddVideoPage/AddVideo.component';
import AddCourse from './pages/AddCourse/AddCourse.component';
import SignUp from './pages/SignUp.component';
import SignIn from './pages/SignIn.component';

function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [user, setUser] = useState(null);
   const [userAdmin, setUserAdmin] = useState(false);

   useEffect(() => {
      const token = localStorage.getItem('token');
      const fetchUser = async () => {
         try {
            const { data } = await api.get('users/me', {
               headers: { Authorization: token },
            });
            setUser(data);
            setIsLoggedIn(true);
            setUserAdmin(data.userRole === 'admin');
         } catch (e) {
            console.log(e.message);
         }
      };
      if (token) {
         fetchUser();
      }
   }, []);

   const getUser = ({ isAuthenticated, user, isAdmin }) => {
      setIsLoggedIn(!isLoggedIn);
      setUserAdmin(isAdmin);
   };

   return (
      <div>
         <Router>
            <Navbar user={user} isLoggedIn={isLoggedIn} getUser={getUser} userAdmin={userAdmin} />
            <Switch>
               <Route exact path="/SignIn" component={() => <SignIn getUser={getUser} />} />
               <Route exact path="/Profile" component={Profile} />
               <Route exact path="/" component={Homepage} />
               <Route exact path="/SignUp" component={SignUp} />
               <Route exact path="/Courses" component={Courses} />
               <Route exact path="/Courses/:courseName/Videos/:courseId" component={Video} />
               {userAdmin ? (
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
