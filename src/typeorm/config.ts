import {
  ConnectionOptions,
  Connection,
  createConnection,
  getConnection,
} from "typeorm";
import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { User } from "./entities/User";
import { Document } from "./entities/Document";

export const prod = process.env.NODE_ENV === "production";

const { PG_HOST, PG_PASSWORD, PG_USERNAME, PG_DATABASE, PG_PORT } = process.env;
console.log(`Postgres running at ${PG_HOST}`);

export const config: ConnectionOptions = {
  name: "easy_db",
  type: "postgres",
  host: PG_HOST,
  port: parseInt(PG_PORT as string),
  username: PG_USERNAME,
  password: PG_PASSWORD as string,
  database: PG_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Document],

  //? PROD
  ...(prod && {
    database: PG_DATABASE,
    logging: false,
    synchronize: true,
  }),
};

export const connect = async () => {
  let connection: Connection;

  try {
    connection = getConnection(config.name);
    // console.log(connection);
  } catch (err) {
    connection = await createConnection(config);
  }

  return connection;
};
