---
title: Poll
description: 
published: true
date: 2022-01-27T22:06:06.487Z
tags: command
editor: markdown
dateCreated: 2022-01-27T06:00:30.235Z
---

## Introduction

Polls allow your users to vote on a defined topic. Upon completion, polls can be closed and results announced.

## Tips

### Voting on a poll

When a poll is created, buttons based on the options defined will be presented. Each user has the opportunity to vote once. Users can submit their vote by clicking on one of the options. 

![screen_shot_2022-01-27_at_1.41.31_pm.png](/screen_shot_2022-01-27_at_1.41.31_pm.png =35%x)

### Opening and Closing Polls

On creation, a poll is "open". An open poll allows responses from users. If you would like to stop responses and codify the results, you need to "close" it.

For more information, please refer to the respective command documentation.

- [`/poll open`](/commands/poll#open-open-a-poll)
- [`/poll close`](/commands/poll#close-close-a-poll)

## `create` - Create a poll

Issue `/poll create` to create a poll. Polls have one `question` which is the content the users are voting on, and several `options`. Polls can have up to 10 options total.


| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The unique name of the poll. | `true` |
| `question` | Put whatever you want your users to vote on here. | `true` |
| `option-{1-10}` | Define up to 10 options for properties `option-1` to `option-10`. | `true*` |

***note:** At least 2 options are required.*

### Examples

``` bash
/poll create name: favorite-snack question: What is your favorite snack? option-1: chips option-2: ice cream
```

## `info` - Get poll info

Issue `/poll info` to get information on a poll. If a poll is open, this will also attach votable option buttons to it.

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The name of the poll. | `true` |

### Examples

``` bash
/poll info name: favorite-snack
```

## `close` - Close a poll

Issue `/poll close` to close a poll. Once closed, users will be shown an error message that they may no longer vote.

![screen_shot_2022-01-27_at_1.56.10_pm.png](/screen_shot_2022-01-27_at_1.56.10_pm.png =50%x)

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The name of the poll. | `true` |

### Examples

``` bash
/poll close name: favorite-snack
```


## `open` - Open a poll

Issue `/poll open` to open a poll. Once opened, users may begin voting again.

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The name of the poll. | `true` |

### Examples

``` bash
/poll open name: favorite-snack
```

## `delete` - Delete a poll

Issue `/poll delete` to delete a poll.

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The name of the poll. | `true` |

### Examples

``` bash
/poll delete name: favorite-snack
```

## `list` - List polls

Issue `/poll list` to list out polls in the server.

| Argument | Description | Required |
|----------|-------------|----------|
| `page` | Increase by 1 for each page you want to view. There are 10 polls per page and the default value is 1 | `false` |
| `filter` | If provided, the results will filter on `name` and `question` containing this pattern. | `false` |

### Examples

``` bash
/poll list

/poll list page: 2

/poll list page: 2 filter: snack
```































