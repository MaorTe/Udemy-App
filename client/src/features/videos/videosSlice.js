import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../API/api';

const initialState = {
   videos: [],
   status: 'idle',
   error: null,
};

const token = localStorage.getItem('userToken');
// Thunk functions

export const addVideo = createAsyncThunk('videos/addNewVideo', async (videoInfo) => {
   const response = await api.post('/video/addvideo', videoInfo, {
      headers: { Authorization: token },
   });
   return response.data;
});

export const fetchVideos = createAsyncThunk('videos/fetchVideos', async (courseId) => {
   const response = await api.get(`/video/courses/${courseId}`, {
      headers: { Authorization: token },
   });
   return response.data;
});
// state slice
const videosSlice = createSlice({
   name: 'videos',
   initialState,
   reducers: {},
   extraReducers(builder) {
      builder
         .addCase(addVideo.pending, (state, action) => {
            state.status = 'loading';
         })
         .addCase(addVideo.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.videos = action.payload;
         })
         .addCase(addVideo.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
         })

         .addCase(fetchVideos.pending, (state, action) => {
            state.status = 'loading';
         })
         .addCase(fetchVideos.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.videos = action.payload;
         })
         .addCase(fetchVideos.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
         });
   },
});

export const videosStatus = (state) => state.videos.status;
export const videosError = (state) => state.videos.error;
export const selectAllVideos = (state) => state.videos.videos;
export const selectVideoId = (state) => state.videos.videos[0]?._id;

// export const {} = videosSlice.actions;

export default videosSlice.reducer;
