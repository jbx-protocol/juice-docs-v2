# JBProjects

_Stores project ownership and metadata._

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBProjects.sol

#### Addresses

Ethereum mainnet: [`0xB9Ee9d8203467f6EC0eAC81163d210bd1a7d3b55`](https://etherscan.io/address/0xB9Ee9d8203467f6EC0eAC81163d210bd1a7d3b55)

#### Interfaces

| Name                                                 | Description                                                                                                                              |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBProjects`**](/api/interfaces/ijbprojects.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                                     | Description                                                                                                           |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [**`JBOperatable`**](/api/contracts/or-abstract/jboperatable/)                           | Includes convenience functionality for checking a message sender's permissions before executing certain transactions. |
| [**`ERC721Votes`**](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#ERC721Votes) | A checkpointable standard definition for non-fungible tokens (NFTs).                                                                  |
| [**`Ownable`**](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable) | Includes convenience functionality for specifying an address that owns the contract, with modifiers that only allow access by the owner. |

#### Constructor

```
constructor(IJBOperatorStore _operatorStore)
  ERC721('Juicebox Projects', 'JUICEBOX')
  EIP712('Juicebox Projects', '1')
  JBOperatable(_operatorStore)
{}
```
* **Arguments:**
  * `_operatorStore` is an [`IJBOperatorStore`](/api/interfaces/ijboperatorstore.md) contract storing operator assignments.

#### Events

| Name                                                                                                      | Data                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`Create`**](/api/contracts/jbprojects/events/create.md)                                                                          | <ul><li><code>uint256 indexed projectId</code></li><li><code>address indexed owner</code></li><li><code>[JBProjectMetadata](/api/data-structures/jbprojectmetadata.md) metadata</code></li><li><code>address caller</code></li></ul>                  |
| [**`SetMetadata`**](/api/contracts/jbprojects/events/setmetadata.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>[JBProjectMetadata](/api/data-structures/jbprojectmetadata.md) metadata</code></li><li><code>address caller</code></li></ul>                                                                                                         |
| [**`SetTokenUriResolver`**](/api/contracts/jbprojects/events/settokenuriresolver.md) | <ul><li><code>[IJBTokenUriResolver](/api/interfaces/ijbtokenuriresolver.md) resolver</code></li><li><code>address caller</code></li></ul>                                                                                                         |

#### Properties

| Name                                                                                                        | Definition                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`count`**](/api/contracts/jbprojects/properties/count.md)                                                                          | <p><strong>Returns</strong></p><ul><li><code>uint256 count</code></li></ul>                                                                                                |
| [**`metadataContentOf`**](/api/contracts/jbprojects/properties/metadatacontentof.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _domain</code></li></ul><p><strong>Returns</strong></p><ul><li><code>string content</code></li></ul>                    |
| [**`tokenUriResolver`**](/api/contracts/jbprojects/properties/tokenuriresolver.md) | <p><strong>Returns</strong></p><ul><li><code>[IJBTokenUriResolver](/api/interfaces/ijbtokenuriresolver.md) tokenUriResolver</code></li></ul>                    |

#### Read

| Function                                                                                                     | Definition                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`tokenURI`**](/api/contracts/jbprojects/read/tokenuri.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul>                                                                                                                          |

#### Write

| Function                                                                                                     | Definition                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`createFor`**](/api/contracts/jbprojects/write/createfor.md)                                                                        | <p><strong>Params</strong></p><ul><li><code>address _owner</code></li><li><code>[JBProjectMetadata](/api/data-structures/jbprojectmetadata.md) _metadata</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 projectId</code></li></ul>                                             |
| [**`setMetadataOf`**](/api/contracts/jbprojects/write/setmetadataof.md) | <p><strong>Traits</strong></p><ul><li><code>[requirePermission](/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>[JBProjectMetadata](/api/data-structures/jbprojectmetadata.md) _metadata</code></li></ul>                                                                                                                          |
| [**`setTokenUriResolver`**](/api/contracts/jbprojects/write/settokenuriresolver.md) | <p><strong>Traits</strong></p><ul><li><code>[onlyOwner](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>[IJBTokenUriResolver](/api/interfaces/ijbtokenuriresolver.md) _newResolver</code></li></ul>                                                                                                                          |
