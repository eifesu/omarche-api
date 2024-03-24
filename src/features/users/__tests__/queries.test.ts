import database from "@/database/prisma";
import supertest from "supertest";
import app from "@/app";

const request = supertest(app);

describe("Get users", () => {
  beforeAll(async () => {
    await database.user.deleteMany();
  });

  it("should be empty if no users", async () => {
    const response = await request.get("/users");
    console.log(response.body);
    expect(response.body.length).toBe(0);
  });
});
