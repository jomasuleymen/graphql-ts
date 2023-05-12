import { QueryResolvers } from "@/generated/graphql";
import { OptionsData } from "@schemes/options-data";
import { readFileSync } from "fs";
import { buildSchema } from "graphql";

const typeDefs = readFileSync("src/graphql/schema.graphql", {
	encoding: "utf-8"
});
const schema = buildSchema(typeDefs);

const resolvers: QueryResolvers = {
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
};

const data: OptionsData = {
	schema,
	resolvers
};

export default data;
