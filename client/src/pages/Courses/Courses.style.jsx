import styled from 'styled-components';

export const gridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(1, 1fr);
	grid-gap: 0.5rem;
	padding: 2rem;
	text-align: center;
	/* font-size: 4rem; */
	flex-wrap: wrap;
	justify-content: center;
	overflow: hidden;
`;
