## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Prerequisites

- Node v20 or higher, (I'm using  v20.12.1)

You can use it via nvm executing

```bash
$ nvm install 20
$ nvm use 20
```


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Unit Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Tests de integración
Para correr los test de integración hay que seguir tres pasos.

1- Correr el servicio de usuarios en modo test usando
```bash
$ cd "user service path"
$ npm install
$ npm run start:test
```

Esto hará que los tests no provoquen datos basura en la DB productiva.

2- Correr el servicio de notificaciones usando
```bash
$ cd "notification path"
$ npm install
$ npm start
```

3- Correr los test de integración en product service usando
```bash
$ cd "product service path"
$ npm install
$ npm run test:e2e
```
