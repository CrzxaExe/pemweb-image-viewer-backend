import Elysia, { t } from "elysia";
import { GDrive } from "../services/GDrive";

const imageController = new Elysia()
  .get("/q/:id", () => ({}), {
    detail: {
      tags: ["Image"],
      hide: true,
      description: "Get image metadata from database",
    },
  })
  .post("/image/create", () => ({}), {
    detail: {
      tags: ["Image"],
      hide: true,
      description: "Create image metadata to database",
    },
  })
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
