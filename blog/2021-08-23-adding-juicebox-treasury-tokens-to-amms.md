---
slug: adding-juicebox-treasury-tokens-to-amms
title: "Juicebox V2: Protocol adjustments useful for adding treasury tokens to AMMs"
authors: [jango]
tags: [ecosystem]
---

SharkDAO, the project using the Juicebox protocol that is moving quickest and most likely to break things, has quickly proven the need for pooling its Juicebox treasury tokens into AMMs to provide organic price discovery for its token holders. Most Juicebox projects who reach scale will likely also come across this need.

The value of SHARK is derived not only from its ETH stored in the Juicebox contracts, but also from the NFTs the DAO has deployed treasury funds to acquire, from the JBX that the DAO has begun accumulating by paying platform fees, and perhaps most importantly from the productive community forming within the project that gives it boundless potential moving forward. The prospective value of each of these assets is dynamic and subject to each individuals' confidence and risk appetite. This calls for a more fluid market making and order filling strategy than what the Juicebox protocol has provided until now.

Juicebox provides SHARK holders an effective way to fundraise and expand, but it doesn't yet provide a way for holders to coordinate a value for what they already own – this is the strength of AMMs. SharkDAO needs both of these features well into the future. If Juicebox wishes to be the go-to treasury protocol for startup projects who scale, it needs to understand how the current mechanic behaves alongside a treasury token liquidity pool, and which protocol adjustments are needed to smooth out any identified market inefficiencies over time.

### Current limitations

Currently, Juicebox treasuries have no configurable max-supply of tokens. The protocol always offers people an opportunity to pitch in ETH and receive treasury tokens in return according to the current funding cycle's weight, which is determined by the compounding effects of discount rates alongside the currently configured reserve rate.

As a reminder, the discount rate decreases the amount of tokens minted per ETH contributed as funding cycle's roll over – a discount rate of 10% to the current funding cycle means that a contribution of X ETH to the next funding cycle will only yield 90% of the tokens that the same contribution of X ETH made during the current funding cycle would yield. The reserve rate determines how many of these tokens will be reserved to be distributed to preprogrammed addresses instead of to the payer.

The protocol is thus always quoting a value for a project's treasury tokens, and inso doing always offering to inflate the supply of tokens to meet this demand in exchange for crowdfunding more ETH. It is thus unrealistic to expect the market price of treasury tokens on an AMM to ever exceed the price quoted by the protocol – the protocol will always provide a price ceiling. If the secondary market is over, there is an obvious arbitrage opportunity to pull the price back down.

There may, however, be people who received treasury tokens at a discount in the past who are now willing to sell them for profit at a better price than what the protocol is offering. This supply-side pressure happens organically as funding cycles unfold and discount rates compound. On the buy-side, it's logical for someone to seek a better deal for treasury tokens from this secondary market than get them from the protocol. If the majority of activity is happening on secondaries beneath the protocol price, the token supply and fundraising efforts will tapper off at this equilibrium.

The big question thus becomes how a project chooses to pursue this equilibrium. Does it tune its discount rate and reserve rate over time with its own fairness principles in mind, using secondary markets as a convenience for buyers and sellers but limiting the market's potential to naturally discover its price's upper bound? Or does it use the secondary market as a primary indicator of fairness, using the discount rate and reserved rate only to conveniently satisfy its fundraising needs over time? The answer depends on a community’s values. Does it wish to be liberally open, inclusive, and predictable while prioritizing cashflow? Or instead more-strictly protective of the value current members have accrued and took risks for, with strategic fundraising/expansion campaigns down the road that are scoped for value-adding initiatives? Maybe a balance between the two, with principles in place to guide decisions?

The Juicebox toolset has proven to work well for projects who are willing to expand supply to accommodate new funds and new community members. For projects that want to protect the value they have built and conduct more strategic and scoped fundraising campaigns over time, the compounding discount rate and reserved rate mechanisms might not work well within the current protocol's constraints.

### Solutions

The solution might be simple.

For the Juicebox protocol to be able to accommodate market driven projects, it must allow them to:

- specify a supply cap for their treasury token, and 
- allow them to customize the quantity of treasury tokens that are distributed per ETH received. 

Under these conditions, if payments are received into the treasury after the token supply cap is exceeded, no tokens will be minted in return. Otherwise, if the project has set a customized treasury token price point, tokens will be minted according to this rate overriding the current funding cycle's weight derived by the compounding discount rates of previous cycles.

These tools allow a project to essentially "pause" new treasury tokens from being issued, and at any point open up a fixed supply of new tokens to distribute at a specified price point. The reserved rate as it currently exists can work within this pattern to route newly issued tokens to time-bounded distribution mechanisms, incentivized staking pools, the project's own multi-sig wallet, etc.

Adding these parameters does put more power into the hands of the project owner, which is a tradeoff worth noting. People who contributed funds earlier in a project's lifetime will no longer have guarantees that their tokens were issued at a discount compared to the future cycles, and protocol rates are subject to change as dramatically as the project owner desires. Communities must make extra sure that the ownership of their project (represented by an ERC-721 contract) is in the hands of a trustworthy wallet willing to execute decisions collectively agreed upon. I'm not too worried about this tradeoff because it is already true to large extent in the current implementation.

Another tradeoff of a token supply cap is that it risks the consistency of DAO-to-DAO and Anon-to-DAO collaboration. For example, imagine someone stands up an NFT marketplace that automatically routes percentages of artwork sales to preconfigured destinations, like to SharkDAO's treasury. If SharkDAO has a token supply cap in place and has reached this limit, the sale of the artwork would still send the ETH to the treasury, but the artist would not receive any SHARK in return. I'm also not too worried about this tradeoff because the same effect is possible with the current mechanism if a project tunes its reserved rate to 100%. Each project/artist composing with Juicebox treasuries should always understand the variability of doing so – rates are subject to change, and so its important to prioritize building relationships with trustworthy projects who make decisions in the open with proper planning and community engagement. 

Another detail to note: the configuration of both new parameters will be scoped to funding cycle configurations – a project running on timed cycles must await a new cycle for changes to the max-supply and weight override parameters to take effect. Projects with longer funding cycle durations and more rigid reconfiguration ballots will thus continue to operate with more predictability, checks, and balances. Another effect of this is that the actual token supply might be greater than the configured max supply if the project ends up minting more tokens during a current, boundless cycle before a queued one with a max-supply becomes active.

A proposal is taking shape to implement these two new properties into a TerminalV2 contract within the Juicebox ecosystem. Projects currently running on TerminalV1 will have the option to migrate over once the contract has been deployed and approved.

---

[Join the JuiceboxDAO Discord]( https://discord.gg/qckstafRcs  ) to add to this discussion and provide alternate ideas and points of view before we move forward with rolling out these additions to the protocol.
