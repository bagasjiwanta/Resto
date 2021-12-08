import axios from "axios";
import { useState, useEffect } from "react";
import RestaurantAPI from "./restaurants";

export function useRestaurants() {
	const [data, setData] = useState([]);
	const [filters, setFilters] = useState({
		name: "",
		cuisine: "",
		zipcode: "",
		page: 0,
		restaurantsPerPage: 15,
	});

	useEffect(() => {
		const cancelTokenSource = axios.CancelToken.source();

		const getRestaurants = async () => {
			try {
				const response = await RestaurantAPI.getRestaurants(
					filters,
					cancelTokenSource.token
				);
				setData(response.data);
			} catch (err) {
				console.log(err);
			} finally {
			}
		};

		getRestaurants();
		return () => cancelTokenSource.cancel();
	}, [filters]);

	return {
		data,
		filters,
		setFilters,
	};
}

export function useCuisine() {
	const [cuisines, setCuisines] = useState([]);
	useEffect(() => {
		const cancelTokenSource = axios.CancelToken.source();
		const getCuisines = async () => {
			try {
				const response = await RestaurantAPI.getCuisines(
					cancelTokenSource.token
				);
				setCuisines(response.data);
				console.log("render");
			} catch (err) {
				console.log(err);
			}
		};

		getCuisines();
		return () => cancelTokenSource.cancel();
	}, []);
	return cuisines;
}

export function useRestaurant(id) {
	const [data, setData] = useState();
	const [error, setError] = useState(false);
	useEffect(() => {
		const cancelTokenSource = axios.CancelToken.source();
		const getRestaurant = async () => {
			setError(false);
			try {
				const response = await RestaurantAPI.getRestaurantById(
					id,
					cancelTokenSource.token
				);
				setData(response.data);
			} catch (err) {
				console.log(err);
				setError(true);
			}
		};

		getRestaurant();
		return () => cancelTokenSource.cancel();
	}, [id]);
	return [data, error];
}
