import { RestaurantCard } from "../RestaurantCard/RestaurantCard";
import "./RestaurantList.css";

export function RestaurantList({ restaurants = [] }) {
	return (
		<div className="restaurant-list">
			{restaurants &&
				restaurants.map((value, index) => (
					<RestaurantCard
						restaurantId={value._id}
						key={index}
						title={value.name}
						rating={value.rating["$numberDouble"]}
						cuisine={value.cuisine}
						zipcode={value.address.zipcode}
						borough={value.borough}
						imageIndex={index % 10}
					/>
				))}
		</div>
	);
}
