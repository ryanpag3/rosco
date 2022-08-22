---
title: Magic: The Gathering
description: Commands related to Magic: The Gathering
published: true
date: 2022-08-22T22:45:44.468Z
tags: 
editor: markdown
dateCreated: 2022-08-22T22:44:29.568Z
---

## `search` - Search for a Magic: The Gathering card.

Issue `/mtcg search` to search for a magic card and display it in the chat.


| Argument | Description | Required |
|----------|-------------|----------|
| `name` | Some text identifying the card.. | `true` |
| `set` | Some text identifying the set name. | `true` |

``` bash
/mtcg search name: Fire Diamond

/mtcg search name: Flumph

/mtcg search name: rasputin set: dominaria
```