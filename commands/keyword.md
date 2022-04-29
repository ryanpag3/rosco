---
title: Keyword
description: 
published: true
date: 2022-04-29T23:42:37.274Z
tags: command
editor: markdown
dateCreated: 2022-03-24T21:12:52.742Z
---

## Introduction

Keywords allow you to trigger [score](/commands/scores) behavior based off of customizable events.

## `create` - Create a keyword

Issue `/keyword create` to create a keyword and assign it to a score. Keywords can be one or more words and spaces are okay!

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | A unique name identifying the keyword. | `true` |
| `keyword` | The keyword or phrase that will trigger the event. | `true` |
| `score-name` | The name of the score that will be changed upon event firing. | `true` |
| `action` | Which action to take on the score when the keyword is found. Valid options are `UP` or `DOWN`. Default value is `UP`. | `false` |
| `amount` | Set the amount to increase or decrease when the keyword is found. | `false` |
| `channel` | Set the keyword detection to be limited to this channel. | `false` |
| `user` | Set the keyword detection to be limited to this user. | `false` |
| `role` | Set the keyword detectionto be limited to this role. | `false` |
| `announce-channel` | When a keyword is detected, Rosco will announce it to this channel. | `false` |

### Examples

``` bash
# increase the score "test" by 5 every time "hello" is said in the chat
/keyword create name: hello-test keyword: hello score-name: test amount: 5

# decrease the score "1234" by 20 every time "abc" is typed in the chat
/keyword create name: test keyword: abc score-name: 1234 amount: 20 action: DOWN

# increase the score "ryan" by 1 every time ryan types "ryan"
/keyword create name: ryan-test keyword: ryan score-name: ryan user: ryan
```

![keyword-create-example.png](/keyword-create-example.png)

## `delete` - Delete a keyword

Issue `/keyword delete` to delete a keyword for a score.

**important:** You must provide the same parameters that you provided to the `create` command. Failure to provide the *exact* parameters will result in the keyword failing to delete OR potentially deleting the wrong keyword.

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | The unique name of the keyword. | `true` |

### Examples

``` bash
/keyword delete name: test
```

![keyword-delete-example.png](/keyword-delete-example.png)

## `list` - List all keywords

Issue `/keyword list` to list out current keywords.

| Argument | Description | Required |
|----------|-------------|----------|
| `keyword` | Filter results by a keyword or phrase. | `false` |
| `score-name` | Filter the results by score name. | `false` |

### Examples

``` bash
/keyword list

/keyword list keyword: test

/keyword list score-name: my-score

/keyword list keyword: test score-name: my-score
```

![keyword-list-example.png](/keyword-list-example.png)































