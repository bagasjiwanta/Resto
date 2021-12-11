import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
import { FaTimes, FaBars } from "react-icons/fa";

export function NavbarContainer({ children }) {
	const [mobile, setMobile] = useState(false);
	const calcViewport = () => setMobile(window.innerWidth <= 600);
	const [showNavbar, setShowNavbar] = useState(false);

	useEffect(() => {
		calcViewport();
		document.addEventListener("resize", calcViewport);
		document.removeEventListener("resize", calcViewport);
	}, []);
	return (
		<nav
			className={`navbar-container ${
				mobile && showNavbar && "navbar-container-active"
			}`}
		>
			<Navbar
				mobile={mobile}
				showNavbar={showNavbar}
				setShowNavbar={setShowNavbar}
			/>
			{children}
		</nav>
	);
}

export function Navbar({ mobile, showNavbar, setShowNavbar }) {
	return (
		<>
			{mobile && (
				<button
					className="navbar-toggle"
					onClick={() => setShowNavbar(!showNavbar)}
				>
					{showNavbar ? (
						<FaTimes
							size="2.5em"
							color="white"
							style={{ paddingTop: "0.5em" }}
						/>
					) : (
						<FaBars
							size="2.5em"
							color="white"
							style={{ paddingTop: "0.5em" }}
						/>
					)}
				</button>
			)}
			<ul className="navbar" style={{ left: showNavbar ? "0" : "-100vh" }}>
				<li className="navbar-item" onClick={() => setShowNavbar(!showNavbar)}>
					<Link to="/home">
						<button className="navbar-button">Home</button>
					</Link>
				</li>
				<li className="navbar-item" onClick={() => setShowNavbar(!showNavbar)}>
					<Link to="/restaurants">
						<button className="navbar-button">Restaurants</button>
					</Link>
				</li>
				<li className="navbar-item" onClick={() => setShowNavbar(!showNavbar)}>
					<Link to="/about">
						<button className="navbar-button">About</button>
					</Link>
				</li>
			</ul>
		</>
	);
}
