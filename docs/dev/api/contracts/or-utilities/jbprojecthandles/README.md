# JBProjectHandles

_Manages reverse records that point from JB project IDs to ENS nodes. If the reverse record of a project ID is pointed to an ENS node with a TXT record matching the ID of that project, then the ENS node will be considered the "handle" for that project._

#### Code

https://github.com/jbx-protocol/juice-project-handles/blob/main/contracts/JBProjectHandles.sol

#### Addresses

Ethereum mainnet: [``](https://etherscan.io/address/)

Ethereum rinkeby: [``](https://rinkeby.etherscan.io/address/)

#### Interfaces

| Name                                                 | Description                                                                                                                              |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBProjectHandles`**](/dev/api/interfaces/ijbprojecthandles.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                                     | Description                                                                                                           |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [**`JBOperatable`**](/dev/api/contracts/or-abstract/jboperatable/) | Includes convenience functionality for checking a message sender's permissions before executing certain transactions. |

#### Constructor

```
/** 
  @param _projects A contract which mints ERC-721's that represent project ownership and transfers.
  @param _operatorStore A contract storing operator assignments.
  @param _textResolver The ENS text resolver contract address.
*/
constructor(
  IJBProjects _projects,
  IJBOperatorStore _operatorStore,
  ITextResolver _textResolver
) JBOperatable(_jbOperatorStore) {
  projects = _projects;
  textResolver = _textResolver;
}
```

* `_projects` is a contract which mints ERC-721's that represent project ownership and transfers.
* `_operatorStore` is a contract storing operator assignments.
* `_textResolver` is the ENS text resolver contract address.

#### Events

| Name                                                                                                      | Data                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`SetEnsNameParts`**](/dev/api/contracts/or-utilities/jbprojecthandles/events/setensnameparts.md)                                                                          | <ul><li><code>uint256 indexed projectId</code></li><li><code>string indexed handle</code></li><li><code>string[] parts</code></li><li><code>address caller</code></li></ul>                  |

#### Properties

| Name                                                                                                        | Definition                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`projects`**](/dev/api/contracts/or-utilities/jbprojecthandles/properties/projects.md)                                                                          | <p><strong>Returns</strong></p><ul><li><code>[IJBProjects](/dev/api/interfaces/ijbprojects)</code></li></ul>                                                                                                |
| [**`textResolver`**](https://docs.ens.domains/contract-api-reference/publicresolver#get-text-data)                                                                          | <p><strong>Returns</strong></p><ul><li><code>[ITextResolver](https://docs.ens.domains/contract-api-reference/publicresolver#get-text-data)</code></li></ul>                                                                                                |
| [**`TEXT_KEY`**](/dev/api/contracts/or-utilities/jbprojecthandles/properties/textkey.md)                                                                          | <p><strong>Returns</strong></p><ul><li><code>string</code></li></ul>                                                                                                |

#### Read

| Function                                                       | Definition                                                                                                                                                                                                             |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`handleOf`**](/dev/api/contracts/or-utilities/jbprojecthandles/read/handleof.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>string memory</code></li></ul> |
| [**`ensNamePartsOf`**](/dev/api/contracts/or-utilities/jbprojecthandles/read/ensnamepartsof.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>string[] memory</code></li></ul> |

#### Write

| Function                                                                                                     | Definition                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`setEnsNamePartsFor`**](/dev/api/contracts/or-utilities/jbprojecthandles/write/setensnamepartsfor.md)                                                                        | <p><strong>Traits</strong></p><ul><li><code>[requirePermission](/dev/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>string[] memory _parts</code></li></ul>                                             |
