# Rosco - https//roscobot.com

This is the source code for Rosco, a multi-functional Discord bot. If you are looking for the documentation to *use* the bot, you are quite lost. Please head here instead: https://wiki.roscobot.com

## Project Structure

```
- bot: This module contains all files used for the Discord bot.
  - api: The API is an extension of the bot and contained in its source code.
- web: This is a Reactjs app providing the front-end for the application.
- rosco-helm: The Helm Chart. Used for deploying on Kubernetes.
- wikijs: A Helm Chart as well. Used for deploying the Wiki service on Kubernetes.
```

For instructions on running each specific project, please refer to their individual `README.md` files.
