import dotenv from "dotenv";

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000", 10),

  database: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    name: process.env.DB_NAME || "telemedicine",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || "20", 10),
    idleTimeout: parseInt(process.env.DB_IDLE_TIMEOUT || "30000", 10),
  },
};
