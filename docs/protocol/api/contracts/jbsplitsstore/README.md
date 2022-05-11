# JBSplitsStore

_Stores splits for each project._


#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBSplitsStore.sol

#### Addresses

Ethereum mainnet: [`0x32bb71C6DbD6A1b3A37394565872D0eB7fF3846D`](https://etherscan.io/address/0x32bb71C6DbD6A1b3A37394565872D0eB7fF3846D)

Ethereum rinkeby: [`0x5918B60672f53D504881C63AB04c65338ff185d7`](https://rinkeby.etherscan.io/address/0x5918B60672f53D504881C63AB04c65338ff185d7)

#### Interfaces

| Name                                                 | Description                                                                                                                              |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBSplitsStore`**](/protocol/api/interfaces/ijbsplitsstore.md) |General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                                     | Description                                                                                                           |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [**`JBOperatable`**](/protocol/api/contracts/or-abstract/jboperatable/)                           | Includes convenience functionality for checking a message sender's permissions before executing certain transactions. |

#### Constructor

```
/** 
  @param _operatorStore A contract storing operator assignments.
  @param _projects A contract which mints ERC-721's that represent project ownership and transfers.
  @param _directory A contract storing directories of terminals and controllers for each project.
*/
constructor(
  IJBOperatorStore _operatorStore,
  IJBProjects _projects,
  IJBDirectory _directory
) JBOperatable(_operatorStore) {
  projects = _projects;
  directory = _directory;
}
```

* `_operatorStore` is an [`IJBOperatorStore`](/protocol/api/interfaces/ijboperatorstore.md) contract storing operator assignments.
* `_projects` is an [`IJBProjects`](/protocol/api/interfaces/ijbprojects.md) contract which mints ERC-721's that represent project ownership and transfers.
* `_directory` is an [`IJBDirectory`](/protocol/api/interfaces/ijbdirectory.md) contract storing directories of terminals and controllers for each project.

#### Events

| Name                                 | Data                                                                                                                                                                                                                 |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`SetSplit`**](/protocol/api/contracts/jbsplitsstore/events/setsplit.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed domain</code></li><li><code>uint256 indexed group</code></li><li><code>[JBSplit](/protocol/api/data-structures/jbsplit.md) split</code></li><li><code>address caller</code></li></ul> |

#### Properties

| Function                                   | Definition                                                                         |
| ------------------------------------------ | ---------------------------------------------------------------------------------- |
| [**`projects`**](/protocol/api/contracts/jbsplitsstore/properties/projects.md)   | <p><strong>Returns</strong></p><ul><li><code>IJBProjects projects</code></li></ul> |
| [**`directory`**](/protocol/api/contracts/jbsplitsstore/properties/directory.md) | <p><strong>Returns</strong></p><ul><li><code>IJBPaymentTerminal terminal</code></li></ul> |

#### Read

| Function                           | Definition                                                                                                                                                                                                                                                                                         |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`splitsOf`**](/protocol/api/contracts/jbsplitsstore/read/splitsof.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _domain</code></li><li><code>uint256 _group</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBSplit](/protocol/api/data-structures/jbsplit.md)[] splits</code></li></ul> |

#### Write

| Function                  | Definition                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`set`**](/protocol/api/contracts/jbsplitsstore/write/set.md) | <p><strong>Traits</strong></p><ul><li><code>[requirePermissionAllowingOverride](/protocol/api/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _domain</code></li><li><code>uint256 _group</code></li><li><code>[JBSplit](/protocol/api/data-structures/jbsplit.md)[] _splits</code></li></ul> |
