---
title: Auto Mod - Link Detect
description: 
published: true
date: 2022-03-28T15:30:48.367Z
tags: 
editor: markdown
dateCreated: 2022-03-27T01:11:22.942Z
---

Looking for an introduction to [AutoMod](/commands/auto-mod)?

## Introduction

Link Detect allows you to moderate which links are allowed to be posted in the server.
When this module is enabled, all links will be treated as blocked. You can then allow certain links using the `allow` command.

## Reference

### `allow` - Allow a link 

You can define a full link like `https://google.com` or a wildcard such as `*roscobot.com`.


| Argument | Description | Required |
|----------|-------------|----------|
| `pattern` | The link or pattern you would like to allow. | `true` |

```
/automod link-detect allow pattern: https://google.com
```

![automod-detect-link-allow-example.png](/automod-detect-link-allow-example.png)

### `deny` - Deny a link 

You can define a full link like `https://google.com` or a wildcard such as `*roscobot.com`.

**important:** this command will fail unless you already have explicitely allowed this link using the `allow` command. *All* links are detected by default.


| Argument | Description | Required |
|----------|-------------|----------|
| `pattern` | The link or pattern you would like to deny. | `true` |

```
/automod link-detect deny pattern: https://google.com
```

![automod-detect-link-deny-example.png](/automod-detect-link-deny-example.png)