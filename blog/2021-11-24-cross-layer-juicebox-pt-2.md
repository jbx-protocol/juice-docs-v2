---
slug: cross-layer-juicebox-pt-2
title: "Cross-layer Juicebox protocol: follow up #1"
authors: [jango]
tags: [protocol, observations]
---

From the [original post](../multi-layer-juicebox/): 

> The simplest option would be to just deploy the same Juicebox protocol in each EVM compatible L2 environment. This forces projects to choose which they would like to operate on, or manage their own complexity if they would like to operate across many. I'm guessing most projects would prefer to operate everywhere, if only it were easy to do so.

What if the simplest option was the best option?

Although deploying the same Juicebox protocol in each EVM compatible L2 environment forces projects to choose which they would like to operate on, it might be most reasonable to pass along this choice and complexity to each project while suggesting thorough operational strategies to weave these isolated environments together at the DAO/social/governance layer.

Here are some potential operational guidelines, using JuiceboxDAO as an example:

- Juicebox protocol is deployed identically on several L2s and side chains. JuiceboxDAO creates a project on each one where fees will be collected and contributions accepted.
- JuiceboxDAO will have different tokens on each chain. JuiceboxDAO membership is composed of a strategy that take each of these tokens into account. Members are responsible for managing the entirety of the DAO's treasury across all chains.
- JuiceboxDAO submits treasury reconfigurations to each chain independently. Each chain can have funding cycles that operate on different schedules, have different token issuance rates, and different ETH distributions. This flexibility can be used to orchestrate arbitrary multi-chain treasury designs, although also introducing management overhead. Extend to new environments responsibly.
- JuiceboxDAO can move its ETH/tokens between environments adhering to the constraints of each chain, leaning on existing and upcoming generalized bridging infrastructure.
- It can deploy converter contracts if it wishes to support conversions between each of its membership tokens.

Any other project could choose to operate on one or many environments where the Juicebox protocol has been deployed. If they choose to operate on many, they would have to manage the complexity of doing so. Once projects have begun experimenting and settling on effective patterns, I'd hope a playbook would emerge as a reference for future projects.

Leaving multi-layer coordination for the social layer introduces some operational overhead and risk, but also keeps the protocol layer flexible and simple.
