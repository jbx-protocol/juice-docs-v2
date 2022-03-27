---
slug: configuration-1-ballot
title: "Configuration #1: Ballot"
authors: [jango]
tags: [governance, dao]
---

The first JuiceboxDAO funding cycle configuration includes a ballot that binds reconfiguration approvals to a contract. The contract specifies that the reconfiguration must be made at least 7 days before it can take effect.

Under this contract, if the reconfiguration were to be proposed within 7 days of the current (1st) funding cycle ending, we'd have to wait until the 3rd funding cycle to have it take effect.

Anyone can write new ballots by deploying a contract that implements [this interface](https://github.com/jbx-protocol/juicehouse/blob/1c7edfd9a30299a1c9f366f31b0711fc3c11af57/packages/hardhat/contracts/interfaces/IFundingCycleBallot.sol). Once deployed, a proposed reconfiguration can then include the new ballot to use for future reconfigurations.  

We deployed a simple 7 day buffer ballot for simplicity's sake, and to provide some guardrails to protect the community from rug pulls. The goal over time is to design better and safer ballots for all Juicebox projects to use.
