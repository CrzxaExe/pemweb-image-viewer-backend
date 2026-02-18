import Elysia from "elysia";

const authController = new Elysia()
  .post("/user/sign", () => {})
  .post("/user/create", () => {})
  .patch("/user/update/:id", () => {});

export default authController;
