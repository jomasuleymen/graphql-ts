import "reflect-metadata";

import express from "express";
import { graphqlHTTP } from "express-graphql";

import data from "./schemes/graphql-js/scheme";
// import data from "./schemes/type-graphql/scheme";

(async () => {
	const app = express();

	app.get("/", (_req, res) => {
		res.send("Hello World!");
	});

	app.use(
		"/graphql",
		graphqlHTTP({
			schema: data.schema,
			rootValue: data.resolvers,
			graphiql: true
		})
	);

	app.listen(3000, () => {
		console.log("Server running on http://localhost:3000");
	});
})();
