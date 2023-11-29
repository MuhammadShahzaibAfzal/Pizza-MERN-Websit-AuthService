import app from "./app";
import { Config } from "./config";
import logger from "./config/logger";

const startServer = () => {
  const PORT = Config.PORT;
  try {
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

startServer();
