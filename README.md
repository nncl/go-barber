# Go Barber

Testing Node + SQL :grimacing:

## Getting Started

Make sure you have Yarn installed globally on your machine, then run:

```
$ yarn install
```

Once everything is okay, you can run the server:

```
$ yarn start
```

Or for development purposes:

```
$ yarn dev
```

### Docker

Install Postgres through [Docker Hub](https://hub.docker.com/_/postgres):

```
$ docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```
