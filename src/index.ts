import "reflect-metadata";

import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

// import data from "./schemes/graphql-js/data";
import data from "./schemes/type-graphql/data";

interface GraphQLContext {
	token?: String;
}

(async () => {
	const app = express();

	app.get("/", (_req, res) => {
		res.send("Hello World!");
	});

	const server = new ApolloServer<GraphQLContext>({
		schema: data.schema,
	});

	await server.start();

	app.use(
		"/graphql",
		cors<cors.CorsRequest>(),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req }) => ({ token: req.headers?.token || "token" })
		})
	);

	app.listen(3000, () => {
		console.log("Server running on http://localhost:3000/graphql");
	});
})();
