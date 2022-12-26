import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isUserAdmin } from './features/auth/authSlice';
import Navbar from './components/NavBar/Navbar.component';
import NotFound from './pages/NotFound/NotFound.component';
import Homepage from './pages/Homepage/Homepage.component';
import FavoriteCourses from './pages/FavCourses/FavCourses.component';
import Profile from './pages/Profile/Profile.component';
import Video from './pages/VideoPage/Video.component';
import AddVideo from './pages/AddVideoPage/AddVideo.component';
import AddCourse from './pages/AddCourse/AddCourse.component';
import SignUp from './pages/SignUp.component';
import SignIn from './pages/SignIn.component';
import useAuth from './features/auth/useAuth';
import ProtectedRoute from './utils/ProtectedRoute';
import ProtectedAdminRoute from './utils/ProtectedAdminRoute';

function App() {
   const [user] = useAuth('init');
   const isAdmin = useSelector(isUserAdmin);

   return (
      <div>
         <Navbar user={user} />
         <Routes>
            <Route exact path="/SignIn" element={<SignIn />} />
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/SignUp" element={<SignUp />} />
            <Route exact path="/Courses/:courseName/Videos/:courseId" element={<Video />} />

            <Route element={<ProtectedRoute />}>
               <Route exact path="/Profile" element={<Profile />} />
               <Route exact path="/Courses" element={<FavoriteCourses />} />

               <Route element={<ProtectedAdminRoute />}>
                  <Route exact path="/Courses/Videos/AddVideo/:courseId" element={<AddVideo />} />
                  <Route exact path="/Courses/AddCourse" element={<AddCourse />} />
               </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
         </Routes>
      </div>
   );
}
export default App;
