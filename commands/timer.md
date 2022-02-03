---
title: Timer
description: Commands related to Timer functionality.
published: true
date: 2022-02-03T17:18:13.537Z
tags: command
editor: markdown
dateCreated: 2022-02-03T17:18:13.537Z
---

## Introduction

Timers allow you to announce messages after periods of time. Give your friend 10 minutes to get back from that Taco Bell run. See how many times someone can respawn in 30 seconds. The world is your oyster.

## `create` - Create a timer

Issue `/timer create` to create a timer.

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | A unique name identifying the timer. | `true` |
| `time` | The amount of time in the countdown. Format is `dd:hh:mm:ss`. For example `01:01:01:01` would be 1 day, 1 hour, 1 minute and 1 second countdown. | `true` |
| `message` | An optional message to display when the timer reaches 0. | `false` |

### Examples

``` bash
# Display the message after 1 minute
/timer create name: test time: 00:00:01:00 message: You have one minute!

# Display the message after 4 days, 20 hours, 1 minute, and 10 seconds
/timer create name: test time: 04:20:01:10
```

## `delete` - Delete a timer

Issue `/timer delete` to delete a timer.

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The name of the timer you want to delete. | `true` |

### Examples

``` bash
/timer delete name: test
```

## `pause` - Pause a timer

Issue `/timer pause` to pause a timer. Issue `/timer pause` *again* to unpause the timer.

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The name of the timer you want to pause/unpause. | `true` |

### Examples

``` bash
/timer pause name: test
```

## `info` - Get info on timer

Issue `/timer info` to get info on a timer. 

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The name of the timer you want info on. | `true` |

### Examples

``` bash
/timer info name: test
```




























