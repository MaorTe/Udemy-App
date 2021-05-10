import { Link } from 'react-router-dom';
// import AddOrRemoveBtn from './AddOrRemoveBtn';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const CourseCard = ({
	title,
	poster,
	id,
	type,
	onButtonClick,
	width,
	height,
}) => {
	return (
		<div className="movie-card-container">
			<Link to={`/`}>
				<LazyLoadImage
					alt={'a'}
					src={poster} // use normal <img> attributes as props
					width={width}
					height={height}
					className="img-select"
					// height={100}
				/>
			</Link>
			<div className="font-small">{title}</div>
			{/* <AddOrRemoveBtn
				id={id}
				title={title}
				poster={poster}
				type={type}
				onButtonClick={onButtonClick}
			/> */}
		</div>
	);
};

export default CourseCard;
