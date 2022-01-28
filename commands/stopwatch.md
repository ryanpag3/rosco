---
title: Stopwatch
description: 
published: true
date: 2022-01-27T18:40:18.396Z
tags: command
editor: markdown
dateCreated: 2022-01-27T05:59:50.573Z
---

## Introduction

Stopwatches can be used to track durations of time. 

## `create` - Create a stopwatch.

Issue `/stopwatch create` to create a new stopwatch.

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The unique name of the stopwatch. | `true` |
| `start-on-created` | Set to `True` or `False` depending on whether you want the stopwatch to start tracking right away. Default value is `True` | `false` |

### Examples

``` bash
/stopwatch create name: sw

/stopwatch create name: sw start-on-create: False
```

## `delete` - Delete a stopwatch.

Issue `/stopwatch delete` to delete a stopwatch.

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The name of the stopwatch you want to delete. | `true` |

### Examples

``` bash
/stopwatch delete name: sw
```

## `start` - Start a stopwatch.

Issue `/stopwatch start` to start a stopwatch. A stopwatch can only be started if it has been previously stopped or `/stopwatch create` was ran with `start-on-created` set to `False`.

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The name of the stopwatch you want to start. | `true` |

### Examples

``` bash
/stopwatch start name: sw
```

## `stop` - Stop a stopwatch.

Issue `/stopwatch stop` to start a stopwatch.

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The name of the stopwatch you want to stop. | `true` |

### Examples

``` bash
/stopwatch stop name: sw
```

## `reset` - Reset a stopwatch

Issue `/stopwatch reset` to reset a stopwatch to 00:00:00

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The name of the stopwatch you want to reset. | `true` |

### Examples

``` bash
/stopwatch reset name: sw
```

## `info` - Get stopwatch info

Issue `/stopwatch reset` to reset a stopwatch to 00:00:00

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The name of the stopwatch you want info on. | `true` |

### Examples

``` bash
/stopwatch info name: sw
```

## `list` - List all stopwatches

Issue `/stopwatch list` to list all stopwatches.

### Examples

``` bash
/stopwatch list
```

































