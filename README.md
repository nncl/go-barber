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

#### Queue

Yeah, we've got queue on our app, that's true. Sending e-mails and stuff requires that. So, as this is a separated process, you can do just:

```
$ yarn queue
```

### Docker

Install Postgres through [Docker Hub](https://hub.docker.com/_/postgres):

```
$ docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

Later on, install Mongo DB:

```
$ docker run --name mongobarber -p 27017:27017 -d -t mongo
```

And least but not last:

```
$ docker run --name redisbarber -p 6379:6379 -d -t redis:alpine
```

#### Useful commands

```
$ docker ps
$ docker ps -a
$ docker start <name>
$ docker start database redisbarber mongobarber
```

### Database

Make sure your database is properly configured, then run:

```
$ yarn sequelize db:migrate
```
