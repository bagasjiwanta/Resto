import "./RestaurantCard.css";
import { Link } from "react-router-dom";
const imageLinks = {
	0: "https://drive.google.com/uc?export=view&id=1GfvjKNr6jKV__HLKOT781kz_TT8NpZDB",
	1: "https://drive.google.com/uc?export=view&id=1hPOt7CKAuhEmSQa8UIKYKZ5QG51FyyNa",
	2: "https://drive.google.com/uc?export=view&id=1Iq1R_Gg4gASrof_aTj5OqOuNfic2vaQ2",
	3: "https://drive.google.com/uc?export=view&id=1G9HQwguHDxth88Wd0AfYZ-o83qOQjCwd",
	4: "https://drive.google.com/uc?export=view&id=1smJj7xYXwKCV1_ownJ3YWdWLAaFvL8kH",
	5: "https://drive.google.com/uc?export=view&id=1GvWl9YKhNlCFt8OyUjy3H3QcOznMGFDT",
	6: "https://drive.google.com/uc?export=view&id=16zjSzzeEByDW9-q_4Vgz7Gzfu6dPtrfV",
	7: "https://drive.google.com/uc?export=view&id=1uKAhKdD3hcRLYdEA-79iT0XbkWzcM_bg",
	8: "https://drive.google.com/uc?export=view&id=1QjT7a7TA9CqfAeiB2XH9QWUSw-t_c8Uf",
	9: "https://drive.google.com/uc?export=view&id=1uPIqzc9F8DYxSZlpN0ZZ3D0-MnJoFEHz",
};
function CuisineTags({ text }) {
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
