---
title: Poll
description: 
published: true
date: 2022-01-27T21:43:54.910Z
tags: command
editor: markdown
dateCreated: 2022-01-27T06:00:30.235Z
---

## Introduction

Polls allow your users to vote on a defined topic. Upon completion, polls can be closed and results announced.

## Voting on a poll

When a poll is created, buttons based on the options defined will be presented. Each user has the opportunity to vote once. 

![screen_shot_2022-01-27_at_1.41.31_pm.png](/screen_shot_2022-01-27_at_1.41.31_pm.png)

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

