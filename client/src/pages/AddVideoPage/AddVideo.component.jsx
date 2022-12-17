/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import api from '../../API/api';
import * as S from './AddVideo.style';
import { useParams } from 'react-router';
import { Marginer } from '../../components/marginer';
import { useDispatch, useSelector } from 'react-redux';
import { addVideo, videosStatus, videosError } from '../../features/videos/videosSlice';
import { useAuth } from './../../features/auth/useAuth';

const AddVideo = () => {
   const { courseId } = useParams();
   const [user, , dispatch] = useAuth();

   const videoStatus = useSelector(videosStatus);
   const error = useSelector(videosError);

   const [videoInfo, setVideoInfo] = useState({
      videoLink: '',
      videoTitle: '',
      videoDescription: '',
      courseId: courseId,
   });

   const addVideo = async () => {
      // try {
      // 	const token = localStorage.getItem('token');
      // const data = await api.post('/video/addvideo', videoInfo, {
      // 	headers: { Authorization: token },
      // });
      // } catch (e) {
      // 	console.log(e.message);
      // }
      if (videoStatus === 'idle') {
         dispatch(addVideo(videoInfo));
      }
   };

   const changeHandler = (e) => setVideoInfo({ ...videoInfo, [e.target.name]: e.target.value });
   return (
      <S.BoxContainer>
         <h1>Add new video</h1>
         <S.FormContainer>
            <S.Input
               value={videoInfo.videoLink}
               name={'videoLink'}
               onChange={changeHandler}
               type="text"
               placeholder="Video Link"
               required
            />
            <S.Input
               value={videoInfo.videoTitle}
               name={'videoTitle'}
               onChange={changeHandler}
               type="text"
               placeholder="Video title"
            />
            <S.Input
               value={videoInfo.videoDescription}
               name={'videoDescription'}
               onChange={changeHandler}
               type="text"
               placeholder="Video description"
            />
         </S.FormContainer>
         <Marginer direction="vertical" margin={10} />
         <S.SubmitButton type="submit" onClick={() => addVideo()}>
            Create Video
         </S.SubmitButton>
      </S.BoxContainer>
   );
};
export default AddVideo;
