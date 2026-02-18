# Image Endpoints

## Get

> Endpoint: GET `/g/{imageId}`

Success:

```json
// Status 302
{
    "result": {
        ...ImageSchema
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

## Create

> Endpoint: POST `/image/create`

```json
{
  "title!": "string",
  "author!": "string<unique>", // user id
  "files!": [Images]
}
```

Success:

```json
// Status 200
{
  "success": true,
  "result": {
    ...ImageSchema
  }
}
```

Error:

```json
// Status: 4xx
{
  "success": false,
  "error": "string"
}
```

## Delete

> Endpoint: DELETE `/image/delete/{imageId}`

Success:

```json
// Status 200
{
  "success": true
}
```

Error:

```json
// Status: 4xx
{
  "success": false,
  "error": "string"
}
```

## Update

> Endpoint: PATCH `/image/update/{imageId}`

```json
{
  "title": "string",
  "author!": "string<unique>" // to check ownership
}
```

Success:

```json
// Status 200
{
  "success": true,
  "result": {
    ...ImageSchema // updated data
  }
}
```

Error:

```json
// Status: 4xx
{
  "success": false,
  "error": "string"
}
```
