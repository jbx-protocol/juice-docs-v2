---
slug: juicebox-protocol-tokenomics
title: Juicebox protocol tokenomics
authors: [jango]
tags: [guide]
---

*In its first funding cycle, each project issues 1,000,000 tokens for each 1 ETH received.*

### Level 0

In its simplest form, a Juicebox project can be configured to fundraise and provide refunds. 

Example: I pay 5 ETH into a treasury and receive 5,000,000 tokens, and you pay 5 ETH and receive 5,000,000 tokens. There are now 10 ETH in the treasury and 10,000,000 tokens total. Since I own half of the tokens, I can redeem them to get half of the treasury's total – in other words I can get a refund. You can do the same.

### Level 1

A reserved rate can be added which will allocate a percentage of the minted token supply to a preprogrammed list of addresses.

Example: The project sets a 10% reserved rate that goes to the DAO's multisig address. I pay 5 ETH into a treasury and receive 4,500,000 tokens, and you pay 5 ETH and receive 4,500,000 tokens. The DAO's multisig now has access to 1,000,000 tokens. Because of the reserved rate, I can no longer redeem my tokens to get a refund – I will only get 90% of what I paid. 

At a reserved rate of 100%, no tokens go to new contributors.

### Level 2

A funding cycle target can be set which blocks off some funds from the treasury that can be distributed by anyone to a set of preprogrammed addresses.

Example: The project sets a target of 1 ETH. I pay 5 ETH into a treasury and receive 5,000,000 tokens, and you pay 5 ETH and receive 5,000,000 tokens.
The treasury now has 10 ETH –  1 ETH is within the target, and the other 9 are considered overflow. I can redeem/burn by tokens to receive my proportion of the overflow, which is 4.5 ETH. The 1 ETH target is still distributable to the project and not accessible to token holders.

### Level 3

A redemption bonding curve can be added which reduces the amount of the treasury that can be reclaimed by redeeming tokens. 

Example: The project sets a 50% bonding curve. I pay 5 ETH to the treasury and receive 5,000,000 tokens, and you pay 5 ETH and receive 5,000,000 tokens. Because of the redemption bonding curve, I will only receive ~2.5 ETH if I redeem my tokens. The rest is left to share by those who are holding, so you could now redeem your tokens and get the remaining ~7.5 ETH.

### Level 4

A discount rate can be added to decrease the rate of tokens that are minted and distributed when contributions are received over time. 

Example: The project sets a 10% discount rate and a 14 day funding cycle duration.  I pay 5 ETH to the treasury and receive 5,000,000 tokens on day one during the first funding cycle. Fourteen days later during the second funding cycle, you pay 5 ETH and receive 4,500,000 tokens.

### Level 5

It is important to note that a project can change its reserved rate, target, redemption bonding curve, and discount rate on a per-funding cycle basis. Some projects might choose to have no funding cycle duration for the most flexibility, meaning they can reconfigure the project on demand. It is really important to trust the owner of the project because they have a lot of control to shape the tokenomics. 

A project can also set a ballot contract in its funding cycle to create conditions according to which all proposed reconfigurations must abide.

Example: The project sets a 3-day delay ballot contract. If the project owner wants to reconfigure any funding cycle property, the transaction to do so must be sent at least 3 days before the end of the current funding cycle. If the reconfiguration was made within the 3 days, the next funding cycle will instead be a copy of the current one, and the reconfiguration would be eligible to take effect after that one.

People can build arbitrary ballot contracts as long as it conforms to [IFundingCycleBallot](https://github.com/jbx-protocol/juice-contracts-v1/blob/main/contracts/interfaces/IFundingCycleBallot.sol).
