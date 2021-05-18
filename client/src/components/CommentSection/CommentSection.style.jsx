import styled from 'styled-components';
// $dark-grey: #404040;
// $nc-blue: #00BDFC;
// $nc-bl-dark: #0093C4;
// $red: #FC3F00;

// body {
//   font-family: 'PT Sans', sans-serif;
//   padding: 2rem;
// }

//button
export const Button = styled.button`
	border: none;
	border-radius: 0.25rem;
	font-size: 0.75rem;
	font-weight: bold;
	padding: 0.75em; // 12px/16px
	display: inline-block;
	text-decoration: none;

	&:hover {
		cursor: pointer;
	}
	&:focus {
		text-decoration: none;
		outline: none;
	}
`;
// .comment-box {
export const CommentBox = styled.div`
	max-width: 37.5rem;
	color: #fff;
	background-color: #909090;
	border-radius: 0.875rem;
	padding: 0.2rem 1rem 2rem;
`;

// .comment-form {
export const CommentForm = styled.form`
	background-color: #fff;
	border-radius: 0.25rem;
	margin-bottom: 2rem;
	padding: 1rem;
`;

// .comment-form-fields {
export const CommentFormFields = styled.div`
	margin-bottom: 0.25rem;
	input,
	textarea {
		border: none;
		/* border-bottom: 1px solid $dark-grey; */
		border-bottom: 1px solid #404040;
		font-size: 0.85rem;
		padding: 0.25rem 0;
		width: 99%;

		&:focus {
			/* border-bottom-color: $nc-blue; */
			border-bottom-color: #00bdfc;
			outline: none;
		}
	}
	textarea {
		font-style: italic;
	}
`;

//was empty
// .comment-form-actions {
// }

/* .comment-count { */
export const CommentCount = styled.h4`
	/* color: $dark-grey; */
	color: #404040;
`;

// #comment-reveal {
export const CommentReveal = styled.button`
	float: right;
	/* background-color: $nc-blue; */
	background-color: #00bdfc;
	color: #fff;
`;

// .comment {
export const Comment = styled.div`
	/* border-top: 0.125rem solid $dark-grey; */
	border-top: 0.125rem solid #404040;
`;

// .comment-body {
export const CommentBody = styled.p`
	font-style: italic;
	margin-left: 1rem;
`;

//   .comment-footer {
export const CommentFooter = styled.div`
	margin-bottom: 1rem;
`;

/* .comment-footer-delete { */
export const CommentFooterDelete = styled.a`
	padding: 0.2rem 0;
	/* color: $dark-grey; */
	color: #404040;
	text-decoration: none;

	&:hover {
		/* color: $nc-blue; */
		color: #00bdfc;
		font-weight: bold;
	}
`;
