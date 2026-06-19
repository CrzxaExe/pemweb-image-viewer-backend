// import { describe, expect, it } from "bun:test";
// import { app } from "../api";

// const imageId: string[] = [];

// describe("Test uploading file", () => {
//   it("Should success", async () => {
//     const form = new FormData();

//     form.append("files", Bun.file("./test/test_file.jpg"));

//     const res = await app.handle(
//       new Request("http://localhost:3000/drive/upload", {
//         method: "POST",
//         body: form,
//       }),
//     );

//     const json = await res.json();

//     expect(res.status).toBe(201);
//     expect(json.files[0].original.mimeType).toBe("image/jpeg");
//     expect(json.files[0].optimized.mimeType).toBe("image/webp");

//     imageId.push(json.files[0].original.id, json.files[0].optimized.id);
//   });
// });

// describe("Test deleting file by id", () => {
//   it("Should success", async () => {
//     const promises = imageId.map(async (id) => {
//       const res = await app.handle(
//         new Request("http://localhost:3000/drive/delete/" + id, {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }),
//       );
//       const json = await res.json();
//       console.log(res.status, id);

//       expect(res.status).toBe(200);
//       expect(json.success).toBe(true);
//     });

//     await Promise.all(promises);
//   });
// });
