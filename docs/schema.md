# Schemas

## Content

```json
{
  "title": "string",
  "imageDriveId": "string<unique>", // url from gdrive
  "optimizedImageDriveId": "string<unique>", // url from gdrive
  "id": "string<unique>",
  "context": {
    "author": "string<unique>", // user id
    "mimetype": "mimetype",
    "size": 260 // file size
  },
  "createAt": "date"
}
```

## User

```json
{
  "username": "string<unique>", // Public id
  "id": "string<unique>", // Private id
  "email": "email",
  "password": "hash",
  "avatarUrl?": "string<url>",
  "displayName?": "string",
  "createAt": "date"
}
```
