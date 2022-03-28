---
title: Auto Mod - Banned Words
description: 
published: true
date: 2022-03-28T15:43:11.400Z
tags: 
editor: markdown
dateCreated: 2022-03-27T01:08:14.489Z
---

Looking for an introduction to [AutoMod](/commands/auto-mod)?

## **Introduction**

The Banned Words module allows you to configure certain words to be blocked and/or limited in frequency. Combined with [Rules](/commands/auto-mod#rules), you can create powerful moderation configurations suiting your server's needs.

## **Reference**



### `add` - Add a word to the banned list

| Argument | Description | Required |
|----------|-------------|----------|
| `word` | The word you would like to ban. | `true` |

```
/automod banned-words add word: banana
```

![automod-banned-words-add-example.png](/automod-banned-words-add-example.png)

### `delete` - Remove a word to the banned list

| Argument | Description | Required |
|----------|-------------|----------|
| `word` | The word you would like to unban. | `true` |

```
/automod banned-words delete word: banana
```

![automod-banned-words-delete-example.png](/automod-banned-words-delete-example.png)

### `list` - List the current banned words

This command will be sent privately to ensure the words are not broadcast to your users.

```
/automod banned-words list
```

![automod-banned-words-list-example.png](/automod-banned-words-list-example.png)

### `enable` - Enable this module

This command allows you to enable the Banned Words module.

```
/automod banned-words enable
```

![automod-banned-words-enable-example.png](/automod-banned-words-enable-example.png)

### `disable` - Disable this module

This command allows you to disable the Banned Words module.

```
/automod banned-words disable
```

![automod-banned-words-disable-example.png](/automod-banned-words-disable-example.png)