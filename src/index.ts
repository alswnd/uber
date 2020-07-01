import app from "./app";
import { createConnection } from "typeorm";
import { Options } from "graphql-yoga";
import ConnectionOptions from "./ormConfig";

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT,
};

const handleAppStart = () => console.log(`Listening on port ${PORT}`);

/**
 * connect to database first, and then start app.
 * @param ConnectionOptions : { postgres, uber, database, endpoint ... }
 */
createConnection(ConnectionOptions).then(() => {
  app.start(appOptions, handleAppStart);
});
