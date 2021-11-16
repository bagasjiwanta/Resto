import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import RestaurantsDAO from "./dao/restaurantsDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

// using .env vars requires config() function call
dotenv.config();
const mongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;

mongoClient
	// Connect to mongodb server
	.connect(process.env.RESTAURANT_DB_URI, {
		maxPoolSize: 50,
		wtimeoutMS: 2500,
	})
	.catch((error) => {
		console.log(error);
		process.exit(1);
	})
	.then(async (connection) => {
		await RestaurantsDAO.injectDB(connection);
		await ReviewsDAO.injectDB(connection);
		app.listen(port, () => {
			console.log(`Listening on port ${port}`);
		});
	});
