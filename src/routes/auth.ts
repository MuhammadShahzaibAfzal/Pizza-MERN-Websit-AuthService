import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { UserService } from "../services/UserService";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";

const authRouter = Router();
/* DEPENEDENCY INJECTION */
const userRepositary = AppDataSource.getRepository(User);
const userService = new UserService(userRepositary);
const authController = new AuthController(userService);

authRouter.post("/register", (req, res) => authController.register(req, res));

export default authRouter;
