import { describe, expect, it } from "bun:test";
import { app } from "../src";

describe("Test app response", async () => {
  it("Should return test while message", async () => {
    const res = await app.handle(new Request("http://localhost:3000/"));
    expect(res.status).toBe(200);

    const json = await res.json();

    console.log(json);
  });
});
