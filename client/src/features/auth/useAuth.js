import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './authActions';
import { selectUser, token } from './authSlice';

export const useAuth = (init) => {
   const user = useSelector(selectUser);
   const userToken = useSelector(token);
   const dispatch = useDispatch();

   //fetch user to check for token
   useEffect(() => {
      if (init && userToken) {
         dispatch(fetchUser());
      }
   }, [dispatch, userToken]);

   return [user, userToken, dispatch];
};

export default useAuth;
