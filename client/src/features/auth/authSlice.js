import { createSlice } from '@reduxjs/toolkit';
import { registerUser, userLogin, fetchUser } from './authActions';

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

const initialState = {
   loading: false,
   userInfo: null,
   isAdmin: false,
   userToken,
   error: null,
   success: false,
   status: 'idle',
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logout: (state) => {
         localStorage.removeItem('userToken'); // delete token from storage
         return initialState;
      },
      setCredentials: (state, { payload }) => {
         state.userInfo = payload;
      },
      updateUserCourses(state, { payload }) {
         state.userInfo.courses = payload;
      },
   },
   extraReducers(builder) {
      builder
         .addCase(userLogin.pending, (state, action) => {
            state.status = 'loading';
            state.loading = true;
            state.error = null;
         })
         .addCase(userLogin.fulfilled, (state, { payload }) => {
            state.status = 'succeeded';
            state.loading = false;
            state.userInfo = payload;
            state.isAdmin = payload.userRole === 'admin';
            state.userToken = payload.token;
         })
         .addCase(userLogin.rejected, (state, { payload }) => {
            state.status = 'failed';
            state.loading = false;
            state.error = payload;
            // state.error = action.error.message;
         })

         // register user
         .addCase(registerUser.pending, (state) => {
            state.status = 'loading';
            state.loading = true;
            state.error = null;
         })
         .addCase(registerUser.fulfilled, (state, { payload }) => {
            state.status = 'succeeded';
            state.loading = false;
            state.success = true; // registration successful
         })
         .addCase(registerUser.rejected, (state, { payload }) => {
            state.status = 'failed';
            state.loading = false;
            state.error = payload;
         })

         .addCase(fetchUser.pending, (state, action) => {
            state.status = 'loading';
         })
         .addCase(fetchUser.fulfilled, (state, { payload }) => {
            state.status = 'succeeded';
            state.loading = false;
            state.success = true;
            state.userInfo = payload;
            state.isAdmin = payload.userRole === 'admin';
            state.userToken = localStorage.getItem('userToken');
         })
         .addCase(fetchUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
         });
   },
});

export const getUserStatus = (state) => state.auth.status;
export const getUserError = (state) => state.auth.error;
export const selectUser = (state) => state.auth.userInfo;
export const isUserAdmin = (state) => state.auth.isAdmin;
export const token = (state) => state.auth.userToken;
export const isLoggedIn = ({ auth }) =>
   auth.success === true && auth.status === 'succeeded' && token;

export const { logout, setCredentials, updateUserCourses } = authSlice.actions;

export default authSlice.reducer;
