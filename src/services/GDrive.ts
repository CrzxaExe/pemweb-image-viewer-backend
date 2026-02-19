import { google } from "googleapis";
import { Generator } from "../utils/Generator";

const auth = new google.auth.OAuth2(
  process.env.DRIVE_CLIENT,
  process.env.DRIVE_SECRET,
  "https://developers.google.com/oauthplayground",
);

auth.setCredentials({
  refresh_token: process.env.DRIVE_REFRESH_TOKEN,
});

const drive = google.drive({
  version: "v3",
  auth,
});

export class GDrive {
  static async upload(file: Buffer<ArrayBufferLike>, mimeType: string) {
    const res = await drive.files.create({
      requestBody: {
        name: Generator.id(),
        mimeType,
      },
      media: {
        mimeType,
        body: file,
      },
    });

    return res;
  }

  static async delete(fileId: string) {
    const res = await drive.files.delete({ fileId });

    return res;
  }

  static async update() {}

  static async read(fileId: string) {
    const res = await drive.files.get({
      fileId,
      fields: "id, name, webViewLink",
    });

    return res;
  }
}
