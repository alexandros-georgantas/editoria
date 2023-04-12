# General Requirements

Vanilla client is the web application of Ketida Platform build on top of [Coko Client](https://gitlab.coko.foundation/cokoapps/client). The technologies used for the development of the client are:

- [React](https://react.dev/) v17.x
- [Styled Components](https://www.postgresql.org/) v4.x
- [GraphQL](https://www.apollographql.com/)

## Docker

The vanilla client is fully dockerized and plays nicely with Docker version 20.10.23 and Compose 2.15.1

- [Installing docker](https://docs.docker.com/engine/install)
- [Docker without sudo](https://docs.docker.com/engine/install/linux-postinstall/)
- [Installing Docker Compose](https://docs.docker.com/compose/install/)

## Ketida Server

Ketida server is the core reusable component of our publishing platform build on top of [Coko Server](https://gitlab.coko.foundation/cokoapps/server). In order for Vanilla client to be functional, Ketida server should be up and running along with all its dependencies [Coko Server deployment](https://gitlab.coko.foundation/ketida/server/-/blob/main/INSTALL.md)
