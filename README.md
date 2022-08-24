# Rosco, A Discord Bot - [https//roscobot.com](https://roscobot.com)

This is the source code for Rosco, a multi-functional Discord bot. If you are looking for the documentation to *use* the bot, you are quite lost. Please head here instead: https://wiki.roscobot.com

## Project Structure

- **[bot](./bot/README.md)**: The Discord Bot
  - **[api](./bot/api/README.md)**: The API used by the `web` project. This module is an extension of `bot`.
- **[web](./web/README.md)**: ReactJS Web App
- **[rosco-helm](./rosco-helm/README.md)**: Helm Chart for the `bot` and `web` projects.
- **[wikijs](./wikijs/README.md)**: Helm Chart for deploying the wiki site.

```
- bot: The Discord Bot
  - api: The API for the "web" project. An extension of the bot.
- web: ReactJS Web App
- rosco-helm: Helm Chart for Bot and Web App
- wikijs: Helm Chart for Wiki
```

For instructions on running each specific project, please refer to their individual `README.md` files.
