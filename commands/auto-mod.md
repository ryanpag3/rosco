---
title: Auto Moderation
description: 
published: true
date: 2022-03-28T05:01:27.556Z
tags: command
editor: markdown
dateCreated: 2022-03-27T00:43:02.930Z
---

## **Introduction**

Rosco's AutoMod feature is broken up into several modules. That way you can pick and choose which functionality is best for your server. 

[Click here to jump to a full example](#example)

### **Modules**

- [**Banned Words**](/commands/auto-mod/banned-words) - Prevent, or slow down, the posting of certain banned words in your server. 
- [**Link Detect**](/commands/auto-mod/link-detect) - Block certain links from being posted.
- [**Capslock Detect**](/commands/auto-mod/capslock-detect) - Detect the use of CAPITALIZED LETTERS

### **Rules**

For each of the modules in auto moderation, you can write rules. When you define a rule, you enable the bot to take moderation action based on customizable parameters.

#### **Supported Actions**

When creating a rule you can specify an `action` indicating what you would like the bot to do when a user breaks it. The following actions are supported by Rosco:

- **warn**
  - Either publicly or privately (via DM) warn a user they have broken a rule.
  - If public, you can configure which channel to post the warning in.
- **timeout**
  - You can indicate how long to time a user out with the `duration` property.
- **mute**
  - You can indicate how long to mute a user out with the `duration` property.
- **kick**
  - The bot will kick the user.
- **ban**
  - The bot will ban the user.

#### **Reference**

##### `add` - Add an AutoMod rule

| Argument | Description | Required |
|----------|-------------|----------|
| `module` | For more details see [modules](#modules) | `true` |
| `action` | For more details see [actions](#supported-actions) | `true` |
| `duration` | The duration to take action for. Only applicable for `timeout` and `mute` | `true` |
| `violations` | The amount of violations to allow before taking action. | `true` |
| `cooldown` | The amount of time, in seconds, from the first violation to reset the violation count. | `true` |

```
/automod rule add module: banned-words action: warn violations: 1 cooldown: 86400
```


##### Example

Let's say you want to block the word `banana`. It's a really bad word and you want to give escalating punishment when users use it too much. 

Let's say you want to do the following when the bad word is said:

- When `banana` is typed 1 times in a 24 hour period, I want to warn a user. 

- When `banana` is typed 5 times in a 24 hour period, I want to timeout a user for 42 minutes.

- When `banana` is typed 10 times in a year, I want to kick the user from the server.

- When `banana` is typed 25 times in a year, I want to ban the user from the server.

Let's put this in a tabular format:

| Word Typed | Punishment | Cooldown |
|------------|------------|----------|
| 1 | Warning | 24 hours |
| 5 | Timeout | 24 hours |
| 10 | Kick | 365 days |
| 25 | Ban | 265 days |

And here's what that looks like as commands

```
/automod rule add module: banned-words action: warn violations: 1 cooldown: 86400

/automod rule add module: banned-words action: timeout violations: 5 cooldown: 86400

/automod rule add module: banned-words action: kick violations: 10 cooldown: 31536000

/automod rule add module: banned-words action: ban violations: 25 cooldown: 31536000
```





















