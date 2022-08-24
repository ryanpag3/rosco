# Bot

If you are looking for documentation on *using* Rosco. Please head here: [https://wiki.roscobot.com](https://wiki.roscobot.com)

## Setup

You must have the [required dependencies](../README.md#project-dependencies) installed before performing these steps.

### Deploy development services

Rosco uses **postgres** and **redis** for its various functionalities.

Use the following command to start them.

``` bash
docker-compose up -d db redis
```

### Install Node Dependencies

Run the following to install the required dependencies.

``` bash
yarn install
```

### Configure the bot

Before you can run the bot, you need to setup some configuration.

All configuration for the bot is driven by environment variables. 

The easiest way to manage your configuration is by copying the file [`.env.template`](.env.template) and naming it `.env`. As long as it is located inside this project the bot will automatically pick it up and read it. 

There are several configuration values inside [`.env.template`](.env.template), please refer to the comments in that file for instructions on what their usage is.

### Run the bot

Once you have completed the previous steps, you can now run the bot. The following command will start the bot and listen for changes to the code.

```
yarn w
```

You can find additional launch configurations in the [package.json](package.json) file.

### Run the tests

**important:** postgres and redis must be running before performing the tests

```
yarn j
```

If you want code coverage as well

```
yarn jest
```