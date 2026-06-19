import Elysia, { t } from "elysia";
import { Editor } from "../services/Editor";
import { GDrive } from "../services/GDrive";
import { drive_v3 } from "googleapis";
import { jwtPlugin } from "../plugins/jwt";

const driveController = new Elysia({ prefix: "/drive" }).use(jwtPlugin).guard(
  {
    async beforeHandle({ zxJWT, cookie: { auth }, status }) {
      const token = await zxJWT.verify(auth.value as string);

      if (!token) return status("Unauthorized");
    },
  },
  (drive) =>
    drive
      .post(
        "/upload",
        async ({ body, status }) => {
          const { files } = body;
          const uploaded: {
            original: drive_v3.Schema$File;
            optimized: drive_v3.Schema$File;
          }[] = [];

          for (let file of files) {
            const buffer: ArrayBuffer = await file.arrayBuffer(),
              optimize = await Editor.optimized(buffer);

            const original = await GDrive.upload(
              Buffer.from(buffer),
              file.type,
              "." + file.name.split(".").pop()!,
            );
            const optimized = await GDrive.upload(
              optimize,
              "image/webp",
              ".webp",
            );

            uploaded.push({
              original: original.data,
              optimized: optimized.data,
            });
          }

          return status(201, {
            files: uploaded,
          });
        },
        {
          body: t.Object({
            files: t.Files({
              description: "Images want to upload to GDrive",
              readOnly: false,
              maxSize: "3m",
              type: "image/*",
            }),
          }),
          detail: {
            tags: ["Drive"],
            description: "Uploading image to GDrive",
            responses: {
              "201": {
                description: "File was successfull uploaded",
                content: {
                  "application/json": {
                    example: {
                      files: [
                        {
                          original: "image-drive-id",
                          optimized: "image-drive-id",
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      )
      .delete(
        "/delete/:id",
        async ({ params, status }) => {
          const { id } = params;

          try {
            if (!id) throw new Error("Missing id");

            const res: Awaited<ReturnType<typeof GDrive.delete>> =
              await GDrive.delete(id);

            return status(200, { success: res.ok });
          } catch (error: Error | any) {
            return status("Bad Request", { error: error.message });
          }
        },
        {
          params: t.Object({
            id: t.String({ description: "Id of the imageDrive" }),
          }),
          detail: {
            tags: ["Drive"],
            description: "Delete image with matching id on GDrive",
            responses: {
              "200": {
                description: "Successfull to delete image from GDrive",
                content: {
                  "application/json": {
                    example: {
                      success: true,
                    },
                  },
                },
              },
              "400": {
                description: "Failed to delete image",
                content: {
                  "application/json": {
                    example: {
                      success: false,
                      error: "Error Message",
                    },
                  },
                },
              },
            },
          },
        },
      ),
);

export default driveController;
