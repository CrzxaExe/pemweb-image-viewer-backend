import { ObjectId } from "mongodb";

export type ImageSchema = {
  _id: ObjectId; // id

  title: string;
  imageDriveId: string;
  optimizedImageDriveId: string;

  context: {
    author: string;
    mimetype: string;
    size: number;
  };

  createAt: string;
};

export type UserSchema = {
  _id: ObjectId; // private id
  username: string; // public id

  email: string; // it will be change to using branded type
  password: string; // hashing string
  createAt: string;

  avatarUrl: string;
  displayName: string;
};
