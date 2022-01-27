---
title: Score
description: 
published: true
date: 2022-01-27T05:20:32.432Z
tags: command
editor: markdown
dateCreated: 2022-01-27T03:40:55.281Z
---

# Scores

The `/score` command allows you to to create and manage scores. Scores each have a value that can be increased or decreased. They can also be assigned to [scoreboards](/commands/scoreboards).

## `create` - Create a score.

Issue `/score create` to create a new score.

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The unique name of the score. | `true` |
| `description` | The description of the score. Its glorious purpose. | `false` |
| `amount` | Set the initial value of the score upon creation. | `false` |
| `color` | Set the color of the bar when `/score list` is run. Defaults to a random color. | `false` |

### Examples

``` bash
# required only
/score create name: test

# with optional arguments
/score create name: test description: This is my score! amount: 100 color: #000000
```

## `delete` - Delete a score.

Issue `/score delete` to delete a previously [created]() score.




