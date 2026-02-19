import Elysia from "elysia";
import imageController from "./image";
import authController from "./auth";
import uploadController from "./upload";

/**
 * Application route controller
 */
const router = new Elysia()
  .get("/", () => ({ message: "test" }))

  // AuthController
  .use(authController)

  // ImageController
  .use(imageController)

  // Upload Controller
  .use(uploadController);

export default router;
