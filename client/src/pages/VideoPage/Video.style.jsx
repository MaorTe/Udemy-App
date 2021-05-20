import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
	border: 1px solid green;
	overflow-y: auto;
	grid-area: 2 / 2 / 3 / 3;
`;
export const CommentContainer = styled(VideoContainer)`
	grid-area: 1 / 1 / 3 / 2;
	flex-direction: column;
	margin-top: 0px;
	justify-content: flex-start;
	align-items: center;
	border: 1px solid green;
`;

export const VideoPageContainer = styled.div`
	/* width: 75vw; */
	/* height: 'calc(100vh-69px)'; */
	grid-area: 1 / 2 / 2 / 3;
`;
export const videosMenuTitle = styled.h3`
	margin-bottom: 20px;
	margin-top: 5x;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
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
`;

export const Commentbody = styled.textarea`
	resize: none;
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
