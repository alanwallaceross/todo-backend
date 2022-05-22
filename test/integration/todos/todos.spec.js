import supertest from "supertest";
import app from "../../../src/index";
// const requestWithSupertest = supertest(app);

describe("GET /todos", () => {
  afterEach(() => {
    app.close();
  });

  it("should export a webserver", async () => {
    await expect(typeof app).toEqual("object");
  });

  // describe("successful responses", () => {
  //   it("GET /todos should return array with todo with title 'Clean House'", async () => {
  //     const res = await requestWithSupertest.get("/todos");
  //     expect(res.status).toEqual(200);
  //     expect(res.type).toEqual(expect.stringContaining("json"));
  //     expect(res.body).toEqual({
  //       todos: [
  //         { id: "1", status: "pending", title: "Clean house", subtasks: [] },
  //       ],
  //     });
  //   });
  // });
});
