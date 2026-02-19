import Elysia from "elysia";

const authController = new Elysia()
  .post("/auth/register", () => {})
  .patch("/auth/login", () => {});

export default authController;
