import React, { useState } from 'react';
import * as S from './AddVideo.style';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { addVideo, videosStatus, videosError } from '../../features/videos/videosSlice';
import { useAuth } from './../../features/auth/useAuth';
import Marginer from '../../components/Marginer/Marginer';

const AddVideo = () => {
   const { courseId } = useParams();
   const [, , dispatch] = useAuth();

   const videoStatus = useSelector(videosStatus);
   const error = useSelector(videosError);

   const [videoInfo, setVideoInfo] = useState({
      videoLink: '',
      videoTitle: '',
      videoDescription: '',
      courseId: courseId,
   });

   const addNewVideo = async () => {
      dispatch(addVideo(videoInfo));
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
         <S.SubmitButton type="submit" onClick={() => addNewVideo()}>
            Create Video
         </S.SubmitButton>
      </S.BoxContainer>
   );
};
export default AddVideo;
