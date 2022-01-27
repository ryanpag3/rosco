---
title: Score
description: 
published: true
date: 2022-01-27T04:05:32.043Z
tags: command
editor: markdown
dateCreated: 2022-01-27T03:40:55.281Z
---

# Scores - `/score`

The `/score` command allows you to to create and manage scores. Scores each have a value that can be increased or decreased. They can also be assigned to [scoreboards](/commands/scoreboards).

## `/score create` - Create a score.

### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The unique name of the score. | `true` |
| `description` | The description of the score. It's glorious purpose. | `false` |
| `amount` | Set the initial value of the score upon creation. | `false` |
| `color` | Set the color of the bar when `/score list` is run. Defaults to a random color. | `false` |

### Examples

```
/score create name: test description: This is my score! amount: 100 color: #000000
```



