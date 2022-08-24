# Web

If you are looking for documentation on *using* Rosco. Please head here: [https://wiki.roscobot.com](https://wiki.roscobot.com)

## Setup

You must have the [required dependencies](../README.md#project-dependencies) installed before performing these steps.

### Deploy development services

Rosco uses **postgres** and **redis** for its various functionalities.

Use the following command to start them.

``` bash
docker-compose up -d db redis
```

This project **also** requires the API module to be running. Please refer to [here](../bot/src/api) for more information.

### Install Node Dependencies

Run the following to install the required dependencies.

``` bash
yarn install
```

### Configure the service

By default the webapp assumes production configuration. You can override them for development by making a file named `.env` in the root of this project and populating it with the following values.

``` properties
REACT_APP_API_URL=http://localhost:3000
REACT_APP_CLIENT_ID=REPLACE_ME
REACT_APP_REDIRECT_URI=http://localhost:3000/callback
```

### Running the app

You can run the app using the following command.

``` bash
yarn start
```

It will be available at [http://localhost:8080](http://localhost:8080) if working correctly.

### Docker

Please refer to the project [Dockerfile](Dockerfile) for more information on building the docker image.