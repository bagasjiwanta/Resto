import "./RestaurantCard.css";
import { Link } from "react-router-dom";
import { imageLinks } from "../../tools/useData";

export function CuisineTags({ text }) {
	return <span className="restaurant-tag restaurant-tag-cuisine">{text}</span>;
}

const bg = [
	"red-pastel",
	"orange-pastel",
	"yellow-pastel",
	"lime-pastel",
	"green-pastel",
];

function RatingTags({ text = "2" }) {
	return (
		<span
			className="restaurant-tag"
			style={{ backgroundColor: `var(--${bg[Number(text) - 1]})` }}
		>
			{`${text} star`}
		</span>
	);
}

export function RestaurantCard({
	restaurantId,
	imageIndex,
	title,
	rating,
	cuisine,
	zipcode,
	borough,
}) {
	return (
		<Link to={`/restaurants/id/${restaurantId}`} className="restaurant-card-a">
			<div className="restaurant-card">
				<img
					src={imageLinks[imageIndex]}
					alt="restaurant"
					className="restaurant-card-img"
				></img>
				<h3 className="restaurant-card-title">{title}</h3>
				<p className="restaurant-tags">
					<RatingTags text={`${rating}`} />
					<CuisineTags text={cuisine} />
					<br></br>
					<span>{`${zipcode}, ${borough}`}</span>
				</p>
			</div>
		</Link>
	);
}
