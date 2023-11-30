import { NextFunction, Response } from "express";
import { RegisterUserRequest } from "../types";
import { UserService } from "../services/UserService";
import { Logger } from "winston";
import createHttpError from "http-errors";

export class AuthController {
  constructor(
    private userService: UserService,
    private logger: Logger,
  ) {}
  async register(req: RegisterUserRequest, res: Response, next: NextFunction) {
    const { firstName, lastName, password, email } = req.body;
    this.logger.debug("New request to register a user", {
      firstName,
      lastName,
      email,
      password: "********",
    });
    if (!email) {
      const err = createHttpError(400, "Email is required !");
      next(err);
      return;
    }
    try {
      const user = await this.userService.create({
        firstName,
        lastName,
        password,
        email,
      });
      this.logger.info("User has been registerd successfully", {
        user: user,
      });
      res.status(201).json(user);
    } catch (error) {
      next(error);
      return;
    }
  }
}
