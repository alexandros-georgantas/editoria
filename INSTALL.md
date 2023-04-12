# Ketida Client

## Quick Start

Ketida client currently is provided in three versions which offer different features or permission configurations. In order to start the platform in any of the aforementioned versions you can use the following compose files (Docker).

### Vanilla

`docker compose up`

### OEN (Book planner feature)

`docker compose -f docker-compose.oen.yml up`

### Booksprint

`docker compose -f docker-compose.booksprint.yml up`

## Production

The following components should be up and running before Ketida Client:

- Ketida Server
- Ketida Server database
- EPUBchecker Service server
- EPUBchecker Service database
- PagedJS Service server
- PagedJS Service database
- XSweet Service server
- XSweet Service database
- ICML Service server
- ICML Service database
- Min:io server or configured S3 object store

The production image of Ketida client consists of bundle of the application code as well as application's assets served by an `nginx` server.

## Process

The client build requires the following environment variables to be passed to its context:

```
SERVER_PROTOCOL
SERVER_HOST
SERVER_PORT
CLIENT_PORT
LOCKS_WS_URL
CLIENT_WS_MIN_TIMEOUT
CLIENT_WS_TIMEOUT
FEATURE_BOOK_STRUCTURE
FEATURE_UPLOAD_DOCX_FILES
```

- **SERVER_PROTOCOL:** `http` or `https` based on your setup of the deployed Ketida server
- **SERVER_HOST:** the host part of your public `URL` of the deployed Ketida server
- **SERVER_PORT:** the server port of the deployed Ketida server, if applies
- **CLIENT_PORT:** the port where the Ketida client will be exposed
- **LOCKS_WS_URL:** the public `URL` where the websocket server dedicated to the chapter locks mechanism listens to.
- **CLIENT_WS_MIN_TIMEOUT:** more info [here](https://www.apollographql.com/docs/react/api/link/apollo-link-ws/#options-1)
- **CLIENT_WS_TIMEOUT:** more info [here](https://www.apollographql.com/docs/react/api/link/apollo-link-ws/#options-1
- **FEATURE_UPLOAD_DOCX_FILES:** true/false flag which enables/disables the ingest docx files feature
- **FEATURE_BOOK_STRUCTURE:** true/false flag which enables/disables the book planner feature

In order for someone to build the production image of Ketida client, a good example is the provided [docker compose production instructions](https://gitlab.coko.foundation/ketida/vanilla-client/-/blob/main/docker-compose.production.yml)
