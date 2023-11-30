import request from "supertest";
import app from "../../src/app";
import { User } from "../../src/entity/User";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../src/config/data-source";

describe("POST  /auth/register", () => {
  let connection: DataSource;

  beforeAll(async () => {
    connection = await AppDataSource.initialize();
  });

  beforeEach(async () => {
    // database truncate
    await connection.dropDatabase();
    await connection.synchronize();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  describe("Given all fields", () => {
    it("should return 201 code", async () => {
      // AAA FORMULA
      // Arrange
      const userData = {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@gmail.com",
        password: "secret",
      };
      // Act
      const response = await request(app).post("/auth/register").send(userData);
      // Assert
      expect(response.statusCode).toBe(201);
    });

    it("should return valid JSON response", async () => {
      // Arrange
      const userData = {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@gmail.com",
        password: "secret",
      };
      // Act
      const response = await request(app).post("/auth/register").send(userData);
      // Assert
      expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
    });

    it("should persist the user in the database", async () => {
      // Arrange
      const userData = {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@gmail.com",
        password: "secret",
      };
      // Act
      await request(app).post("/auth/register").send(userData);
      // Assert
      const userRepositary = connection.getRepository(User);
      const users = await userRepositary.find();
      // console.log(users);

      expect(users).toHaveLength(1);
      const user = users[0];
      expect(user.firstName).toBe(userData.firstName);
      expect(user.lastName).toBe(userData.lastName);
      expect(user.email).toBe(userData.email);
    });

    it("should stored password into hash form into db", async () => {
      // Arrange
      const userData = {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@gmail.com",
        password: "secret",
      };
      // Act
      await request(app).post("/auth/register").send(userData);
      const userRepositary = connection.getRepository(User);
      const users = await userRepositary.find();
      const user = users[0];
      // Assert
      expect(user.password).not.toBe(userData.password);
      expect(user.password).toHaveLength(60); // hash is 60 charecters long
      // $[algorithm]$[cost]$[salt][hash] see more details on bcrypt docmentation
      expect(user.password).toMatch(/^\$2b\$\d{2}\$/);
    });
  });

  describe("Fields are missing", () => {
    it("should return 400 status code when email is not given", async () => {
      // Arrange
      const userData = {
        firstName: "John",
        lastName: "Doe",
        password: "secret",
      };
      //  Act
      const response = await request(app).post("/auth/register").send(userData);
      const userRepositary = connection.getRepository(User);
      const users = await userRepositary.find();
      //  Assert
      expect(response.statusCode).toBe(400);
      // Also check user is not saved
      expect(users).toHaveLength(0);
    });
  });
});
