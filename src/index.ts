import app from "./app";
import dotenv from "dotenv";

/**
 * dotenv load .env file in @const process.env
 */
dotenv.config();

import { createConnection } from "typeorm";
import { Options } from "graphql-yoga";
import ConnectionOptions from "./ormConfig";
import decodeJWT from "./utils/decode.JWT";

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";
const SUBSCRIPTION_ENDPOINT: string = "/subscription";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT,
  /**
   * from graphql-yoga, we can customize something when subscription starts.
   */
  subscriptions: {
    path: SUBSCRIPTION_ENDPOINT,

    /**
     * it would be a header.
     * http needs send token everytime we do something. because there is no connection between actions.
     * in websockets, connection being kept.
     * so if we auth once with token, server memory will remember it.
     */
    onConnect: async (connectionParams) => {
      const token = connectionParams["X-JWT"];

      if (token) {
        const user = await decodeJWT(token);

        if (user) {
          return {
            /**
             * @currentUser is added on onConnect
             * this would be added on subscription resolver like DriverSubscription
             */
            currentUser: user,
          };
        }
      }
      throw new Error("No JWT. Cant subscript");
    },
  },
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
