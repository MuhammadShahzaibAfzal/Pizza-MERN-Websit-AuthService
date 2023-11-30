import { Repository } from "typeorm";
import { User } from "../entity/User";
import { UserData } from "../types";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export class UserService {
  // DEPENDENCY INJECTIOn
  constructor(private userRepositary: Repository<User>) {}
  async create({ firstName, lastName, email, password }: UserData) {
    // password hashed
    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    try {
      await this.userRepositary.save({
        firstName,
        lastName,
        password: hashedPassword,
        email,
      });
    } catch (error) {
      const err = createHttpError(500, "Failed to register users into db.");
      throw err;
    }
  }
}
