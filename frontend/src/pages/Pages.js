import { RestaurantList } from "../components/RestaurantList/RestaurantList";
import { PageNav } from "../components/Navigator/Navigator";
import { FilterBox } from "../components/Filters/Filters";
import { useParams, useNavigate } from "react-router-dom";
import { useCuisine, useRestaurant } from "../tools/useData";
import "./Pages.css";

export function Restaurants({ data, filters, setFilters }) {
	const cuisines = useCuisine();
	return (
		<section>
			<div className="restaurants-main-page">
				<FilterBox
					filters={filters}
					setFilters={setFilters}
					totalResults={data.total_results}
					cuisines={cuisines}
				/>
				<RestaurantList restaurants={data.restaurants} />
			</div>
			<PageNav filters={filters} setFilters={setFilters} data={data} />
		</section>
	);
}

export function Homepage() {
	return (
		<section>
			<h1>Home page</h1>
		</section>
	);
}

export function About() {
	return (
		<section>
			<h1>About page</h1>
		</section>
	);
}

export function notFound404() {
	return <h1>Not Found</h1>;
}

function convertToDms(float, type) {
	if (!float) {
		let direction = "";
		if (type === "lat") {
			direction = float < 0 ? "S" : "N";
		} else {
			direction = float < 0 ? "W" : "E";
		}
		float = Math.abs(float);
		const decimal = Math.floor(float);
		const temp = (float - decimal) * 60;
		const minute = Math.floor(temp);
		const second = Math.floor((temp - minute) * 60);

		return [decimal, minute, second, direction];
	}
}

export function Restaurant() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [data, error] = useRestaurant(id);
	let longDMS = [];
	let latDMS = [];
	if (data) {
		const [longitude, latitude] = data.address.coord;
		longDMS = convertToDms(longitude);
		latDMS = convertToDms(latitude);
	}

	return (
		<section>
			<h1>{id}</h1>
			{error && <h1>fucking error man</h1>}
			{data && (
				<a
					href={`https://www.google.com/maps/place/${latDMS[0]}%C2%B0${latDMS[1]}'${latDMS[2]}.0%22${latDMS[3]}+${longDMS[0]}%C2%B0${longDMS[1]}'${longDMS[2]}.0%22${longDMS[3]}/`}
					target="_blank"
					rel="noreferrer"
				>
					fixed
				</a>
			)}
			<a
				href="https://www.google.com/maps/place/40%C2%B034'46.8%22N+73%C2%B058'57.0%22W/"
				target="_blank"
				rel="noreferrer"
			>
				relative
			</a>
			<button onClick={() => navigate(-1)}>go back</button>
		</section>
	);
}
