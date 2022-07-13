# JBReconfigurationBufferBallot

_Manages approving funding cycle reconfigurations automatically after a buffer period._

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBReconfigurationBufferBallot.sol

#### Interfaces

| Name                                             | Description                                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBReconfigurationBufferBallot`**](/dev/api/interfaces/ijbreconfigurationbufferballot.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                                          | Description                                                                                                                               |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [**`ERC165`**](https://docs.openzeppelin.com/contracts/4.x/api/utils#ERC165)                            |  Introspection on interface adherance.                      |

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
| [**`Finalize`**](/dev/api/contracts/or-ballots/jbreconfigurationbufferballot/events/finalize.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed configuration</code></li><li><code>[JBBallotState](/dev/api/enums/jbballotstate.md) indexed ballotState</code></li><li><code>address caller</code></li></ul> |

#### Properties

| Function                                                          | Definition                                                                                                                                                                                                |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`duration`**](/dev/api/contracts/or-ballots/jbreconfigurationbufferballot/properties/duration.md)                            | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256</code></li></ul> |
| [**`fundingCycleStore`**](/dev/api/contracts/or-ballots/jbreconfigurationbufferballot/properties/fundingcyclestore.md)               | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBFundingCycleStore](/dev/api/interfaces/ijbfundingcyclestore.md)</code></li></ul> |
| [**`finalState`**](/dev/api/contracts/or-ballots/jbreconfigurationbufferballot/properties/finalstate.md)                            | <p><strong>Returns</strong></p><ul><li><code>uint256</code></li></ul> |

#### Read

| Function                                 | Definition                                                                                                                                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`stateOf`**](/dev/api/contracts/or-ballots/jbreconfigurationbufferballot/read/stateof.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _configured</code></li><li><code>uint256 _start</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBBallotState](/dev/api/enums/jbballotstate.md) ballotState</code></li></ul> |
| [**`supportsInterface`**](/dev/api/contracts/or-ballots/jbreconfigurationbufferballot/read/supportsinterface.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _interfaceId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool</code></li></ul> |

#### Write

| Function                                 | Definition                                                                                                                                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`finalize`**](/dev/api/contracts/or-ballots/jbreconfigurationbufferballot/write/finalize.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _configured</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBBallotState](/dev/api/enums/jbballotstate.md) ballotState</code></li></ul> |
