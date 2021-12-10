import { RestaurantList } from "../components/RestaurantList/RestaurantList";
import { PageNav } from "../components/Navigator/Navigator";
import { FilterBox } from "../components/Filters/Filters";
import { useParams, useNavigate } from "react-router-dom";
import { useCuisine, useRestaurant } from "../tools/useData";
import { imageLinks } from "../tools/useData";
import homepageConf from "./homepageSection.json";
import "./Pages.css";
import { useEffect, useState } from "react";
import { CuisineTags } from "../components/RestaurantCard/RestaurantCard";

export function Restaurants({ data, filters, setFilters }) {
	const cuisines = useCuisine();
	return (
		<section className="restaurants-container">
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

function HomepageSection({ config }) {
	const { imageFirst, greyBg, imgUrl, title, description } = config;
	const [isDesktop, setIsDesktop] = useState(true);
	const calcViewport960 = () => window.innerWidth > 960;
	useEffect(() => {
		setIsDesktop(calcViewport960());
		window.addEventListener("resize", calcViewport960);
		window.removeEventListener("resize", calcViewport960);
	}, []);

	return (
		<div
			className="homepage-section"
			style={{
				flexDirection: isDesktop && imageFirst && "row-reverse",
				backgroundColor: greyBg && "var(--slight-grey)",
			}}
		>
			<div className={`homepage-section-text ${!imageFirst && "rtl"}`}>
				<h1 className="homepage-section-text-title">{title}</h1>
				<p>{description}</p>
			</div>
			<div>
				<img src={imgUrl} alt="homepage" className="homepage-section-image" />
			</div>
		</div>
	);
}

export function Homepage() {
	return (
		<section className="homepage">
			<h1 className="homepage-welcome-title">Welcome to Resto</h1>
			<HomepageSection config={homepageConf.homepage1} key={1} />
			<HomepageSection config={homepageConf.homepage2} key={2} />
			<HomepageSection config={homepageConf.homepage3} key={3} />
		</section>
	);
}

export function About() {
	return (
		<section className="about">
			<br></br>
			<h1>About Resto</h1>
			<p>
				<i>
					Just an imaginary company, created by{" "}
					<a
						href="https://github.com/bagasjiwanta/"
						target="_blank"
						rel="noreferrer"
					>
						bagasjiwanta
					</a>
					<br></br>
					as a personal project.{" "}
					<a
						href="https://github.com/bagasjiwanta/Resto"
						target="_blank"
						rel="noreferrer"
					>
						Github source code here
					</a>
				</i>
			</p>
			<div>
				<ol>
					<p>Built using : </p>
					<li>ReactJs</li>
					<li>Vanilla css</li>
					<li>Mongodb</li>
				</ol>
				<ol>
					<p>Features implemented : </p>
					<li>Routing</li>
					<li>Reusable components</li>
					<li>Responsive design</li>
					<li>API calls</li>
					<li>Deployment</li>
					<li>And more :)</li>
				</ol>
			</div>
		</section>
	);
}

export function notFound404() {
	return <h1>Not Found</h1>;
}

function convertToDms(float, type) {
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

	return `${decimal}%C2%B0${minute}'${second}.0%22${direction}`;
}

export function Restaurant() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [data, loading] = useRestaurant(id);
	const [gmapUrl, setGmapUrl] = useState();
	const words = ["good", "decent", "comfy", "delightful", "luxurious"];

	useEffect(() => {
		if (data) {
			const [longitude, latitude] = data.address.coord;
			let longDMS = convertToDms(longitude["$numberDouble"], "long");
			let latDMS = convertToDms(latitude["$numberDouble"], "lat");
			setGmapUrl(`https://www.google.com/maps/place/${longDMS}+${latDMS}/`);
		}
	}, [data]);

	return (
		!loading && (
			<section className="restaurant-container">
				<img
					src={imageLinks.banner}
					alt="banner"
					className="restaurant-banner"
				/>
				<div className="restaurant">
					<img src={imageLinks["1"]} alt="logo" className="restaurant-logo" />
					<h2>{data.name}</h2>

					<h3>About the restaurant</h3>
					<p>
						A nice and {words[data.rating - 1]} restaurant located in{" "}
						{data.address.street}, {data.borough} {data.address.zipcode},
						building {data.address.building}. This restaurant serves any kind of{" "}
						{data.cuisine} foods / drinks. Very nice place if you are looking
						for treating yourself.
					</p>
					{gmapUrl && (
						<a href={gmapUrl} target="_blank" rel="noreferrer">
							View on google maps
							<img
								src="https://img.icons8.com/color/48/000000/google-maps-new.png"
								alt="gmaps"
							/>
						</a>
					)}
					<h3>Grades</h3>
					<ul style={{ width: "15em" }}>
						{data.grades &&
							data.grades.map((value, index) => {
								return (
									<li key={index}>
										<CuisineTags
											text={`Grade ${value.grade}${
												value.score["$numberInt"]
											}, ${new Date(
												parseInt(value.date["$date"]["$numberLong"])
											).getUTCFullYear()}`}
										/>
									</li>
								);
							})}
					</ul>
				</div>
				<button onClick={() => navigate(-1)}>go back</button>
			</section>
		)
	);
}
