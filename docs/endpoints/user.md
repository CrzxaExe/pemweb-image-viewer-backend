# User Endpoint

## Get by username

> Endpoint: GET `/user/{username}`

Success:

```json
// Status 200
{
  "result": {
    "username": "string<unique>",
    "profile": {
      "photoAlt?": "string<url>",
      "displayName?": "string"
    },
    "createAt": "date"
  }
}
```

Error:

```json
// Status 4xx
{
  "error": "string"
}
```

## Create

> Endpoint: POST `/user/create`

```json
{
  "username!": "string<unique>"
}
```

Success:

```json
// Status 201
{
  "success": true
}
```

Error:

```json
// Status 4xx
{
  "success": false,
  "error": "string"
}
```

## Update

> Endpoint: PATCH `/user/{id}`

Success:

```json

```

Error:

```json

```

## Delete

> Endpoint: GET `/user/{username}`

Success:

```json

```

Error:

```json

```
