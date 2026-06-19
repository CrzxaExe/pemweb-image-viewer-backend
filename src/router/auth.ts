import Elysia, { t } from "elysia";
import { Database } from "../utils/Database";

const authController = new Elysia({ prefix: "auth" })
  .post(
    "/register",
    async ({ body, status, redirect }) => {
      const { email, username, password } = body;

      try {
        const exist = await Database.db.findMany("users", { email, username });

        if (exist)
          return status("Found", { error: "Username or email already exist" });

        const result = Database.user.addOne({
          createAt: new Date().toString(),
          password,
          email,
          username,
        });

        redirect(process.env.FRONTEND_URL + "/auth/login");
      } catch (err: Error | any) {
        return status("Bad Request", { error: err.message });
      }
    },
    {
      body: t.Object({
        username: t.String({
          description: "Username",
          error: "Missing username",
        }),
        email: t.String({
          format: "email",
          description: "User email",
          error: "Missing email",
        }),
        password: t.String({
          minLength: 8,
          description: "User password",
          error: "Missing password",
        }),
      }),
      detail: {
        description: "Registering new account",
      },
    },
  )
  .patch("/login", ({ body, cookie, redirect }) => {}, {
    detail: { hide: true },
  });

export default authController;
