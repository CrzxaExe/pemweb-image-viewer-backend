import { describe, expect, it } from "bun:test";
import { app } from "../src";

describe("Test image endpoints", () => {
  it("Should get image by id", async () => {
    const res = await app.handle(
      new Request("http://localhost:3000/q/123", {
        method: "GET",
      }),
    );

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({});
  });

  it("Should create image", async () => {
    const res = await app.handle(
      new Request("http://localhost:3000/image/create", {
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

  it("Should delete image by id", async () => {
    const res = await app.handle(
      new Request("http://localhost:3000/image/delete/123", {
        method: "DELETE",
      }),
    );

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({});
  });

  it("Should update image by id", async () => {
    const res = await app.handle(
      new Request("http://localhost:3000/image/update/123", {
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
