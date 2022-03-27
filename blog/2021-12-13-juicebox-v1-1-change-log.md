---
slug: juicebox-v1-1-change-log
title: Juicebox V1.1 Change log
authors: [jango]
tags: [protocol]
---

JuiceboxDAO is running final tests on an updated/forked version of its Terminal contract. Once deployed and approved by JuiceboxDAO, projects will be able to voluntarily migrate their funds and accounting parameters from the V1 terminal that is currently being used to this new V1.1 Terminal with just one transaction.

There are many broader changes being developed in a V2 release scheduled for the coming months. V1.1 is a simpler change that still manages to provide crucial utilities and fixes for projects operating on the protocol.

Here's why a project might want to migrate to V1.1:

### Features

- **Pause -** Projects will be able to pause contributions to their treasury as well as subsequent token issuance on a per-funding cycle basis. Any new transactions – or pending low-gas transactions in flight – that settle after a paused funding cycle has started will fail. 
- **Mint - **Projects will be able to allow itself to mint more of its own tokens on a per-funding cycle basis. During a funding cycle where minting new tokens is allowed, the project owner can submit a transaction to increase the token supply and send this new supply to a beneficiary of its choice. 

Currently projects can only mint new tokens before receiving a first contribution.
- **Burn - **Anyone will be able to burn their tokens by redeeming them, even when there is no overflow. 

Currently tokens are only burnable when there is some amount of overflow that is being reclaimed through the redemption.
- **Off-protocol redemption value - **Projects will be able to supply a contract to their funding cycles that tell the protocol how much value it is holding off-protocol, like in a multisig wallet or yielding vault. Projects can use oracles in this contract to convert the value of any other asset it owns into ETH for the protocol to use when calculating redemption values.

Currently redemption values are calculated only with the ETH the project has locked in the Juicebox Terminal contract.
- **Fee cap -** The protocol fee is capped at 5%. JuiceboxDAO can adjust the JBX fee from 0% - 5%.

Currently there is no fee cap. 

### Bug fixes

- Fixed bug that prevents a project from updating its reserved token tracker when the reserved rate is set to 0%. This bug prevented the project from reconfiguring from a 0% reserved rate to any other value without inadvertently creating an extra reserved token supply inso-doing. See this [postmortem](__GHOST_URL__/juicebox-postmortem-of-low-severity-bug-discovered-8-18-2021/). 
- Fixed bug that prevented overflow from being viewed correctly when a funding cycle rolls over before it has had its newly available funds distributed.

### Other adjustments

- The contract is now directly Ownable instead of using an ownable Governance contract proxy. The JuiceboxDAO will own the contract, which allows it to set the fee, and allow other forked Terminal contracts for projects to migrate onto.
