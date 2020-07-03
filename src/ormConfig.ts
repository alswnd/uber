import { ConnectionOptions } from "typeorm";

const ConnectionOptions: ConnectionOptions = {
  type: "postgres",
  database: "uber",

  // synchronize whenever server starts.
  synchronize: true,

  // write histories
  logging: true,

  // where model files are, automatically.
  entities: ["entities/*.*"],

  port: 5432,

  /**
   * @description code below is replaced by "dotenv" in index.ts and .env
   */
  // if not process.env.DB_ENDPOINT, then localhost
  host: process.env.DB_ENDPOINT || "localhost", // this is a not good way.
  username: process.env.DB_USERNAME || "minjungkim",
  password: process.env.DB_PASSWORD || "",
};

export default ConnectionOptions;
