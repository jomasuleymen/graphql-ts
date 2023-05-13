import {
	Field,
	ObjectType,
	Resolver,
	Query,
	Mutation,
	Arg,
	Args,
	ArgsType,
	InputType,
	buildSchemaSync,
	Ctx
} from "type-graphql";

import { MaxLength, Length, ArrayMaxSize, Min, Max } from "class-validator";
import { OptionsData } from "../options-data";

@ObjectType()
class Recipe {
	@Field(type => String)
	id: string;

	@Field(type => String)
	title: string;

	@Field({ nullable: true })
	description?: string;

	@Field()
	creationDate: Date;

	@Field(type => [String])
	ingredients: string[];
}

@InputType()
class NewRecipeInput {
	@Field()
	@MaxLength(30)
	title: string;

	@Field({ nullable: true })
	@Length(30, 255)
	description?: string;

	@Field(type => [String])
	@ArrayMaxSize(30)
	ingredients: string[];
}

@ArgsType()
class RecipesArgs {
	@Field(type => Number)
	@Min(0)
	skip: number = 0;

	@Field(type => Number)
	@Min(1)
	@Max(50, {
		message: "Max take value is 50"
	})
	take: number = 25;
}

@Resolver(Recipe)
class RecipeResolver {
	constructor(private recipeService: any) {}

	@Query(returns => String)
	async recipe(@Arg("id") id: string) {
		return id;
	}

	@Query(returns => [Number])
	recipes(
		@Args() { skip, take }: RecipesArgs,
		@Ctx() context: any,
		@Ctx("token") token: any
	) {
		console.log("Context", context);
		console.log("context token: ", token);
		return [skip, take];
	}

	@Mutation(returns => String)
	// @Authorized()
	addRecipe(
		@Arg("newRecipeData") newRecipeData: NewRecipeInput
	): Promise<string> {
		return new Promise(async (resolve, reject) => {
			await new Promise(resolve => setTimeout(resolve, 1000));

			resolve(newRecipeData.title);
		});
	}

	@Mutation(returns => Boolean)
	// @Authorized(Roles.Admin)
	async removeRecipe(@Arg("id") id: string) {
		try {
			await this.recipeService.removeById(id);
			return true;
		} catch {
			return false;
		}
	}
}

const schema = buildSchemaSync({
	resolvers: [RecipeResolver]
});

const data: OptionsData = {
	schema
};

export default data;
