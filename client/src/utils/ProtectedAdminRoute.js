import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getUserStatus, isUserAdmin } from '../features/auth/authSlice';

const ProtectedAdminRoute = () => {
   const userStatus = useSelector(getUserStatus);
   const isAdmin = useSelector(isUserAdmin);
   let location = useLocation();

   if (userStatus === 'loading') return <div className="loader">Loading...</div>;
   if (userStatus === 'succeeded') {
      return isAdmin ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
   }
};

export default ProtectedAdminRoute;
