# JBSplitsStore

_Stores splits for each project._


#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBSplitsStore.sol

#### Addresses

Ethereum mainnet: [`0x1ABea264425cD8e65315e34A50F9C83bC3A43a50`](https://etherscan.io/address/0x1ABea264425cD8e65315e34A50F9C83bC3A43a50)

#### Interfaces

| Name                                                 | Description                                                                                                                              |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBSplitsStore`**](/api/interfaces/ijbsplitsstore.md) |General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                                     | Description                                                                                                           |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [**`JBOperatable`**](/api/contracts/or-abstract/jboperatable/)                           | Includes convenience functionality for checking a message sender's permissions before executing certain transactions. |

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


#### Events

| Name                                 | Data                                                                                                                                                                                                                 |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`SetSplit`**](/api/contracts/jbsplitsstore/events/setsplit.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed domain</code></li><li><code>uint256 indexed group</code></li><li><code>[JBSplit](/api/data-structures/jbsplit.md) split</code></li><li><code>address caller</code></li></ul> |

#### Properties

| Function                                   | Definition                                                                         |
| ------------------------------------------ | ---------------------------------------------------------------------------------- |
| [**`projects`**](/api/contracts/jbsplitsstore/properties/projects.md)   | <p><strong>Returns</strong></p><ul><li><code>IJBProjects projects</code></li></ul> |
| [**`directory`**](/api/contracts/jbsplitsstore/properties/directory.md) | <p><strong>Returns</strong></p><ul><li><code>IJBPaymentTerminal terminal</code></li></ul> |

#### Read

| Function                           | Definition                                                                                                                                                                                                                                                                                         |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`splitsOf`**](/api/contracts/jbsplitsstore/read/splitsof.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _domain</code></li><li><code>uint256 _group</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBSplit](/api/data-structures/jbsplit.md)[] splits</code></li></ul> |

#### Write

| Function                  | Definition                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`set`**](/api/contracts/jbsplitsstore/write/set.md) | <p><strong>Traits</strong></p><ul><li><code>[requirePermissionAllowingOverride](/api/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _domain</code></li><li><code>uint256 _group</code></li><li><code>[JBSplit](/api/data-structures/jbsplit.md)[] _splits</code></li></ul> |
