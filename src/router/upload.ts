import Elysia, { t } from "elysia";
import { Editor } from "../services/Editor";

const uploadController = new Elysia().post(
  "/upload",
  async ({ body, status }) => {
    const { files } = body;

    for (let file of files) {
      const buffer: ArrayBuffer = await file.arrayBuffer(),
        optimized = await Editor.optimized(buffer);
    }

    return status("Created", {
      files: files.map((e) => ({ name: e.name, type: e.type })),
    });
  },
  {
    body: t.Object({
      files: t.Files({
        description: "image files want to upload",
        readOnly: false,
        maxSize: "6m",
        type: "image/*",
      }),
    }),
  },
);

export default uploadController;
