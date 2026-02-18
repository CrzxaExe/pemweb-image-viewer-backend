# Schemas

## Image

```json
{
  "title": "string",
  "imageUrl": "string<url>", // url from gdrive
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
  "username": "string<unique>",
  "id": "string<unique>",
  "email": "email",
  "password": "hash",
  "profile": {
    "photoAlt?": "string<url>",
    "displayName?": "string"
  },
  "createAt": "date"
}
```
