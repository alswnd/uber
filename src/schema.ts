import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";

/**
 * fileLoader helps us to get files in each folders repeatedly.
 */
const allTypes: GraphQLSchema[] = fileLoader(
  // we can use a pattern to get files.
  // '**' means don't care how much it deeps. we will search every folder in 'api' dir.
  path.join(__dirname, "./api/**/*.graphql")
);

/**
 * same with @const allTypes.
 * we declared *.resolvers.ts to return a string.
 * @error string[] makes error. ??
 */
const allResolvers: any[] = fileLoader(
  path.join(__dirname, "./api/**/*.resolvers.*")
);

const mergedTypes = mergeTypes(allTypes);
const mergedResolvers = mergeResolvers(allResolvers);

/**
 * @function makeExecutableSchema()
 * @description it works like @const allTypes, merge schemas into one.
 */
const schema = makeExecutableSchema({
  typeDefs: mergedTypes,
  resolvers: mergedResolvers,
});

export default schema;
