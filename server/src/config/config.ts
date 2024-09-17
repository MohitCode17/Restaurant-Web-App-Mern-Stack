import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT,
  frontend_url: process.env.FRONTEND_URL,
  mongo_connection_uri: process.env.MONGODB_CONNECTION_URI,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  mailtrap_api_token: process.env.MAILTRAP_API_TOKEN,
};

export const config = Object.freeze(_config);
