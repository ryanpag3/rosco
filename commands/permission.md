---
title: Permission
description: 
published: true
date: 2022-01-28T00:17:19.927Z
tags: command
editor: markdown
dateCreated: 2022-01-27T06:01:07.499Z
---

## Introduction

We provide full customization to allow administrators control which commands can be run by which users. 

When a user attempts to run a command they should not be, they will be provided with a private error message.

## `set` - Set a permission

Issue `/permission set` to set a specific permission.

| Argument | Description | Required |
|----------|-------------|----------|
| `command` | The command to set the permission to. For subcommands, the syntax is `command subcommand`. | `true` |
| `role` | The role to require to run this command. | `true` |

### Examples

``` bash
/permission set command: score delete role: Administrators

/permission set command: permission role: Administrators

/permission set command: score list role: @everyone
```

## `unset` - Unset a permission

Issue `/permission unset` to remove the role requirement from that command.

| Argument | Description | Required |
|----------|-------------|----------|
| `command` | The command to unset the permission from. For subcommands, the syntax is `command subcommand`. | `true` |
| `role` | The role to unset from this command. | `true` |

### Examples

``` bash
/permission unset command: score delete role: Administrators

/permission unset command: permission role: Administrators

/permission unset command: score list role: @everyone
```

## `set-all` - Set all permissions

Issue `/permission set-all` to set all commands to require a specific role.

| Argument | Description | Required |
|----------|-------------|----------|
| `role` | The role to set for all commands. | `true` |

### Examples

``` bash
/permission set-all role: @everyone

/permission set-all role: Administrators
```

## `unset-all` - Unset all permissions

Issue `/permission unset-all` to unset a role from all commands.

| Argument | Description | Required |
|----------|-------------|----------|
| `role` | The role to unset from this command. | `true` |

### Examples

``` bash
/permission unset-all role: @everyone

/permission unset-all role: Administrators
```

## `list` - List all permissions

Issue `/permission list` to list all permissions in a server.

### Examples

``` bash
/permission list
```































