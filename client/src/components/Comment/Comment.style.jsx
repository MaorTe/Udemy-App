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

export const Meta = styled.div`
	font-weight: bold;
`;

export const Commentbody = styled.textarea`
	resize: none;
`;
