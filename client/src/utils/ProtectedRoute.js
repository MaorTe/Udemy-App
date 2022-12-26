import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectUser, token } from '../features/auth/authSlice';

const ProtectedRoute = () => {
   const user = useSelector(selectUser);
   const userToken = useSelector(token);
   let location = useLocation();

   // show unauthorized screen if no user is found in redux store
   if (!userToken && !user) {
      return <Navigate to="/SignIn" state={{ from: location }} replace />;
   }
   return <Outlet />;
};

export default ProtectedRoute;
