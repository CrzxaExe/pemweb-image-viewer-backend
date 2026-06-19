import Elysia, { t } from "elysia";
import { Database } from "../utils/Database";
import { Terminal } from "../utils/Terminal";
import { jwtPlugin } from "../plugins/jwt";
import bcrypt from "bcryptjs";

const authController = new Elysia({ prefix: "auth" })
  .use(jwtPlugin)
  .post(
    "/register",
    async ({ body, status, redirect }) => {
      const { email, username, password } = body;

      try {
        const exist = await Database.db.findMany("users", { email, username });

        if (exist)
          return status("Found", { error: "Username or email already exist" });

        const _ = Database.user.addOne({
          createAt: new Date().toString(),
          password,
          email,
          username,
        });

        redirect(process.env.FRONTEND_URL + "/auth/login");
      } catch (err: Error | any) {
        Terminal.error("Registration error", err);
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
        deprecated: true,
        tags: ["Auth"],
        description: "Registering new account",
      },
    },
  )
  .post(
    "/login",
    async ({ body, redirect, cookie: { auth }, zxJWT, status }) => {
      const { email, password } = body;

      try {
        const exist = await Database.db.findOne("users", { email });

        if (!exist) return status("Not Found", { error: "Email not found" });

        const isVerify = bcrypt.compare(password, exist.password);

        if (!isVerify)
          return status("Not Acceptable", { error: "Password dont match" });

        const token = await zxJWT.sign({
          username: exist.username,
          email: exist.email,
          displayName: exist.displayName,
        });

        auth.set({
          value: token,
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60 * 24,
        });

        return redirect(
          (process.env.FRONTEND_URL ?? "localhost:3000") + "/dashboard",
        );
      } catch (error: Error | any) {
        Terminal.error("Login error", error);
        return status("Bad Request", { error: error.message });
      }
    },
    {
      tags: ["Auth"],
      body: t.Object({
        email: t.String({
          format: "email",
          description: "Email login",
          error: "Email not valid",
        }),
        password: t.String({
          description: "Password login",
          error: "Password is missing",
        }),
      }),
    },
  );

export default authController;
