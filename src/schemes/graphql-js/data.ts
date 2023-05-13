import { Resolvers } from "@/generated/graphql";
import { OptionsData } from "@schemes/options-data";
import { readFileSync } from "fs";
import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefs = readFileSync("src/graphql/schema.graphql", {
	encoding: "utf-8"
});

const resolvers: Resolvers = {
	Query: {
		posts: () => {
			return [
				{
					id: 12,
					title: "Title",
					author: {
						id: 123,
						firstName: "Zhomart",
						lastName: "Suleymen"
					}
				}
			];
		}
	}
};

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

const data: OptionsData = {
	schema
};

export default data;
