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

export const PageContainer = styled.div`
	display: flex;
	flex-direction: row;
`;
export const VideoPageContainer = styled.div`
	width: 75vw;
	/* height: 'calc(100vh-69px)'; */
	border: 1px solid red;
`;
export const VideosMenuContainer = styled.div`
	width: 25vw;
	/* height: 'calc(100vh-69px)'; */
	border: 1px solid blue;
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

{
	/* Top controls */
}
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
