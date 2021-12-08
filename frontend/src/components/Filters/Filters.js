import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Filters.css";

export function SearchBox({ filters, setFilters }) {
	const inputRef = useRef();
	const loc = useLocation();
	const onSubmit = (e) => {
		e.preventDefault();
		setFilters({ ...filters, name: inputRef.current.value });
	};

	return (
		loc.pathname === "/restaurants" && (
			<form onSubmit={onSubmit} className="search-form ">
				<input
					ref={inputRef}
					className="form-input-text"
					type="text"
					placeholder="type restaurant name to search"
				></input>
			</form>
		)
	);
}

export function FilterBox({ filters, setFilters, cuisines }) {
	const [cuisineValue, setCuisineValue] = useState("All Cuisines");
	const zipcodeValue = useRef();
	const [showCuisines, setShowCuisines] = useState(false);

	const onSubmit = (e) => {
		let temp = cuisineValue;
		if (temp === "All Cuisines") {
			temp = "";
		}
		setFilters({
			...filters,
			zipcode: zipcodeValue.current.value,
			cuisine: temp,
		});
	};

	return (
		<div className="filter-box">
			<h3 className="filter-box-title">Filters</h3>
			<h4
				onClick={() => setShowCuisines(!showCuisines)}
				className="filter-box-subtitle"
			>
				<span>Cuisines</span>
				<span className={showCuisines && "invert-rotation"}>
					<img
						src="https://img.icons8.com/material-outlined/24/000000/expand-arrow--v1.png"
						alt=""
					/>
				</span>
			</h4>
			<ul
				className={`filter-cuisine ${showCuisines && "filter-cuisine-active"}`}
			>
				<li value="All Cuisines" key={-1}>
					<button
						onClick={() => setCuisineValue("All Cuisines")}
						className={`filter-cuisine-item ${
							cuisineValue === "All Cuisines" && "filter-cuisine-item-active"
						}`}
					>
						All Cuisines
					</button>
				</li>
				{cuisines.map((c, index) => (
					<li value={c} key={index}>
						<button
							onClick={() => setCuisineValue(c)}
							className={`filter-cuisine-item ${
								c === cuisineValue && "filter-cuisine-item-active"
							}`}
						>
							{c}
						</button>
					</li>
				))}
			</ul>
			<h4 className="filter-box-subtitle">
				<span>Zipcodes</span>
				<span>
					<img
						src="https://img.icons8.com/material-outlined/24/000000/expand-arrow--v1.png"
						alt=""
					/>
				</span>
			</h4>

			<input type="text" ref={zipcodeValue}></input>
			<button onClick={onSubmit}>Apply filter</button>
		</div>
	);
}
