import { ConnectionOptions } from "typeorm";

const ConnectionOptions: ConnectionOptions = {
  type: "postgres",
  database: "uber",
  synchronize: true,

  // write histories
  logging: true,

  // where model files are.
  entities: ["entities/*.*"],

  // if not process.env.DB_ENDPOINT, then localhost
  host: process.env.DB_ENDPOINT || "localhost",

  port: 5432,
  username: process.env.DB_USERNAME || "minjungkim",
  password: process.env.DB_PASSWORD || "",
};

export default ConnectionOptions;
