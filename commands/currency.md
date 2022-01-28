---
title: Currency
description: 
published: true
date: 2022-01-28T01:13:28.941Z
tags: c
editor: markdown
dateCreated: 2022-01-27T06:02:40.184Z
---

## Introduction

When I am invited to your server, I start rewarding currency for participating in the following server activities:

| Activity | Reward |
|----------|--------|
| Messages | `1` |
| Reactions | `1` |
| Bot Commands Issued | `1` |

You can use this currency for various server activities, as well as create your own specific custom events for earning currency!

## `grant` - Grant a user currency

Issue `/currency grant` if you would like to issue currency to a user. 

***We highly recommend restricting this command to administrators to avoid abuse.***

| Argument | Description | Required |
|----------|-------------|----------|
| `user` | The user being granted currency. | `true` |
| `amount` | The amount of currency to grant. Default is `1` | `false` |

### Examples

``` bash
/currency grant user: ryan

/currency grant user: ryan amount: 1000
```

## `log` - Audit currency events

Issue `/currency log` to audit currency events.

| Argument | Description | Required |
|----------|-------------|----------|
| `channel` | If set, will assign a channel to log currency events to. | `false` |
| `active` | If set, enables/disables event logging in the `channel` | `false` |

### Examples

``` bash
/currency log

/currency log channel: General

/currency log active: False
```

## `send` - Send a user currency

Issue `/currency send` to send another user your currency.

| Argument | Description | Required |
|----------|-------------|----------|
| `to` | The user you are sending currency to. | `true` |
| `amount` | The amount of currency you are sending. | `true` |

### Examples

``` bash
/currency send to: ryan amount: 100000000
```

## **Bank**

You can store your currency in the bank. This protects it from being stolen as well as grants it interest.

### `withdraw` - Withdraw from the bank

Issue `/currency bank withdraw` to withdraw money from your bank.

| Argument | Description | Required |
|----------|-------------|----------|
| `amount` | The amount of currency you are withdrawing. | `true` |

#### Examples

``` bash
/currency bank withdraw amount: 1000
```

### `deposit` - Deposit to the bank

Issue `/currency bank deposit` to deposit money into the bank.

| Argument | Description | Required |
|----------|-------------|----------|
| `amount` | The amount of currency you are depositing. | `true` |

#### Examples

``` bash
/currency bank deposit amount: 1000
```























































