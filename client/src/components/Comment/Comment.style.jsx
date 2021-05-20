import React from 'react';
import styled from 'styled-components';

export const CommentWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

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
export const DeleteIcon = styled.i`
	font-size: 18px;
	color: red;
	margin: 5px;
`;
export const EditIcon = styled.i`
	font-size: 18px;
	color: blue;
	margin: 5px;
`;
export const SaveIcon = styled.i`
	font-size: 20px;
	color: green;
	margin: 5px;
`;
export const CancelIcon = styled.i`
	font-size: 20px;
	color: red;
	margin: 5px;
`;

export const Meta = styled.div`
	font-weight: bold;
`;
export const CommentText = styled.div`
	flex-grow: 1;
`;

export const Commentbody = styled.textarea`
	resize: none;
`;
