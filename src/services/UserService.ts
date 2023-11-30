import { Repository } from "typeorm";
import { User } from "../entity/User";
import { UserData } from "../types";
import createHttpError from "http-errors";

export class UserService {
  // DEPENDENCY INJECTIOn
  constructor(private userRepositary: Repository<User>) {}
  async create({ firstName, lastName, email, password }: UserData) {
    try {
      await this.userRepositary.save({
        firstName,
        lastName,
        password,
        email,
      });
    } catch (error) {
      const err = createHttpError(500, "Failed to register users into db.");
      throw err;
    }
  }
}
