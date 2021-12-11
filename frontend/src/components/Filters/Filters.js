import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Filters.css";

const expandArrowUrl =
	"https://img.icons8.com/material-outlined/24/000000/expand-arrow--v1.png";

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
					placeholder=" &#x1F50D; type restaurant name to search"
				></input>
			</form>
		)
	);
}

export function FilterBox({ filters, setFilters, cuisines }) {
	const [cuisineValue, setCuisineValue] = useState("All Cuisines");
	const zipcodeValue = useRef();
	const [showCuisines, setShowCuisines] = useState(false);
	const [showZipcodes, setShowZipcodes] = useState(false);
	const [showInner, setShowInner] = useState(false);

	useEffect(() => {
		setShowInner(window.innerWidth > 600);
	}, []);

	const applyFilter = () => {
		let temp = cuisineValue;
		if (temp === "All Cuisines") {
			temp = "";
		}
		setFilters({
			...filters,
			zipcode: zipcodeValue.current.value,
			cuisine: temp,
		});
		setShowInner(false);
	};

	const resetFilter = () => {
		setCuisineValue("All Cuisines");
		zipcodeValue.current.value = "";
		setFilters({
			...filters,
			zipcode: "",
			cuisine: "",
		});
		setShowInner(false);
	};

	return (
		<div className="filter-box">
			<h3 className="filter-box-title" onClick={() => setShowInner(!showInner)}>
				Filters
			</h3>
			<div
				className={`filter-box-inner`}
				style={{ display: !showInner && "none" }}
			>
				<h4
					onClick={() => setShowCuisines(!showCuisines)}
					className="filter-box-subtitle"
				>
					<span>Cuisines</span>
					<span className={`${showCuisines && "invert-rotation"}`}>
						<img src={expandArrowUrl} alt="v" />
					</span>
				</h4>
				<ul
					className={`filter-cuisine ${
						showCuisines && "filter-cuisine-active"
					}`}
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
					{cuisines.map((cuisine, index) => (
						<li value={cuisine} key={index}>
							<button
								onClick={() => setCuisineValue(cuisine)}
								className={`filter-cuisine-item ${
									cuisine === cuisineValue && "filter-cuisine-item-active"
								}`}
							>
								{cuisine}
							</button>
						</li>
					))}
				</ul>
				<h4
					className="filter-box-subtitle"
					onClick={() => setShowZipcodes(!showZipcodes)}
				>
					<span>Zipcodes</span>
					<span className={`${showCuisines && "invert-rotation"}`}>
						<img src={expandArrowUrl} alt="v" />
					</span>
				</h4>
				<div
					className={`filter-zipcode ${
						showZipcodes && "filter-zipcode-active"
					}`}
				>
					<input
						type="text"
						ref={zipcodeValue}
						placeholder="example : 11234"
						className="filter-zipcode-input"
					></input>
				</div>
				<button
					onClick={resetFilter}
					className="filter-button filter-button-red"
				>
					<strong>Reset filters</strong>
				</button>
				<button onClick={applyFilter} className="filter-button ">
					<strong>Apply filters</strong>
				</button>
			</div>
		</div>
	);
}
