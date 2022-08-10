import { makeExecutableSchema } from "@graphql-tools/schema";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import resolvers from "./resolvers";

const files = readdirSync(join(__dirname, './typedefs'));

const typedefs = files.reduce(
  (_, file) => {
    return readFileSync(join(__dirname, './typedefs', file), {
      encoding: 'utf8'
    });
  },
  ""
);

const schema = makeExecutableSchema({
  typeDefs: typedefs,
  resolvers: resolvers,
});

export default schema;
