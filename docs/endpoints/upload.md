# Upload Endpoints

## Commit

> Endpoint: POST `/upload/`

Success:

```json
// Status 200
{
  "result": {
    "imageDriveId": "string<unqiue>",
    "optimizedmageDriveId": "string<unqiue>"
  }
}
```

Error:

```json
// Status: 404
{
  "error": "string"
}
```
