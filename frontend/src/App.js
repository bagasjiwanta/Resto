import links from "./Links.json";
import "./app.css";

function Tags({ type, text }) {
	return (
		<span
			style={{
				padding: "0.4em",
				backgroundColor: `var(--${type === "cuisine" ? "pink" : "yellow"})`,
				borderRadius: "4px",
				fontWeight: "600",
				fontStyle: "italic",
				margin: "0 1em",
			}}
		>
			{text}
		</span>
	);
}

function RestaurantCard({ imageIndex, title, rating, cuisine }) {
	return (
		<div className="restaurant-card">
			<img src={links[imageIndex]} alt="restaurant"></img>
			<h2>{title}</h2>
			<p style={{ margin: "0.2em 0 1.2em 0" }}>
				<Tags text="5 star" type="rating" />
				<Tags text="American" type="cuisine" />
			</p>
		</div>
	);
}

function App() {
	return (
		<div className="app">
			<section className="restaurant-page">
				<RestaurantCard imageIndex={1} title="Montreau Avenue" />
				<RestaurantCard imageIndex={2} title="Taco Bell" />
				<RestaurantCard imageIndex={3} title="Chipotle" />
				<RestaurantCard imageIndex={4} title="Mc Donald's" />
				<RestaurantCard imageIndex={5} title="KFC" />
				<RestaurantCard imageIndex={6} title="Men Tempeh" />
				<RestaurantCard imageIndex={7} title="Bali Bakery" />
				<RestaurantCard imageIndex={8} title="Paris" />
				<RestaurantCard imageIndex={9} title="Ngakak banget" />
			</section>
		</div>
	);
}

export default App;
