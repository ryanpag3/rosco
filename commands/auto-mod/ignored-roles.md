---
title: Auto Mod - Ignored Roles
description: 
published: true
date: 2022-03-31T14:25:18.294Z
tags: 
editor: markdown
dateCreated: 2022-03-31T14:19:13.242Z
---

## Introduction

Rosco allows you to define one or more roles to be ignored by the AutoMod rules.

### Reference

#### `/add` - Add a role to the Ignored Roles group

| Argument | Description | Required |
|----------|-------------|----------|
| `role` | The role you would like to be ignored by AutoMod. | `true` |

```
/automod ignored-role add role: @Test
```

![automod-ignored-role-add-example.png](/automod-ignored-role-add-example.png)

#### `/remove` - Remove a roll from the Ignored Roles group

**note:** This command will fail if the role has not already been included with `/add`

| Argument | Description | Required |
|----------|-------------|----------|
| `role` | The role you would like AutoMod to pay attention to. | `true` |

```
/automod ignored-role remove role: @Test
```

![automod-ignored-role-remove-example.png](/automod-ignored-role-remove-example.png)

#### `/list` - List out the current roles that are ignored

```
/automod ignored-role list
```

![automod-ignored-role-list-example.png](/automod-ignored-role-list-example.png)

