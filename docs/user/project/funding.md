---
sidebar_position: 2
---

# Funding

## Overview

**Funding** parameters dictate how your project distributes funds. This section also dictates the behaviour of your project's funding cycle. A project's funding cycle determines how its time-locked rules operate. These details can be updated over time.

## Options

|Field|Description|
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|**Automate funding cycles**|<p>Projects are expressed in terms of funding cycles. <ul><li>Payouts happen once per funding cycle.</li><li>Some [token incentives](token.md) are calculated using funding cycles.</li><li>Most importantly, projects cannot be reconfigured in the middle of a funding cycle. Instead, changes are queued for the <i>next</i> funding cycle.</li></ul>With automated funding cycles turned off, the project owner can reconfigure the project at any time, triggering a new funding cycle in the process. This provides flexibility for the project owner, but increases the community's percieved risk of rugpulls or other malicious behaviour.<br/><br/>When automated funding cycles are turned on, the project owner must choose a cycle duration. A shorter funding cycle provides more flexibility, but greater percieved risk. A longer funding cycle will do the opposite.<br/><br/>Automated funding cycles are particularly useful for projects with regular costs or payouts.</p>|
|**Payouts**|<p>Payouts dictate how funds leave a treasury.<ul><li>*Amounts* payouts are specific ETH or dollar amounts.</li><li>*Percentages* payouts are percentages of the entire treasury.</li></ul>Payouts to Ethereum addresses invoke a 2.5% fee, which is routed to the [Juicebox DAO treasury](https://juicebox.money/#/v2/p/1). These fees issue JBX tokens, granting projects partial ownership of the ecosystem. Payouts to other Juicebox projects do not invoke fees.<br/><br/>Funds not needed for a project's payouts are considered [overflow](/dev/learn/glossary/overflow). Community members can redeem their tokens for a portion of overflow funds, if enabled by the project owner. Overflow also serves as a project's runway. Projects using *percentages* payouts do not have any overflow.</p>|

## Examples

<img src="/img/project-guide/funding0.png" width="60%" style={{display: "block", margin: "auto"}} />
<p style={{textAlign: "center"}}><i>Funding cycle information on <a href='https://juicebox.money'>juicebox.money</a></i></p><br/>
<img src="/img/project-guide/funding1.png" width="65%" style={{display: "block", margin: "auto"}} />
<p style={{textAlign: "center"}}><i>A project with ETH payout amounts on <a href='https://juicebox.money'>juicebox.money</a></i></p>
