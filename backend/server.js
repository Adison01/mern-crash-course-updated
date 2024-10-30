import express from "express";
import dotenv from "dotenv";
import path from "path";
import redis from "redis"
import responseTime from "response-time";
import { promisify } from "util";

import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const client = redis.createClient({
	host: "127.0.0.1",
	port: 6379,
});
client.on('connect',  function(){
	console.log("connec to redis")
})

export const GET_ASYNC = promisify(client.get).bind(client);
export const SET_ASYNC = promisify(client.set).bind(client);

const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes);
app.use(responseTime());

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});
