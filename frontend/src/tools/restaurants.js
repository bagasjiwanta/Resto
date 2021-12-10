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
		let reqString = "restaurants?";
		Object.keys(query).forEach((value) => {
			if (query[value]) {
				reqString = reqString.concat(`${value}=${query[value]}&`);
			}
		});
		return this.instance.get(reqString);
	}

	getCuisines(cancelTokenSource) {
		return this.instance.get("cuisines", { cancelToken: cancelTokenSource });
	}

	getRestaurantById(id, cancelTokenSource) {
		return this.instance.get(`restaurant?id=${id}`, {
			cancelToken: cancelTokenSource,
		});
	}
}

export default new RestaurantAPI(
	"https://ap-southeast-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/restaurants-devkv/service/restaurants/incoming_webhook/"
);
