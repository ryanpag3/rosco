# Rosco, A Discord Bot - [https//roscobot.com](https://roscobot.com)

This is the source code for Rosco, a multi-functional Discord bot. If you are looking for the documentation to *use* the bot, you are quite lost. Please head here instead: https://wiki.roscobot.com

## Project Structure

- **[bot](./bot)**: The Discord Bot
  - **[api](./bot/api)**: The API used by the `web` project. This module is an extension of `bot`.
- **[web](./web)**: ReactJS Web App
- **[rosco-helm](./rosco-helm)**: Helm Chart for the `bot` and `web` projects.
- **[wikijs](./wikijs)**: Helm Chart for deploying the wiki site.

For instructions on running each specific project, please refer to their individual `README.md` files.

## Project Dependencies

Please install the following if you are planning on developing on Rosco.

```
docker
docker-compose
yarn
node@16
```

## Deployment Order

It is recommended to take the following order when deploying each individual service.

1. Bot
1. API
1. Web
1. `(Optional)` Rosco Helm
1. `(Optional)` Wiki Helm