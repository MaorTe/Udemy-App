import styled from 'styled-components';

export const CommentWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding: 10px;
	width: 100%;
	img {
		border-radius: 50%;
		width: 50px;
		height: 50px;
		object-fit: cover;
		margin-right: 10px;
	}
`;

export const IconsContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
`;

export const EditIcon = styled.i`
	font-size: 18px;
	color: blue;
	margin: 5px;
	&:hover {
		transition: all 0.5s;
		transform: scale(1.4);
	}
`;
export const DeleteIcon = styled(EditIcon)`
	color: red;
`;
export const SaveIcon = styled(EditIcon)`
	color: green;
`;
export const CancelIcon = styled(EditIcon)`
	color: red;
`;

export const Meta = styled.div`
	font-weight: bold;
`;
export const CommentText = styled.div`
	flex-grow: 1;
	width: 100%;
	max-width: 300px;
	p {
		word-break: break-all;
	}
`;

export const Commentbody = styled.textarea`
	resize: none;
	width: 100%;
	padding: 3px 7px;
	border-radius: 9px;
	border: 1px solid lightgray;
	outline: none;
`;
