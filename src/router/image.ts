import Elysia, { t } from "elysia";
import { GDrive } from "../services/GDrive";
import { Terminal } from "../utils/Terminal";
import { Database } from "../utils/Database";
import { Image } from "../types/Schema-Type";
import { Generator } from "../utils/Generator";

const imageController = new Elysia()
  .get("/q/:id", () => ({}), {
    detail: {
      tags: ["Image"],
      hide: true,
      description: "Get image metadata from database",
    },
  })
  .post(
    "/image/create",
    async ({ body, status }) => {
      const { context, imageId, optimizedImageId, title } = body;

      try {
        const author = await Database.db.findOne("users", {
          username: context.author,
        });

        if (!author)
          return status("Not Found", { error: "Username not found" });

        const result = await Database.db.addOne<Image>("images", {
          imageId: Generator.id(),
          createAt: new Date().toISOString(),
          imageDriveId: imageId,
          optimizedImageDriveId: optimizedImageId,
          context,
          title,
        });

        if (!result?.insertedId) throw new Error("Someting went wrong");

        return status(200, result);
      } catch (error: Error | any) {
        Terminal.error("Image create error", error.message);
        return status("Bad Request", { error: error.message });
      }
    },
    {
      body: t.Object({
        title: t.String({
          description: "Image title",
          error: "Missing image title",
        }),
        imageId: t.String({
          description: "Original image id",
          error: "Original image id is missing",
        }),
        optimizedImageId: t.String({
          description: "Optimized image id",
          error: "Optimized image id is missing",
        }),
        context: t.Object({
          author: t.String({
            description: "Username",
            error: "Author username is missing",
          }),
          mimetype: t.String({
            description: "Image mimetype",
            error: "Image mimetype is missing",
          }),
        }),
      }),
      detail: {
        tags: ["Image"],
        hide: true,
        description: "Create image metadata to database",
      },
    },
  )
  .delete("/image/delete/:id", () => ({}), {
    detail: {
      tags: ["Image"],
      hide: true,
      description: "Delete image metadata from database",
    },
  })
  .patch("/image/update/:id", () => ({}), {
    detail: {
      tags: ["Image"],
      hide: true,
      description: "Update image metadata from database",
    },
  });

export default imageController;
