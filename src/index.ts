import app from "./app";
import dotenv from "dotenv";

/**
 * dotenv load .env file in @const process.env
 */
dotenv.config();

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
createConnection(ConnectionOptions)
  .then(() => {
    app.start(appOptions, handleAppStart);
  })
  .catch((error) => console.log(error));
