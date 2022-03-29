---
title: Announce
description: Run various commands related to announcements.
published: true
date: 2022-03-29T01:45:01.118Z
tags: command
editor: markdown
dateCreated: 2022-03-24T21:12:40.202Z
---

## Introduction

Announcements allow you to schedule messages to be sent in the future. 

Don't forget, you can configure your timezone with `/timezone` for the best user experience.

## `create` - Create an announcement

Issue `/announce create` to create an announcement. 

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The unique name of the announcement. | `true` |
| `channel` | The channel to announce in. | `true` |
| `when` | When to make the announcement. Plain english (e.g `in 5 hours`) supported. | `true` |
| `message` | The message to display when the date occurs. | `true` |

### Examples

``` bash
/announce create name: test channel: General when: in 1 hour message: sweet!

/announce create name: test channel: General when: 01/01/2023 message: Happy New Year!/
```

![announcement-create-example.png](/announcement-create-example.png)

## `delete` - Delete an announcement

Issue `/announce delete` to delete an announcement.

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The unique name of the announcement. | `true` |

### Examples

``` bash
/announce delete name: test
```

![announcement-delete-example.png](/announcement-delete-example.png)

## `list` - List announcements

Issue `/announce list` to get a list of current announcements.

| Argument | Description | Required |
|----------|-------------|----------|
| `page` | Increase to 2 or more to see more results. | `false` |

### Examples

``` bash
/announce list

/anounce list page: 2
```

![announcement-list-example.png](/announcement-list-example.png)