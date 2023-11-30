import app from "./app";
import { Config } from "./config";
import { AppDataSource } from "./config/data-source";
import logger from "./config/logger";

const startServer = async () => {
  const PORT = Config.PORT;
  try {
    await AppDataSource.initialize();
    logger.info("Database connected succesfully 🚀🚀");
    app.listen(PORT, () => {
      logger.info(`Server is Listning on port ${PORT} 🚀🚀🚀`);
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    }
    // logger works asynchronously, it does not block main process so proces exit that's why we make it asynchrouns
    setTimeout(() => {
      process.exit(1);
    }, 1000);
  }
};

void startServer();
