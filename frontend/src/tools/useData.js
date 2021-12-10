import axios from "axios";
import { useState, useEffect } from "react";
import RestaurantAPI from "./restaurants";

export const imageLinks = {
	0: "https://drive.google.com/uc?export=view&id=1GfvjKNr6jKV__HLKOT781kz_TT8NpZDB",
	1: "https://drive.google.com/uc?export=view&id=1hPOt7CKAuhEmSQa8UIKYKZ5QG51FyyNa",
	2: "https://drive.google.com/uc?export=view&id=1Iq1R_Gg4gASrof_aTj5OqOuNfic2vaQ2",
	3: "https://drive.google.com/uc?export=view&id=1G9HQwguHDxth88Wd0AfYZ-o83qOQjCwd",
	4: "https://drive.google.com/uc?export=view&id=1smJj7xYXwKCV1_ownJ3YWdWLAaFvL8kH",
	5: "https://drive.google.com/uc?export=view&id=1GvWl9YKhNlCFt8OyUjy3H3QcOznMGFDT",
	6: "https://drive.google.com/uc?export=view&id=16zjSzzeEByDW9-q_4Vgz7Gzfu6dPtrfV",
	7: "https://drive.google.com/uc?export=view&id=1uKAhKdD3hcRLYdEA-79iT0XbkWzcM_bg",
	8: "https://drive.google.com/uc?export=view&id=1QjT7a7TA9CqfAeiB2XH9QWUSw-t_c8Uf",
	9: "https://drive.google.com/uc?export=view&id=1uPIqzc9F8DYxSZlpN0ZZ3D0-MnJoFEHz",
	banner:
		"https://drive.google.com/uc?export=view&id=1HajilTPIOYMJjXVcvQA30QBuQF0ARuxw",
	homepage1:
		"https://drive.google.com/uc?export=view&id=1i2uz7Ayhv2O7pusIpxDUX10bQkTUtd2y",
};

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
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const cancelTokenSource = axios.CancelToken.source();
		const getRestaurant = async () => {
			setLoading(true);
			try {
				const response = await RestaurantAPI.getRestaurantById(
					id,
					cancelTokenSource.token
				);
				setData(response.data);
				setLoading(false);
			} catch (err) {
				console.log(err);
				setLoading(false);
			}
		};

		getRestaurant();
		return () => cancelTokenSource.cancel();
	}, [id]);
	return [data, loading];
}
