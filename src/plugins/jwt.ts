import jwt from "@elysiajs/jwt";
import Elysia from "elysia";

export const jwtPlugin = new Elysia().use(
  jwt({
    name: "zxJWT",
    secret: process.env.JWT_SECRET || "here",
    exp: "1d",
  }),
);
