---
description: Manages approving funding cycle reconfigurations automatically after a buffer period.
---

# JBReconfigurationBufferBallot

## Overview

### [Code](https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBReconfigurationBufferBallot.sol)

### **Addresses**

Ethereum mainnet: [`0x7Cb86D43B665196BC719b6974D320bf674AFb395`](https://etherscan.io/address/0x7Cb86D43B665196BC719b6974D320bf674AFb395)

### **Interfaces**

| Name                                             | Description                                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBReconfigurationBufferBallot`**](/api/interfaces/ijbreconfigurationbufferballot.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

## Constructor

```
constructor(uint256 _duration, IJBFundingCycleStore _fundingCycleStore) {
  duration = _duration;
  fundingCycleStore = _fundingCycleStore;
}
```

* **Arguments:**
  * `_duration` is the number of seconds to wait until a reconfiguration can be either `Approved` or `Failed`.
  * `_fundingCycleStore` is a contract storing all funding cycle configurations.


## Events

| Name                               | Data                                                                                                                                                                                    |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`Finalize`**](/api/contracts/or-ballots/jbreconfigurationbufferballot/events/finalize.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed configuration</code></li><li><code>[JBBallotState](/api/enums/jbballotstate.md) indexed ballotState</code></li><li><code>address caller</code></li></ul> |

## Properties

| Function                                                          | Definition                                                                                                                                                                                                |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`duration`**](/api/contracts/or-ballots/jbreconfigurationbufferballot/properties/duration.md)                            | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 duration</code></li></ul> |
| [**`fundingCycleStore`**](/api/contracts/or-ballots/jbreconfigurationbufferballot/properties/fundingcyclestore.md)               | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBFundingCycleStore](/api/interfaces/ijbfundingcyclestore.md) fundingCycleStore</code></li></ul> |
| [**`finalState`**](/api/contracts/or-ballots/jbreconfigurationbufferballot/properties/finalstate.md)                            | <p><strong>Returns</strong></p><ul><li><code>uint256 finalState</code></li></ul> |

## Read

| Function                                 | Definition                                                                                                                                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`stateOf`**](/api/contracts/or-ballots/jbreconfigurationbufferballot/read/stateof.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _configured</code></li><li><code>uint256 _start</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBBallotState](/api/enums/jbballotstate.md) ballotState</code></li></ul> |

## Write

| Function                                 | Definition                                                                                                                                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`finalize`**](/api/contracts/or-ballots/jbreconfigurationbufferballot/write/finalize.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _configured</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBBallotState](/api/enums/jbballotstate.md) ballotState</code></li></ul> |
