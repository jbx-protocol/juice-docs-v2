# JBFundingCycleStore

_Manages funding cycle configurations and scheduling._


#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBFundingCycleStore.sol

#### Addresses

Ethereum mainnet: [`0xb056BE159605c626D3e9aCa5DE466FFfa475758c`](https://etherscan.io/address/0xb056BE159605c626D3e9aCa5DE466FFfa475758c)

Ethereum rinkeby: [`0x79cB4AEdf1E3EB3853f9A0BD9a6c597CdCb73C72`](https://rinkeby.etherscan.io/address/0x79cB4AEdf1E3EB3853f9A0BD9a6c597CdCb73C72)

#### Interfaces

| Name                                                                   | Description                                                                                                                              |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBFundingCycleStore`**](/protocol/api/interfaces/ijbfundingcyclestore.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                         | Description                                                                                                                                   |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`JBControllerUtility`**](/protocol/api/contracts/or-abstract/jbcontrollerutility/) | Includes convenience functionality for checking if the message sender is the current controller of the project whose data is being manipulated.                                      |

#### Constructor

```
/** 
  @param _directory A contract storing directories of terminals and controllers for each project.
*/
constructor(IJBDirectory _directory) JBControllerUtility(_directory) {}
```

* `_directory` is an [`IJBDirectory`](/protocol/api/interfaces/ijbdirectory.md) contract storing directories of terminals and controllers for each project.

#### Events

| Name                                   | Data                                                                                                                                                                                                                                                                                                                                                      |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`Configure`**](/protocol/api/contracts/jbfundingcyclestore/events/configure.md) | <ul><li><code>uint256 indexed configuration</code></li><li><code>uint256 indexed projectId</code></li><li><code>[JBFundingCycleData](/protocol/api/data-structures/jbfundingcycledata.md) data</code></li><li><code>uint256 metadata</code></li><li><code>uint256 mustStartAtOrAfter</code></li><li><code>address caller</code></li></ul> |BANNY
| [**`Init`**](/protocol/api/contracts/jbfundingcyclestore/events/init.md)           | <ul><li><code>uint256 indexed configuration</code></li><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed basedOn</code></li></ul>                                                                                                                                                                                                 |

#### Properties

| Function                                     | Definition                                                                                                                                                    |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`latestConfigurationOf`**](/protocol/api/contracts/jbfundingcyclestore/properties/latestconfigurationof.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 latestConfiguration</code></li></ul> |

#### Read

| Function                                                   | Definition                                                                                                                                                                                                                                      |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`get`**](read/get.md)                                   | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _configuration</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBFundingCycle](/protocol/api/data-structures/jbfundingcycle.md) fundingCycle</code></li></ul> |
| [**`latestConfiguredOf`**](read/latestconfiguredof.md)                         | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBFundingCycle](/protocol/api/data-structures/jbfundingcycle.md) fundingCycle</code></li><li><code>[JBBallotState](/protocol/api/enums/jbballotstate.md) ballotState</code></li></ul>      |
| [**`queuedOf`**](read/queuedof.md)                         | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBFundingCycle](/protocol/api/data-structures/jbfundingcycle.md) fundingCycle</code></li></ul>      |
| [**`currentOf`**](read/currentof.md)                       | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBFundingCycle](/protocol/api/data-structures/jbfundingcycle.md) fundingCycle</code></li></ul>      |
| [**`currentBallotStateOf`**](read/currentballotstateof.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBBallotState](/protocol/api/enums/jbballotstate.md) ballotState</code></li></ul>                   |

#### Write

| Function                                    | Definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`configureFor`**](write/configurefor.md) | <p><strong>Traits</strong></p><ul><li><code>[onlyController](/protocol/api/contracts/or-abstract/jbcontrollerutility/modifiers/onlycontroller.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>[JBFundingCycleData](/protocol/api/data-structures/jbfundingcycledata.md) _data</code></li><li><code>uint256 _metadata</code></li><li><code>uint256 _mustStartAtOrAfter</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBFundingCycle](/protocol/api/data-structures/jbfundingcycle.md) fundingCycle</code></li></ul> |
