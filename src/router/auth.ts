import Elysia from "elysia";

const authController = new Elysia({ prefix: "auth" })
  .post("/register", () => ({}), { detail: { hide: true } })
  .patch("/login", () => ({}), { detail: { hide: true } });

export default authController;
