import { config } from "dotenv";
config();

/* ENV Variables */
const { PORT, NODE_ENV } = process.env;

export const Config = {
  PORT,
  NODE_ENV,
};
