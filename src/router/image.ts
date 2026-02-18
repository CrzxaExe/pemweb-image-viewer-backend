import Elysia from "elysia";

const imageController = new Elysia()
  .get("/q/:id", () => {})
  .post("/upload", () => {})
  .delete("/q/:id", () => {})
  .patch("/q/:id", () => {});

export default imageController;
