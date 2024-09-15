import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT,
  mongo_connection_uri: process.env.MONGODB_CONNECTION_URI,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
};

export const config = Object.freeze(_config);
