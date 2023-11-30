import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { UserService } from "../services/UserService";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";
import logger from "../config/logger";

const authRouter = Router();
/* DEPENEDENCY INJECTION */
const userRepositary = AppDataSource.getRepository(User);
const userService = new UserService(userRepositary);
const authController = new AuthController(userService, logger);

authRouter.post("/register", (req, res, next) => authController.register(req, res, next));

export default authRouter;
