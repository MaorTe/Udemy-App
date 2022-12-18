import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './../../API/api';

export const userLogin = createAsyncThunk('user/login', async (loginInfo, { rejectWithValue }) => {
   // try {
   const { data } = await api.post(`users/login`, loginInfo);
   localStorage.setItem('userToken', data.token);
   return data;
   // } catch (error) {
   //    // return custom error message from API if any
   //    if (error.response && error.response.data.message) {
   //       return rejectWithValue(error.response.data.message);
   //    } else {
   //       return rejectWithValue(error.message);
   //    }
   // }
});

export const registerUser = createAsyncThunk(
   'user/register',
   async (userInfo, { rejectWithValue }) => {
      console.log(userInfo);
      // try {
      const response = await api.post(`users/register`, userInfo);
      console.log(response);
      return response;
      // } catch (error) {
      //    if (error.response && error.response.data.message) {
      //       return rejectWithValue(error.response.data.message);
      //    } else {
      //       return rejectWithValue(error.message);
      //    }
      // }
   },
);

export const fetchUser = createAsyncThunk('user/fetchUser', async (tag) => {
   const response = await api.get('users/me', {
      headers: { Authorization: localStorage.getItem('userToken') },
   });
   return response.data;
});
