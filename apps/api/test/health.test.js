import request from "supertest";
import { describe, expect, it } from "vitest";

import createApp from "../src/app.js";

describe("API health endpoints", () => {
  it("returns a healthy payload for GET /health", async () => {
    const app = createApp();

    const response = await request(app).get("/health").expect(200);

    expect(response.body).toMatchObject({
      success: true,
      data: {
        status: "ok",
        service: "api",
      },
    });
    expect(response.body.data.timestamp).toEqual(expect.any(String));
  });

  it("returns a JSON 404 for unknown routes", async () => {
    const app = createApp();

    const response = await request(app).get("/not-a-real-route").expect(404);

    expect(response.body).toMatchObject({
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "Route not found",
      },
    });
  });

  it("returns a success payload for POST /echo", async () => {
    const app = createApp();

    const response = await request(app)
      .post("/echo")
      .send({ message: "hello" })
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      data: {
        message: "hello",
      },
    });
  });

  it("returns a validation error response for invalid POST /echo input", async () => {
    const app = createApp();

    const response = await request(app).post("/echo").send({ message: "" }).expect(400);

    expect(response.body).toMatchObject({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Validation failed",
        details: expect.any(Array),
      },
    });
  });
});
