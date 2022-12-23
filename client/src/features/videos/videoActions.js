import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../API/api';

// Thunk functions
export const addVideo = createAsyncThunk('videos/addNewVideo', async (videoInfo) => {
   const response = await axiosInstance.post('/video/addvideo', videoInfo);
   return response.data.video;
});

export const fetchVideos = createAsyncThunk('videos/fetchVideos', async (courseId) => {
   const response = await axiosInstance.get(`/video/courses/${courseId}`);
   return response.data;
});
