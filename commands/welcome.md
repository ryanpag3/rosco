---
title: Welcome
description: 
published: true
date: 2022-03-29T16:23:08.152Z
tags: command
editor: markdown
dateCreated: 2022-03-24T21:13:30.705Z
---

## Introduction

The bot allows you to send both public and private welcome messages. A **public** welcome message will be displayed on the configured channel via the `channel` property. A **private** welcome message will be sent to the user via direct message.

## `set` - Set the welcome message

Issue `/welcome set` to set a welcome message for your server. 

| Argument | Description | Required |
|----------|-------------|----------|
| `type` | The type of welcome message. Can be `PUBLIC` or `PRIVATE` | `true` |
| `channel` | If public,set the channel that the message sends to. | `false` |
| `title` | The title of the welcome message. | `true` |
| `message` | The message content of the welcome message. | `true` |

### Examples

``` bash
/welcome set type: PUBLIC channel: General title: Welcome to the server! message: Hey you! Welcome to the server. I hope you enjoy your stay!

/welcome set type: PRIVATE title: Welcome to the server! message: Hey you! Welcome to the server. I hope you enjoy your stay!
```

![welcome-set-example.png](/welcome-set-example.png)

## `enable` - Enable a welcome message

Issue `/welcome enable` to enable a welcome message. When enabled, the message will be sent to the user when invited to the server.

| Argument | Description | Required |
|----------|-------------|----------|
| `type` | The type of welcome message. Can be `PUBLIC` or `PRIVATE` | `true` |

### Examples

``` bash
/welcome enable type: PUBLIC

/welcome enable type: PRIVATE
```

![welcome-set-example.png](/welcome-set-example.png)

## `disable` - Disable a welcome message

Issue `/welcome enable` to disable a welcome message. When enabled, no message will be sent upon invite to the server.

| Argument | Description | Required |
|----------|-------------|----------|
| `type` | The type of welcome message. Can be `PUBLIC` or `PRIVATE` | `true` |

### Examples

``` bash
/welcome disable type: PUBLIC

/welcome disable type: PRIVATE
```

![welcome-disable-example.png](/welcome-disable-example.png)
