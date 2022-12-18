import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './../../API/api';

export const userToken = localStorage.getItem('userToken');
// Thunk functions
export const fetchUserFavoriteCourses = createAsyncThunk(
   'user/fetchUserFavoriteCourses',
   async () => {
      if (userToken) {
         const response = await api.get('/users/mycourses', {
            headers: { Authorization: userToken },
         });
         return response.data;
      }
   },
);

export const addFavoriteCourse = createAsyncThunk('user/addFavoriteCourse', async (id) => {
   const response = await api.post(
      '/users/addcourse',
      { id },
      {
         headers: { Authorization: userToken },
      },
   );
   return response.data;
});

export const removeFavoriteCourse = createAsyncThunk('user/removeFavoriteCourse', async (id) => {
   const response = await api.patch(
      '/users/deletecourse',
      { id },
      {
         headers: { Authorization: userToken },
      },
   );
   return response.data;
});

export const fileUpload = createAsyncThunk('user/profilePicture', async (selectedFile) => {
   const fd = new FormData();
   fd.append('avatar', selectedFile);

   const response = await api.post(
      `/users/special/me/avatar`,
      fd,
      // TODO progress-bar
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
            Authorization: userToken,
            'Content-Type': 'multipart/form-data',
         },
      },
   );
   return response;
});

// TODO: deleteUserProfile
// export const deleteUserProfile = createAsyncThunk('user/removeFavoriteCourse', async () => {
//    try {
//       const data = await api.delete(`/users/me/avatar`, {
//          headers: {
//             Authorization: userToken,
//          },
//       });
//       return data.response;
//    } catch (e) {
//       console.log(e.message);
//    }
// });
