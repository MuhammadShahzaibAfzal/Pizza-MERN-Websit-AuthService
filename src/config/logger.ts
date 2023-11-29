import winston from "winston";
import { Config } from ".";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  defaultMeta: { service: "auth-service" },
  transports: [
    new winston.transports.Console({
      silent: Config.NODE_ENV === "test",
    }),
    new winston.transports.File({
      dirname: "logs",
      filename: "combined.log",
      level: "info",
      silent: Config.NODE_ENV === "test",
    }),
    new winston.transports.File({
      dirname: "logs",
      filename: "erros.log",
      level: "error",
      silent: Config.NODE_ENV === "test",
    }),
  ],
});

export default logger;
