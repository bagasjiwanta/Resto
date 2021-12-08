import axios from "axios";

class RestaurantAPI {
	constructor(baseURL) {
		this.instance = axios.create({
			baseURL: baseURL,
			headers: {
				"Content-type": "application/json",
			},
		});
	}

	getRestaurants(
		query = {
			name: "",
			cuisine: "",
			zipcode: "",
			page: 0,
			restaurantsPerPage: 20,
		},
		cancelTokenSource
	) {
		let reqString = "?";
		Object.keys(query).forEach((value) => {
			if (query[value]) {
				reqString = reqString.concat(`${value}=${query[value]}&`);
			}
		});
		return this.instance.get(reqString, { cancelToken: cancelTokenSource });
	}

	getCuisines(cancelTokenSource) {
		return this.instance.get("/cuisines", { cancelToken: cancelTokenSource });
	}

	getRestaurantById(id, cancelTokenSource) {
		return this.instance.get(`/id/${id}`, { cancelToken: cancelTokenSource });
	}
}

export default new RestaurantAPI("http://localhost:3000/api/v1/restaurants");
