---
title: Keyword
description: 
published: true
date: 2022-01-28T00:29:16.847Z
tags: command
editor: markdown
dateCreated: 2022-01-27T06:02:10.000Z
---

## Introduction

Keywords allow you to trigger [score](/commands/score) behavior based off of customizable events.

## `create` - Create a keyword

Issue `/keyword create` to create a keyword and assign it to a score. Keywords can be one or more words and spaces are okay!

| Argument | Description | Required |
|----------|-------------|----------|
| `keyword` | The keyword or phrase that will trigger the event. | `true` |
| `score-name` | The name of the score that will be changed upon event firing. | `true` |
| `action` | Which action to take on the score when the keyword is found. Valid options are `UP` or `DOWN`. Default value is `UP`. | `false` |
| `amount` | Set the amount to increase or decrease when the keyword is found. | `false` |
| `channel` | Set the keyword detection to be limited to this channel. | `false` |
| `user` | Set the keyword detection to be limited to this user. | `false` |

### Examples

``` bash
# increase the score "test" by 5 every time "hello" is said in the chat
/keyword create keyword: hello score-name: test amount: 5

# decrease the score "1234" by 20 every time "abc" is typed in the chat
/keyword create keyword: abc score-name: 1234 amount: 20 action: DOWN

# increase the score "ryan" by 1 every time ryan types "ryan"
/keyword create keyword: ryan score-name: ryan
```

