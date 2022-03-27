---
slug: juicebox-roadmap-8-3-2021
title: JuiceboxDAO Roadmap 8/3/2021
authors: [jango]
tags: [observations, dao]
---

From my point of view, JuiceboxDAO has only a handful of big-picture initiatives to focus our efforts on over the next while:

- Be available to help founders and communities get started with the Juicebox protocol with confidence. This includes creating more education materials and improving technical documentation. 
- Build community analytics dashboards so communities can see how funding cycle reconfigurations have impacted their treasury over time, and so they can make better decisions into the future. This will also be useful so communities can cross reference decisions previously made by other Juicebox projects before making a similar decision themselves. 
- Build L2 payment terminals so projects can receive funds on various Ethereum L2s (Optimism, Arbitrum, ZKSync, etc). I've designed the general structure of this mechanism, but it needs to be implemented.
- As more projects choose to manage their treasury using the Juicebox protocol, the protocol's TerminalV1 contract will become responsible for securing an increasing amount of ETH. It will be possible for JuiceboxDAO to write and publish a TerminalV2 contract for projects to migrate onto that sends idle overflowed ETH to a yield earning vault. This will introduce a new risk vector, so this effort can wait until the protocol has matured and the expected return is favorable.
- Organize the JuiceboxDAO's [Discord](https://discord.com/invite/6jXrJSyDFf) and the DAO's voting mechanics on [Snapshot](https://snapshot.org/), and continue providing structure and financial support to incoming contributors.
- Decentralize power over the JuiceboxDAO's governance over time by installing funding cycle ballots that rely on a more trustless execution of the outcome. [Aragon Govern](https://aragon.org/aragon-govern) could help here.

Each of these deserves a more detailed post of its own. 

If you want to help, join the JuiceboxDAO on [Discord](https://discord.gg/6jXrJSyDFf) and speak up. We are looking to fund people to both lead these efforts and/or contribute to them.
