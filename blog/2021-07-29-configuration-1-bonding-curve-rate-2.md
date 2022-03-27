---
slug: configuration-1-bonding-curve-rate-2
title: "Configuration #1: Bonding Curve Rate"
authors: [jango]
tags: [governance, dao]
---

The first JuiceboxDAO configuration includes a bonding curve rate of 60%.

The Juicebox Protocol's bonding curve implementation can be seen in code [here](https://github.com/jbx-protocol/juicehouse/blob/1c7edfd9a30299a1c9f366f31b0711fc3c11af57/packages/hardhat/contracts/TerminalV1.sol#L209), and interactively [here](https://www.desmos.com/calculator/sp9ru6zbpk). In the interactive model, `o` is the current amount of overflow, `s` is the currently total supply of tokens, and `r` is the bonding curve. The `x-axis` is the amount of tokens being redeemed, and the `y-axis` is the amount of overflow that can be claimed by redeeming the `x-axis` amount.

A 60% curve thus means that one JBX can be redeemed (burned) for a little over 0.6 times its proportional value of JuiceboxDAO's overflow. For example, If you owned 1% of all JBX and there was 100 ETH of overflow, redeeming all of your JBX would earn you about 0.6 ETH.

In effect, a bonding curve creates an incentive to hodl tokens longer than others. The lower the bonding curve, the more this effect becomes exaggerated. The curve does nothing if there is no overflow.

The rate of 60% that we deployed with is somewhat arbitrary – we had no expectations for overflow anyways. Expect a better hypothesis for future funding cycle reconfigurations after we've had a chance to study its effects in practice.
