---
title: Score
description: 
published: true
date: 2022-01-27T05:27:31.051Z
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

Issue `/score delete` to delete a previously [created](/commands/score#create-create-a-score) score.

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The unique name of the score. | `true` |

### Examples

```
/score delete name: test
```

## `update` - Update a score.

Issue `/score update` to update one or more properties of the score.

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The unique name of the score. | `true` |
| `new-name` | The new unique name you would like to set the score to. | `false` |
| `description` | An updated description of the score. | `false` |
| `amount` | An updated amount of the score. | `false` |
| `color` | An updated color of the score bar when `/score list` is ran. | `false` |

### Examples

``` bash
/score update name: test new-name: updated-test

/score update name: test amount: 1000

/score update name: test description: new description amount: 1000 color: #FFFFF
```






































