import {
	BigCircle,
	Circles,
	CirclesParagraph,
	MedCircle,
	PageContainer,
	ParagraphSmall,
	SmallCircle,
	Title,
	url,
} from './NotFound.style';

const NotFound = () => {
	return (
		<>
			<PageContainer></PageContainer>
			<Title>404 &bull; Error Page</Title>
			<Circles>
				<CirclesParagraph>
					404 <br></br>
					<ParagraphSmall> PAGE NOT FOUND</ParagraphSmall>
				</CirclesParagraph>
				<BigCircle></BigCircle>
				<MedCircle></MedCircle>
				<SmallCircle></SmallCircle>
			</Circles>
		</>
	);
};

export default NotFound;
