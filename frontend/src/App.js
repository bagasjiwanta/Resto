import links from "./Links.json";
import "./app.css";
import { Routes, BrowserRouter, Route, Navigate, Link } from "react-router-dom";

function About() {
	return (
		<section>
			<h1>About page</h1>
		</section>
	);
}

function Navbar() {
	return (
		<nav className="navbar-container">
			<ul className="navbar">
				<li className="navbar-link">
					<Link to="/about">About</Link>
				</li>
				<li className="navbar-link">
					<Link to="/restaurants">Restaurants</Link>
				</li>
				<li className="navbar-link">
					<Link to="/home">Home</Link>
				</li>
				<li className="navbar-logo">
					<Link to="/home">
						<img
							src="https://img.icons8.com/fluency/96/000000/restaurant-.png"
							alt="logo"
						/>
					</Link>
				</li>
			</ul>
		</nav>
	);
}

function Homepage() {
	return (
		<section>
			<h1>Home page</h1>
		</section>
	);
}

function Tags({ type, text }) {
	return (
		<span
			className="restaurant-tags"
			style={{
				backgroundColor: `var(--${type === "cuisine" ? "pink" : "yellow"})`,
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
				<Tags text={`${rating} star`} type="rating" />
				<Tags text={cuisine} type="cuisine" />
			</p>
		</div>
	);
}

function RestaurantPage() {
	return (
		<section className="restaurant-page">
			<RestaurantCard
				imageIndex={1}
				title="Montreau Avenue"
				rating={5}
				cuisine="American"
			/>
			<RestaurantCard
				imageIndex={2}
				title="Taco Bell"
				rating={5}
				cuisine="American"
			/>
			<RestaurantCard
				imageIndex={3}
				title="Chipotle"
				rating={5}
				cuisine="American"
			/>
			<RestaurantCard
				imageIndex={4}
				title="Mc Donald's"
				rating={5}
				cuisine="American"
			/>
			<RestaurantCard
				imageIndex={5}
				title="KFC"
				rating={5}
				cuisine="American"
			/>
			<RestaurantCard
				imageIndex={6}
				title="Men Tempeh"
				rating={5}
				cuisine="American"
			/>
			<RestaurantCard
				imageIndex={7}
				title="Bali Bakery"
				rating={5}
				cuisine="American"
			/>
			<RestaurantCard
				imageIndex={8}
				title="Paris"
				rating={5}
				cuisine="American"
			/>
			<RestaurantCard
				imageIndex={9}
				title="Ngakak banget"
				rating={5}
				cuisine="Americano"
			/>
		</section>
	);
}

function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<Routes>
					<Route path="/home" element={<Homepage />} />
					<Route path="/restaurants" element={<RestaurantPage />} />
					<Route path="/about" element={<About />} />
					<Route path="/*" element={<Navigate replace to="/home" />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
