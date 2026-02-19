import Elysia from "elysia";

const imageController = new Elysia()
  .get("/q/:id", () => {})
  .post("/image/create", () => {})
  .delete("/image/delete/:id", () => {})
  .patch("/image/update/:id", () => {});

export default imageController;
