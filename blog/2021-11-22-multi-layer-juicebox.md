---
slug: multi-layer-juicebox
title: Cross-layer Juicebox Protocol
authors: [jango]
tags: [protocol, observations]
---

Projects building on Juicebox need payment terminals that cost its contributors less gas to pay and redeem.

To do so, projects need to be able to accept funds across many different L2s alongside mainnet.

The simplest option would be to just deploy the same Juicebox protocol in each EVM compatible L2 environment. This forces projects to choose which they would like to operate on, or manage their own complexity if they would like to operate across many. I'm guessing most projects would prefer to operate everywhere, if only it were easy to do so.

JuiceboxDAO runs on the juicebox protocol itself, if we do nothing at the protocol layer and go with this simple option we will come across the same dilemma. If instead we preemptively consider how we can adjust the Juicebox V2 protocol to make cross layer operation simple for us, we'll likely also be making it simple for all projects who choose to build around juicebox treasuries.

An effective solution will take into consideration that:

- **projects do not want to fragment its community and governance across chains.** All members should be cheering for funds to come in from wherever people care to contribute from, and the project's distributed tokens in turn should provide the opportunity to govern its cumulative funds regardless of what chain they're on. 
- **the issuance rate of the project's tokens should be synchronizable across all available environments over time.** As funding cycles roll over, it's often the case that the weight of token distribution changes. Unless it is by design, there shouldn't be arbitrage opportunities across chains. 
- **funding cycle reconfigurations should either be approved or fail across all environments.** If a project proposes to reconfigure its funding parameters in one environment but the ballot to do so ends up failing, the change should also fail to take effect in all other environments. On the flip side, successful funding cycle reconfigurations should be reflected across chains.

---

*Stay tuned for specific proposals from me of how this might be achieve across rollup L2s, and please contribute to the conversation with your own ideas so we can arrive at the best possible set of solutions together.*
