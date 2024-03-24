import app from "@/app";
import database from "@/database/prisma";
import supertest from "supertest";
import generateFakeUserData from "@/utils/userFactory";

const request = supertest(app);

describe("Create user", () => {
  beforeAll(async () => {
    await database.user.deleteMany();
  });

  it("should create a user", async () => {
    const userData = generateFakeUserData();
    await request.post("/users").send(userData);

    const users = await database.user.findMany();

    expect(users.length).toBe(1);
  });
});
