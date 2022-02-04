---
title: Announce
description: Run various commands related to announcements.
published: true
date: 2022-02-04T22:33:28.787Z
tags: command
editor: markdown
dateCreated: 2022-02-04T22:33:28.787Z
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

## `delete` - Delete an announcement

Issue `/announce delete` to delete an announcement.

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The unique name of the announcement. | `true` |

### Examples

``` bash
/announce delete name: test
```

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