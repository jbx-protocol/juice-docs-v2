# JBReconfigurationBufferBallot

_Manages approving funding cycle reconfigurations automatically after a buffer period._

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBReconfigurationBufferBallot.sol

#### Interfaces

| Name                                             | Description                                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBReconfigurationBufferBallot`**](/protocol/api/interfaces/ijbreconfigurationbufferballot.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                                          | Description                                                                                                                               |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [**`ERC165`**](https://docs.openzeppelin.com/contracts/2.x/api/introspection#ERC165)                            |  Introspection on interface adherance.                      |

#### Constructor

```
/**
  @param _duration The number of seconds to wait until a reconfiguration can be either `Approved` or `Failed`.
  @param _fundingCycleStore A contract storing all funding cycle configurations.
*/
constructor(uint256 _duration, IJBFundingCycleStore _fundingCycleStore) {
  duration = _duration;
  fundingCycleStore = _fundingCycleStore;
}
```

* `_duration` is the number of seconds to wait until a reconfiguration can be either `Approved` or `Failed`.
* `_fundingCycleStore` is a contract storing all funding cycle configurations.

#### Events

| Name                               | Data                                                                                                                                                                                    |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`Finalize`**](/protocol/api/contracts/or-ballots/jbreconfigurationbufferballot/events/finalize.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed configuration</code></li><li><code>[JBBallotState](/protocol/api/enums/jbballotstate.md) indexed ballotState</code></li><li><code>address caller</code></li></ul> |

#### Properties

| Function                                                          | Definition                                                                                                                                                                                                |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`duration`**](/protocol/api/contracts/or-ballots/jbreconfigurationbufferballot/properties/duration.md)                            | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 duration</code></li></ul> |
| [**`fundingCycleStore`**](/protocol/api/contracts/or-ballots/jbreconfigurationbufferballot/properties/fundingcyclestore.md)               | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBFundingCycleStore](/protocol/api/interfaces/ijbfundingcyclestore.md) fundingCycleStore</code></li></ul> |
| [**`finalState`**](/protocol/api/contracts/or-ballots/jbreconfigurationbufferballot/properties/finalstate.md)                            | <p><strong>Returns</strong></p><ul><li><code>uint256 finalState</code></li></ul> |

#### Read

| Function                                 | Definition                                                                                                                                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`stateOf`**](/protocol/api/contracts/or-ballots/jbreconfigurationbufferballot/read/stateof.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _configured</code></li><li><code>uint256 _start</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBBallotState](/protocol/api/enums/jbballotstate.md) ballotState</code></li></ul> |
| [**`supportsInterface`**](/protocol/api/contracts/or-ballots/jbreconfigurationbufferballot/read/supportsinterface.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _interfaceId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool</code></li></ul> |

#### Write

| Function                                 | Definition                                                                                                                                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`finalize`**](/protocol/api/contracts/or-ballots/jbreconfigurationbufferballot/write/finalize.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _configured</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBBallotState](/protocol/api/enums/jbballotstate.md) ballotState</code></li></ul> |
