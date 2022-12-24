import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './../../API/api';

// Thunk functions
export const fetchUserFavoriteCourses = createAsyncThunk(
   'user/fetchUserFavoriteCourses',
   async () => {
      const response = await axiosInstance.get('/users/mycourses');
      return response.data;
   },
);

export const addFavoriteCourse = createAsyncThunk('user/addFavoriteCourse', async (id) => {
   const response = await axiosInstance.post('/users/addcourse', { id });
   return response.data;
});

export const removeFavoriteCourse = createAsyncThunk('user/removeFavoriteCourse', async (id) => {
   const response = await axiosInstance.patch('/users/deletecourse', { id });
   return response.data;
});

export const fileUpload = createAsyncThunk('user/profilePicture', async (selectedFile) => {
   const fd = new FormData();
   fd.append('avatar', selectedFile);

   const response = await axiosInstance.post(
      `/users/special/me/avatar`,
      fd,
      // TODO: progress-bar
      // {
      // 	onUploadProgress: (progressEvent) => {
      // 		console.log(
      // 			'Upload Progress: ' +
      // 				Math.round((progressEvent.loaded / progressEvent.total) * 100) +
      // 				'%'
      // 		);
      // 	},
      // },
      {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      },
   );
   return response;
});

// TODO: deleteUser
// export const deleteUser = createAsyncThunk('user/removeUser', async () => {
//    try {
//       const data = await axiosInstance.delete(`/users/me/avatar`);
//       return data.response;
//    } catch (e) {
//       console.log(e.message);
//    }
// });
