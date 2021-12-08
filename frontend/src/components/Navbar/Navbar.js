import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

export function NavbarContainer({ children }) {
	return <nav className="navbar-container">{children}</nav>;
}

export function Navbar() {
	const [mobile, setMobile] = useState(false);
	const calcViewport = () => setMobile(window.innerWidth <= 600);

	useEffect(() => {
		calcViewport();
		document.addEventListener("resize", calcViewport);
		document.removeEventListener("resize", calcViewport);
	}, []);
	return (
		!mobile && (
			<ul className="navbar">
				<li className="navbar-item">
					<Link to="/home">
						<button className="navbar-button">Home</button>
					</Link>
				</li>
				<li className="navbar-item">
					<Link to="/restaurants">
						<button className="navbar-button">Restaurants</button>
					</Link>
				</li>
				<li className="navbar-item">
					<Link to="/about">
						<button className="navbar-button">About</button>
					</Link>
				</li>
			</ul>
		)
	);
}
