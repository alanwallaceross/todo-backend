import supertest from "supertest";
import app from "./index";
const requestWithSupertest = supertest(app);

describe("./index", () => {
  afterEach(async () => {
    await app.close();
  });

  it("should export a webserver", async () => {
    await expect(typeof app).toEqual("object");
  });

  it("GET / should return 'Hello Alan'", async () => {
    const res = await requestWithSupertest.get("/");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("text/html"));
    expect(res.text).toEqual("Hello Alan");
  });
});
