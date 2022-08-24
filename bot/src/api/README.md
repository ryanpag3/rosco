# API

This project is an extension of the bot project. It runs from the same docker image and logs into Docker using the same API. It just doesn't enable event listening to act on it. 

## Project Structure

The project is generally flat, with each subdirectory being defined based on the scope of the endpoint. For example, you can find the authentication-related code in [`./auth`](./auth).

`*-route.ts` files are used for defining the API specifications. It generates to a Swagger doc. 

`*-controller.ts` files contain the top-level business logic of the endpoint and are responsible for the HTTP response.

Any reusable logic is abstracted out into the broader bot project, likely under [`../service`](../service/) or [`../util`](../util).

## Setup

You must have the [required dependencies](../README.md#project-dependencies) installed before performing these steps.

### Deploy development services

Rosco uses **postgres** and **redis** for its various functionalities.

Use the following command to start them.

``` bash
docker-compose up -d db redis
```

### Node Dependencies

You should have **already** installed your dependencies with node in the `bot` project setup steps. If you have not, [please head back there and do that first](../../../bot/).

### Running the project

You have a few choices.

You can invoke the entrypoint script directly.

``` bash
npx ts-node index.ts
```

Or you can navigate to the `bot` project root folder and run the following shortcut.

``` bash
yarn wapi
```

### Docker

There are no special requirements for Docker for this project.