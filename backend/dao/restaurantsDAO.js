import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let restaurants;

export default class RestaurantsDAO {
	static async injectDB(conn) {
		if (restaurants) {
			return;
		}
		try {
			restaurants = await conn
				.db(process.env.RESTAURANT_DB_NAME)
				.collection("restaurants");
		} catch (e) {
			console.error(
				`Unable to establish a collection handle in restaurantsDAO: ${e}`
			);
		}
	}
	static async getRestaurants({
		filters = null,
		page = 0,
		restaurantsPerPage = 20,
	} = {}) {
		let query = {};
		if (filters) {
			if ("name" in filters) {
				query = { $text: { $search: filters["name"] } };
			}
			if ("cuisine" in filters) {
				query = { ...query, cuisine: { $eq: filters["cuisine"] } };
			}
			if ("zipcode" in filters) {
				query = { ...query, "address.zipcode": { $eq: filters["zipcode"] } };
			}
		}

		const pipeline = [
			{
				$match: query,
			},
			{
				$group: {
					_id: null,
					cuisines: {
						$addToSet: "$cuisine",
					},
				},
			},
		];

		let cursor;

		try {
			cursor = await restaurants.find(query);
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`);
			return { restaurantsList: [], totalNumRestaurants: 0 };
		}

		const displayCursor = cursor
			.limit(restaurantsPerPage)
			.skip(restaurantsPerPage * page);

		try {
			const restaurantsList = await displayCursor.toArray();
			const totalNumRestaurants = await restaurants.countDocuments(query);
			const cuisineCursor = restaurants.aggregate(pipeline);
			const cuisineArray = [];
			await cuisineCursor.forEach((doc) => cuisineArray.push(doc));
			const cuisines = cuisineArray[0].cuisines;

			return { restaurantsList, totalNumRestaurants, cuisines };
		} catch (e) {
			console.error(
				`Unable to convert cursor to array or problem counting documents, ${e}`
			);
			return { restaurantsList: [], totalNumRestaurants: 0, cuisines: {} };
		}
	}
	static async getRestaurantByID(id) {
		try {
			const pipeline = [
				{
					$match: {
						_id: new ObjectId(id),
					},
				},
				{
					$lookup: {
						from: "reviews",
						let: {
							id: "$_id",
						},
						pipeline: [
							{
								$match: {
									$expr: {
										$eq: ["$restaurant_id", "$$id"],
									},
								},
							},
							{
								$sort: {
									date: -1,
								},
							},
						],
						as: "reviews",
					},
				},
				{
					$addFields: {
						reviews: "$reviews",
					},
				},
			];
			return await restaurants.aggregate(pipeline).next();
		} catch (e) {
			console.error(`Something went wrong in getRestaurantByID: ${e}`);
			throw e;
		}
	}
	static async getCuisines() {
		let cuisines = [];
		try {
			cuisines = await restaurants.distinct("cuisine");
			return cuisines;
		} catch (e) {
			console.error(`Unable to get cuisines, ${e}`);
			return cuisines;
		}
	}
}
