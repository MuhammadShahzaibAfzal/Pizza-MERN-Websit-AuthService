import { Repository } from "typeorm";
import { User } from "../entity/User";
import { UserData } from "../types";

export class UserService {
  // DEPENDENCY INJECTIOn
  constructor(private userRepositary: Repository<User>) {}
  async create({ firstName, lastName, email, password }: UserData) {
    await this.userRepositary.save({
      firstName,
      lastName,
      password,
      email,
    });
  }
}
