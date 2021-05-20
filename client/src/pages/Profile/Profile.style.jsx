import styled from 'styled-components';
import { Link } from 'react-router-dom';

// export const BoxContainer = styled.div`
// 	display: grid;
// 	grid-template-columns: 2fr auto;
// 	grid-template-rows: 2fr auto;
// `;

// *{
//   font-family: 'Josefin Sans', sans-serif;
// }
export const PageContainer = styled.div`
	/* background-color: #f3f3f3; */
	/* transform: scale(1.5); */
	/* display: flex;
	justify-content: center;
	align-items: center;
	top: 50%; */
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const FileInput = styled.input`
	display: none;
`;
export const SaveBtn = styled.button`
	padding: 2px 10px;
	border: none;
	outline: none;
	border-radius: 10px;
	background: #384a68;
	color: #fff;
	transition: 0.3s all;
	width: 120px;
	margin: 5px 0;
	&:hover {
		box-shadow: 0px 0px 8px 0px #333;
	}
`;
export const UploadBtn = styled(SaveBtn)`
	white-space: pre;
	width: 120px;
`;
export const CardWrapper = styled.div`
	/* position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%); */
	transform: scale(1.7);
	width: 600px;
	display: flex;
	box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
`;

export const CardWrapperLeft = styled.div`
	width: 50%;
	/* background: linear-gradient(to right, #01a9ac, #01dbdf); */
	/* background: linear-gradient(to right, #9fadad, #01dbdf); */
	padding: 30px 25px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	text-align: center;
	color: #fff;
`;

export const ImageBorder = styled.div`
	border-radius: 5px;
	margin-bottom: 10px;
	img {
		border-radius: 50%;
		width: 200px;
		height: 200px;
		object-fit: cover;
	}
`;

export const UserTitle = styled.h4`
	margin-bottom: 10px;
`;

export const CardWrapperRight = styled.div`
	width: 65%;
	background: #fff;
	padding: 30px 25px;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
`;

export const CardWrapperRightInfo = styled.div`
	margin-bottom: 25px;
`;

export const InfoTitle = styled.h3`
	margin-bottom: 15px;
	padding-bottom: 5px;
	border-bottom: 1px solid #e0e0e0;
	color: #353c4e;
	text-transform: uppercase;
	letter-spacing: 5px;
`;

export const InfoData = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const InfoDataContent = styled.div`
	width: 45%;
`;

export const EmailTitle = styled.h4`
	color: #353c4e;
	margin-bottom: 5px;
`;

export const EmailParagraph = styled.p`
	font-size: 13px;
	margin-bottom: 10px;
	color: #919aa3;
`;
