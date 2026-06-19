import Elysia, { t } from "elysia";
import { Database } from "../utils/Database";
import { Terminal } from "../utils/Terminal";
import { User } from "../types/Schema-Type";
import { ObjectId } from "mongodb";

const userController = new Elysia({ prefix: "user" })
  // Insert user
  .post(
    "/",
    async ({ body, path, status }) => {
      try {
        const res = await Database.user.addOne({
          ...body,
          createAt: Date.now().toString(),
        });

        const success = res?.insertedId;

        if (!success) throw new Error("Error on creating user metadata");

        return status("OK", { success: true });
      } catch (error: { message: string } | any) {
        Terminal.error(path, error);
        return status("Bad Request", { success: false, error: error.message });
      }
    },
    {
      body: t.Object({
        username: t.String({
          minLength: 6,
          description: "Username of the account",
        }),
        email: t.String({
          format: "email",
          description: "Account email",
        }),
        password: t.String({
          minLength: 8,
          description: "Password of the account",
        }),
      }),
      detail: {
        tags: ["User"],
        description: "Create user metadata to database",
        requestBody: {
          content: {
            "application/json": {
              example: {
                username: "CrzxaExe3",
                email: "example@gmail.com",
                password: "crzxaexe3",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successfully to create user metadata",
            content: {
              "application/json": {
                example: {
                  status: true,
                },
              },
            },
          },
          "400": {
            description: "Failed to adding user metadata",
            content: {
              "application/json": {
                example: {
                  status: false,
                  error: "Error Message",
                },
              },
            },
          },
          "422": {
            description: "Validation error",
            content: {
              "application/json": {
                example: {
                  "...": "elysia.validation.error",
                },
              },
            },
          },
        },
      },
    },
  )
  // Get User
  .get(
    "/id/:id",
    async ({ params, status, path }) => {
      const { id } = params;

      try {
        const res = (await Database.user.findId(id)) as
          | Partial<User>
          | undefined;
        if (!res) return status("Not Found", {});

        delete res.password;

        return status("OK", res);
      } catch (error: { message: string } | any) {
        Terminal.error(path, error);
        return status("Bad Request", { error: error.message });
      }
    },
    {
      params: t.Object({
        id: t.String({ description: "Id of the user" }),
      }),
      detail: {
        tags: ["User"],
        description: "Get user metadata from database",
        responses: {
          "200": {
            description: "Successfully get user metadata",
            content: {
              "application/json": {
                example: {
                  _id: "ObjectId(xxxxxxxxxxxx)",
                  username: "CrzxaExe3",
                  email: "example@gmail.com",
                  "...": "...",
                },
              },
            },
          },
          "400": {
            description: "Failed to get user metadata",
            content: {
              "application/json": {
                example: {
                  error: "Error message",
                },
              },
            },
          },
          "404": {
            description: "User not found in database",
            content: {
              "application/json": {
                example: {},
              },
            },
          },
        },
      },
    },
  )
  // Search User
  .get(
    "/:username",
    async ({ params, status, path }) => {
      const { username } = params;

      try {
        const res = (await Database.user.findUsername(username)) as
          | Partial<User>[]
          | undefined;
        if (!res || res.length < 1) return status("Not Found", []);

        res.forEach((e) => delete e?.password);

        return status("OK", res);
      } catch (error: { message: string } | any) {
        Terminal.error(path, error);
        return status("Bad Request", { error: error.message });
      }
    },
    {
      params: t.Object({
        username: t.String({ description: "Username" }),
      }),
      detail: {
        tags: ["User"],
        description: "Get users metadata with similar username from database",
        responses: {
          "200": {
            description: "Successfully get users metadata",
            content: {
              "application/json": {
                example: [
                  {
                    _id: "ObjectId(xxxxxxxxxxxx)",
                    username: "CrzxaExe3",
                    email: "example@gmail.com",
                    "...": "...",
                  },
                ],
              },
            },
          },
          "400": {
            description: "Failed to get users metadata",
            content: {
              "application/json": {
                example: {
                  error: "Error message",
                },
              },
            },
          },
          "404": {
            description: "Users not found in database",
            content: {
              "application/json": {
                example: [],
              },
            },
          },
        },
      },
    },
  )
  // Delete user
  .delete(
    "/:id",
    async ({ params, status, path }) => {
      const { id } = params;

      try {
        const res = (await Database.db.findOneAndUpdate(
          "users",
          {
            _id: new ObjectId(id),
          },
          { deleted: true },
        )) as Partial<User> | undefined;

        if (!res) return status("Not Found", {});

        delete res.password;

        return status("OK", res);
      } catch (error: { message: string } | any) {
        Terminal.error(path, error);
        return status("Bad Request", { success: false, error: error.message });
      }
    },
    {
      params: t.Object({
        id: t.String({ description: "Id of the user" }),
      }),
      detail: {
        tags: ["User"],
        description: "Delete user metadata from database",
        responses: {
          "200": {
            description: "Successfuly to delete user",
            content: {
              "application/json": {
                example: {
                  _id: "Object(xxxxxxxxxxxxxx)",
                  username: "CrzxaExe3",
                  email: "example@gmail.com",
                  "...": "...",
                },
              },
            },
          },
          "400": {
            description: "User input not valid",
            content: {
              "application/json": {
                example: {
                  error: "Error message",
                },
              },
            },
          },
          "404": {
            description: "User not found on database",
            content: {
              "application/json": {
                example: {},
              },
            },
          },
        },
      },
    },
  )
  // Update user
  .patch(
    "/:id",
    async ({ body, params, status }) => {
      const { id } = params;
      const model = { ...body, _id: id };

      try {
        const res = await Database.user.findOneAndupdate(model);

        return status("OK", { success: true, user: res });
      } catch (error: { message: string } | any) {
        Terminal.error(error);
        return status("Bad Request", { success: false, error });
      }
    },
    {
      body: t.Object({
        displayName: t.Optional(t.String()),
        avatarUrl: t.Optional(t.String()),
        password: t.Optional(t.String()),
      }),
      params: t.Object({
        id: t.String({ description: "user id" }),
      }),
      detail: {
        tags: ["User"],
        description: "Updating user data",
        responses: {
          "200": {
            description: "Success updating user data",
            content: {
              "application/json": {
                example: {
                  success: true,
                  user: {
                    _id: "userId",
                    username: "CrzxaExe",
                    displayName: "CrzxaExe3",
                    avatarUrl: "url",
                  },
                },
              },
            },
          },
          "400": {
            description: "User input error",
            content: {
              "application/json": {
                example: {
                  success: false,
                  error: "error message",
                },
              },
            },
          },
        },
      },
    },
  );

export default userController;
