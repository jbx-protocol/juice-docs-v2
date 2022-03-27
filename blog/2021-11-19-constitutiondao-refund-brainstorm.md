---
slug: constitutiondao-refund-brainstorm
title: Potential ways to handle the ConstitutionDAO refund
authors: [jango]
tags: [observations, ecosystem]
---

*thoughts in progress. feedback always welcome. plz add to the conversation and let me know if i'm missing some context, it can be hard to keep up with it all.*

ConstitutionDAO has reached some sort of a coordination moment. There are decisions to be made both technically and socially, and the PEOPLE will have their first opportunity to really use their voice.

Meanwhile us builders have another opportunity to evaluate and extend our current tooling to best support moments like this for people into the future.

Things we care about when considering refund design: speed, safety, cost, flexibility, convenience, (...?). 

In the case of ConstitutionDAO, the refund could be handled in a few different ways (there are definitely others that I don't know of or am less familiar with):

### Do it through Juicebox

Steps:

1. Inject the $40+ million back into the Juicebox contract.
2. Multisig sends a tx reconfiguring ConstitutionDAO's funding cycle target to 0, allowing all tokens to be redeemable for a proportional share of all funds in the treasury.
3. Everyone who wants to redeem their PEOPLE tokens can do so. All who wish to stay in and build out ConstitutionDAO can instead keep their PEOPLE tokens and leave their funds committed to the group.
4. The DAO eventually reassess what it wants out of itself, and who will serve on the multisig to continuing operating the treasury on the community's behalf. DAO can also reassess if it wishes to open up to new members and contributions, etc. In other words, DAO continues to do DAO shit. 

Notes: 

- -- I'd prefer if the Juicebox contracts were looked through by several more people before sticking $40+ mil in them. I personally trust them, but we need community trust and acknowledgement that this is risky experimental stuff. I would love to have the community's confidence in this decision. I'd love to do workshops over the next few days toward this end.
- -- Every person claiming would have a gas fee to pay that would cost about the same as it costed them to contribute: $30-$60 bucks worth of ETH. This sucks especially for folks who contributed amounts around the same order of magnitude as the fee.
- ++ This would require minimal coordination, everyone can take whatever action they choose, whenever they choose to.
- ++ As the Juicebox process is being audited, the DAO could begin manually issuing refunds right away to people who send in their PEOPLE tokens to the multisig.

### Multisig manually sends refunds to those who want it

*I saw versions of this idea from [@strangechances](https://twitter.com/strangechances), [@DennisonBertram](https://twitter.com/DennisonBertram), and *
[@austingriffith](https://twitter.com/austingriffith)*.*

Steps:

1. DAO reserves around $2 mil to pay for refund gas.
2. Take a snapshot. Everyone who had a balance of PEOPLE tokens at a particular block number would be eligible to request a refund at a rate of 1 ETH per 1,000,000 tokens. 
3. The multisig would send tx's to fulfill these requests, covering the gas using the amount reserved.
4. The remaining DAO has to reassess how it manages its tokens if it wants to continue to do DAO shit since PEOPLE tokens are no longer backed by ETH.

Notes: 

- -- multisig would have to coordinate around potentially thousands of payments.
- -- it could take a bit for people to signal their request for a refund. The multisig would have a lot of double-checking and button-clicking to do upfront, and be on standby for a while.
- -- the balances won't account for exchanges that happened after the snapshot.
- ++ The cost of gas will be distributed between everyone who stays around. They DAO could even retroactively subsidize the entry gas fee of anyone leaving by issuing refunds ~$60 more than what was contributed, assuming there is a sizable enough community who wants to hold on to their PEOPLE tokens.
- ++ People can have the option to request funds on a particular L2. The multisig can batch transfer its balance to each L2 accordingly and issue distributions from there.

### Multisig deploys a Merkle Distributor airdrop

*Comment from [@nnnnicholas](https://twitter.com/nnnnicholas). Disclosure: Nicholas is not a member-donor of ConstitutionDAO. It was also mentioned *[@austingriffith](https://twitter.com/austingriffith)*.*

*A version of this using Mirror Splits was proposed by [@strangechances](https://twitter.com/strangechances/status/1461516965869076483) who offered to help execute it.*

Steps:

1. Take a snapshot. Everyone who had a balance of PEOPLE tokens at a particular block number would be eligible to request a refund at a rate of 1 ETH per 1,000,000 tokens. This is called a "snapshot".
2. Deploy Airdrop/Split contract and send it total funds.
3. Announce timeline for moving funds back to DAO treasury multisig to be claimed by those addresses captured in the snapshot.
4. The remaining DAO has to reassess how it manages its tokens if it wants to continue to do DAO shit since PEOPLE tokens are no longer backed by ETH.

Notes:

- -- This approach will still cost refunders a similar amount of gas to redeeming via Juicebox.
- -- The PEOPLE tokens can no longer be used as a claim on the treasury, because people could then double-dip. PEOPLE tokens no longer function as normal Juicebox project tokens.
- ++ The primary advantages of the airdrop approach is that it can use all or mostly audited code, increasing security as compared to Juicebox's unaudited redemption mechanism. 
- ++ This approach reduces gas costs for the DAO (i.e., the people who do not want refunds) as compared to multisig paying gas to send all refunds directly.
- ++ The airdrop could be configured to allow redemptions on an L2, though this adds complexity. 
- ++ Allows contributors to retain their PEOPLE token but receive a refund.

*... (pitch other ideas by listing steps and tradeoffs)*

---

General notes:

- Anyone whose contribution to ConstitutionDAO settled after the PEOPLE token distribution cutoff will be receiving a direct refund from the DAO.
- The timing of the snapshot becomes very important in the scenarios that require one. Candidates include the time the Juicebox closed to new contributions, the moment the auction was lost, or some point in the future (i.e., pre-announced snapshot).  
- Snapshots are captured using a Merkle tree that can be stored in an offchain database or IPFS as in [Mirror's Split](https://github.com/mirror-xyz/splits), which is based on Uniswap's UNI airdop [Merkle-Distributor](https://github.com/Uniswap/merkle-distributor), or emitted as an onchain event [stendhal-labs/collab-splitter](https://twitter.com/dievardump/status/1460516642040033285). The latter would likely be expensive, but far less so than the DAO paying to distribute the refunds manually.
