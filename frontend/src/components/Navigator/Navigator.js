import { useEffect, useRef, useState } from "react";
import "./Navigator.css";

function PageButton({ value, onClick, page }) {
	return (
		<li className="pagenav-li">
			<button
				onClick={() => onClick(value)}
				className={`pagenav-btn ${page === value - 1 && "pagenav-btn-on"}`}
			>
				{value}
			</button>
		</li>
	);
}

function PageButtonEnd({ isLeft, onClick, to }) {
	return (
		<li className="pagenav-li">
			<button className="pagenav-btn" onClick={() => onClick(to)}>
				{isLeft ? "<" : ">"}
			</button>
		</li>
	);
}

export function PageNav({ filters, setFilters, data }) {
	const [pageNow, setPageNow] = useState(0);
	const [ellipses, setShowEllipses] = useState([false, false]);
	const [pageNumbers, setPageNumbers] = useState([]);
	const [max, setMax] = useState(0);
	const inputRef = useRef();

	useEffect(() => {
		if (data.entries_per_page) {
			let { total_results, entries_per_page, page } = data;
			page = parseInt(page);
			entries_per_page = parseInt(entries_per_page);
			const total = parseInt(total_results["$numberLong"]);

			let temp = Math.ceil(total / entries_per_page - 1);
			if (temp < 6) {
				const arr = [];
				for (let i = 2; i < temp; i++) {
					arr.push(i);
				}
				setPageNumbers(arr);
				setShowEllipses([false, false]);
			} else {
				if (page < 4) {
					setPageNumbers([2, 3, 4, 5, 6]);
					setShowEllipses([false, true]);
				} else if (page > temp - 4) {
					setPageNumbers([temp - 4, temp - 3, temp - 2, temp - 1, temp]);
					setShowEllipses([true, false]);
				} else {
					setPageNumbers([page - 1, page, page + 1, page + 2, page + 3]);
					setShowEllipses([true, true]);
				}
			}

			setPageNow(page);
			setMax(temp);
			inputRef.current.value = "";
		}
	}, [data]);

	const changePage = (destPage) => {
		if (destPage !== 0 && destPage !== max + 2) {
			setFilters({ ...filters, page: destPage - 1 });
		}
	};

	const changeEntriesPerPage = (e) => {
		e.preventDefault();
		setFilters({ ...filters, restaurantsPerPage: inputRef.current.value });
		inputRef.current.value = "";
	};

	return (
		<div className="pagenav-container">
			<ul className="pagenav">
				<PageButtonEnd isLeft={true} to={pageNow} onClick={changePage} />
				<PageButton value={1} onClick={changePage} page={pageNow} key={-3} />
				{ellipses[0] && <li>...</li>}
				{pageNumbers.length > 0 &&
					pageNumbers.map((value, index) => {
						return (
							<PageButton
								value={value}
								onClick={changePage}
								page={pageNow}
								key={index}
							/>
						);
					})}
				{ellipses[1] && <li>...</li>}
				<PageButton
					value={max + 1}
					onClick={changePage}
					page={pageNow}
					key={-2}
				/>
				<PageButtonEnd isLeft={false} to={pageNow + 2} onClick={changePage} />
			</ul>
			<div className="pagenav-p-form">
				<span>showing {data && data.entries_per_page} entries per page</span>
				<form onSubmit={changeEntriesPerPage}>
					<input
						type="text"
						ref={inputRef}
						placeholder="change"
						className="pagenav-form-input"
					></input>
				</form>
			</div>
		</div>
	);
}
