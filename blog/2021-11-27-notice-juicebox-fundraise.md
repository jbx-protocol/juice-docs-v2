---
slug: notice-juicebox-fundraise
title: "NOTICE: Juicebox V1 inefficiencies"
authors: [jango]
tags: [protocol, observations]
---

Before you start a project on Juicebox V1 or contribute funds to one, understand the following inefficiencies. These are shortcoming of V1 that have imperfect work arounds for now.

1. There is no pause button. The best you can do is configure the reserves rate to 100% if you do not want to give new contributors any tokens. You can set an address responsible for burning tokens as the reserved token recipient.
2. When a project's reserved rate starts at 0% and is then reconfigured to be higher than 0%, a new token supply will become available to distribute to the preconfigured reserved token recipients according to the rate chosen. For example, if moved to 100%, the total supply will double. Again, you can set an address responsible for burning tokens as the reserved token recipient. 

This inefficiency was discovered on August 18th. Here's [more](../juicebox-postmortem-of-low-severity-bug-discovered-8-18-2021/).
3. There is no direct burn transaction, but tokens will be burnt when redeemed. Therefor in order to burn, reconfigure your target such that there is overflow, then redeem tokens and then inject the overflow back into the treasury.
