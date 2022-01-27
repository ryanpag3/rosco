---
title: Scoreboard
description: 
published: true
date: 2022-01-27T17:32:16.445Z
tags: command
editor: markdown
dateCreated: 2022-01-27T05:59:11.638Z
---

# Scoreboard

Scoreboards contain [scores](/commands/score) and can be used to group results together with ease.

## `create` - Create a scoreboard

Issue `/scoreboard create` to create a new scoreboard. Scoreboards contain one or more [scores.](/commands/score)

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The unique name of the scoreboard. | `true` |
| `description` | The description of the scoreboard. | `false` |
| `scores` | A comma-separated list of score names to add to the scoreboard. (e.g `score1,score2,score3,score4`) | `false` |

### Examples

``` bash
/scoreboard create name: my-scoreboard

/scoreboard create name: my-scoreboard description: The best scoreboard there ever was!

/scoreboard create name: my-scoreboard scores: score1,score2,score3,score4
```

## `add-score` - Add score to scoreboard

Issue `/scoreboard add-score` to assign a score to a scoreboards. Scores can be assigned to multiple scoreboards (and multiple scoreboards can have the same score).

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The name of the scoreboard you are adding to. | `true` |
| `score-name` | The name of the score being added. | `true` |

### Examples

``` bash
/scoreboard add-score name: my-scoreboard score-name: score1
```

## `remove-score` - Remove score from scoreboard

Issue `/scoreboard remove-score` to remove a score from a scoreboard.

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The name of the scoreboard you are removing. | `true` |
| `score-name` | The name of the score being removed. | `true` |