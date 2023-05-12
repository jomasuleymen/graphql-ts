import { GraphQLSchema } from "graphql";

export interface OptionsData {
	schema: GraphQLSchema;
	resolvers?: unknown;
}
