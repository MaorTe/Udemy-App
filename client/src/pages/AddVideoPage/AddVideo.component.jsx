import React, { useState } from 'react';
import * as S from './AddVideo.style';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { addVideo } from './../../features/videos/videoActions';
import { ToastContainer, toast } from 'react-toastify';
import Marginer from '../../components/Marginer/Marginer';
const AddVideo = () => {
   const { courseId } = useParams();
   const dispatch = useDispatch();

   const [videoInfo, setVideoInfo] = useState({
      videoLink: '',
      videoTitle: '',
      videoDescription: '',
      courseId: courseId,
   });

   const canSave = [
      videoInfo.videoLink,
      videoInfo.videoTitle,
      videoInfo.videoDescription,
      videoInfo.courseId,
   ].every(Boolean);

   const addNewVideo = async () => {
      dispatch(addVideo(videoInfo))
         .unwrap()
         .then((res) => {
            toast.success('Successfully added video');
            setVideoInfo({
               videoLink: '',
               videoTitle: '',
               videoDescription: '',
               courseId: courseId,
            });
         })
         .catch((error) => {
            toast.error('Failed to add video');
         });
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
         <S.SubmitButton type="submit" disabled={!canSave} onClick={() => addNewVideo()}>
            Create Video
         </S.SubmitButton>
         <ToastContainer autoClose={2000} />
      </S.BoxContainer>
   );
};
export default AddVideo;
