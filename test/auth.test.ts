import { describe, expect, it } from "bun:test";
import { app } from "../src";

describe("Test auth endpoints", () => {
  it("Should register user", async () => {
    const res = await app.handle(
      new Request("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }),
    );

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({});
  });

  it("Should login user", async () => {
    const res = await app.handle(
      new Request("http://localhost:3000/auth/login", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }),
    );

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({});
  });
});
