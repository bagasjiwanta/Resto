import "./app.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useRestaurants } from "./tools/useData";
import { NavbarContainer, Navbar } from "./components/Navbar/Navbar";
import { SearchBox } from "./components/Filters/Filters";
import { About, Homepage, Restaurant, Restaurants } from "./pages/Pages";

function App() {
	const { data, filters, setFilters } = useRestaurants();

	return (
		<div className="app">
			<NavbarContainer>
				<Navbar />
				<SearchBox filters={filters} setFilters={setFilters} />
			</NavbarContainer>

			<Routes>
				<Route path="/home" element={<Homepage />} />
				<Route
					path="/restaurants"
					element={
						<Restaurants
							data={data}
							filters={filters}
							setFilters={setFilters}
						/>
					}
				/>
				<Route path="/restaurants/id/:id" element={<Restaurant />} />
				<Route path="/about" element={<About />} />
				<Route path="/*" element={<Navigate replace to="/home" />} />
			</Routes>
		</div>
	);
}

export default App;
