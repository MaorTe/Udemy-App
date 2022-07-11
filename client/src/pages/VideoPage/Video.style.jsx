import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

export const VideoContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 10px;
   margin-top: 50px;
`;
export const PlayerWrapper = styled.div`
   max-width: 100%;
   position: relative;
`;

export const VideoLinkBtn = styled.button`
   width: 100%;
   padding: 15px 5px;
   border: none;
   outline: none;
   text-align: left;
   cursor: pointer;
   font-size: 16px;
   background: #fff;
   &:hover {
      /* background: #dee5e5; */
      background: #f4f4f4;
   }
`;

export const UpperPageContainer = styled.div`
   /* display: grid;
	grid-template-columns: 1fr 4fr 1fr;
	grid-template-rows: 1fr 4fr 1fr; */
   /* height: 100vh; */
   display: grid;
   grid-template-columns: 1fr 4fr 1fr;
   grid-template-rows: 5fr 1fr;
   grid-column-gap: 2px;
   grid-row-gap: 0px;
   height: 92vh;
`;
export const LowerPageContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   margin-bottom: 237px;
   align-items: center;
   height: 100%;
   /* background: rgb(240, 240, 240); */
   overflow-y: auto;
   grid-area: 2 / 2 / 3 / 3;
`;
export const CommentContainer = styled(VideoContainer)`
   grid-area: 1 / 1 / 3 / 2;
   flex-direction: column;
   margin-top: 0px;
   justify-content: flex-start;
   align-items: center;
   background: rgb(240, 240, 240);
   /* border: 1px solid green; */
`;

export const VideoPageContainer = styled.div`
   /* width: 75vw; */
   /* height: 'calc(100vh-69px)'; */
   grid-area: 1 / 2 / 2 / 3;
   position: relative;
`;

const anim_lineUp = keyframes`
	0% {
	  opacity: 0;
	  transform: translateY(80%);
	}
	20% {
	  opacity: 0;
	}
	50% {
	  opacity: 1;
	  /* color:pink; */
	  transform: translateY(0%);
	}
	100% {
	  opacity: 1;
	  transform: translateY(0%);
	}`;

export const UserLoginMessage = styled.h2`
   width: 400px;
   /* height: 600px; */
   /*Can also be fixed*/
   position: absolute;
   text-align: center;
   left: 0;
   right: 0;
   top: 50%;
   bottom: 43%;
   margin: auto;
   /*Solves a problem in which the content is being cut when the div is smaller than its' wrapper:*/
   max-width: 100%;
   max-height: 100%;
   overflow: auto;
   animation: ${anim_lineUp} 3.5s ease-out infinite;
`;

export const videosMenuTitle = styled.h3`
   margin-bottom: 20px;
   margin-top: 5x;
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 5px;
   padding-left: 0px;
`;
export const VideosMenuContainer = styled.div`
   /* width: 25vw; */
   /* height: 'calc(100vh-69px)'; */
   grid-area: 1 / 3 / 3 / 4;
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   padding-bottom: 20px;
   border-bottom: 2px solid #555;
   /* height: ${(props) => props.containerHeight && props.containerHeight}; */
   overflow-y: ${(props) => props.containerHeight && 'auto'};

   background: rgb(240, 240, 240);
   border-radius: 10px;
   /* padding: 20px 0px; */
   /* line-height: 2.7rem; */
   transition: all 0.3s ease 0s;

   div:not(:last-child) {
      border: 1px solid #bdbdbd8a;
   }
`;

export const Commentbody = styled.textarea`
   resize: none;
   width: 300px;
   margin-top: 15px;
   border-radius: 7px;
   padding: 10px;
`;

export const PostCommentBtn = styled.button`
   padding: 4px 12px;
   border: none;
   outline: none;
   border-radius: 10px;
   background: #384a68;
   color: #fff;
   transition: 0.3s all;
   /* width: 120px; */
   margin: 10px 0px 22px;
   &:hover {
      box-shadow: 0px 0px 8px 0px #333;
   }
`;
export const ControlsWrapper = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background: rgba(0, 0, 0, 0.6);
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   z-index: 1;
`;
export const NavLink = styled(Link)`
   display: block;
   padding: 20px;
   text-decoration: none;
   color: #000;
   font-family: sans-serif;
   font-size: 1rem;
   &:hover {
      color: #bbbbc1;
      background: #303a62;
   }
   &:focus {
      color: #bbbbc1;
      background: #201f32;
   }
`;

/* Top controls */
export const TopControlsContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;
   padding: 16px;
`;
export const VideoTitle = styled.h5`
   color: '#fff';
`;

export const BookMarkBtn = styled.button`
   color: blue;
`;

export const CommentsWrapper = styled.div`
   overflow-y: auto;
   height: 100%;
   max-height: 900px;
   max-width: 100%;
   width: 300px;
`;
