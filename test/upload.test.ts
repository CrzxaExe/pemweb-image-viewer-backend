import { describe, expect, it } from "bun:test";
import { app } from "../src";

describe("Test uploading file", () => {
  it("Should success", async () => {
    const form = new FormData();

    form.append("files", Bun.file("./test/test_file.jpg"));

    const res = await app.handle(
      new Request("http://localhost:3000/upload", {
        method: "POST",
        body: form,
      }),
    );

    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.files[0].name).toBe("./test/test_file.jpg");
    expect(json.files[0].type).toBe("image/jpeg");
  });
});
