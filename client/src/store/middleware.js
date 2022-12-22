import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { userLogin } from './../features/auth/authActions';

// Create the middleware instance and methods
export const listenerMiddleware = createListenerMiddleware();

// Middleware to ensure that a user token is available to make requests
listenerMiddleware.startListening({
   matcher: isAnyOf(userLogin.fulfilled),
   effect: (action, listenerApi) => {
      localStorage.setItem('userToken', listenerApi.getState().auth.userToken);
   },
});
