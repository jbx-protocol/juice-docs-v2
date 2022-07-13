# JBProjects

_Stores project ownership and metadata._

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBProjects.sol

#### Addresses

Ethereum mainnet: [`0xD8B4359143eda5B2d763E127Ed27c77addBc47d3`](https://etherscan.io/address/0xD8B4359143eda5B2d763E127Ed27c77addBc47d3)

Ethereum rinkeby: [`0x2d8e361f8F1B5daF33fDb2C99971b33503E60EEE`](https://rinkeby.etherscan.io/address/0x2d8e361f8F1B5daF33fDb2C99971b33503E60EEE)

#### Interfaces

| Name                                                 | Description                                                                                                                              |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBProjects`**](/dev/api/interfaces/ijbprojects.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                                     | Description                                                                                                           |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [**`JBOperatable`**](/dev/api/contracts/or-abstract/jboperatable/)                           | Includes convenience functionality for checking a message sender's permissions before executing certain transactions. |
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

* `_operatorStore` is an [`IJBOperatorStore`](/dev/api/interfaces/ijboperatorstore.md) contract storing operator assignments.

#### Events

| Name                                                                                                      | Data                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`Create`**](/dev/api/contracts/jbprojects/events/create.md)                                                                          | <ul><li><code>uint256 indexed projectId</code></li><li><code>address indexed owner</code></li><li><code>[JBProjectMetadata](/dev/api/data-structures/jbprojectmetadata.md) metadata</code></li><li><code>address caller</code></li></ul>                  |
| [**`SetMetadata`**](/dev/api/contracts/jbprojects/events/setmetadata.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>[JBProjectMetadata](/dev/api/data-structures/jbprojectmetadata.md) metadata</code></li><li><code>address caller</code></li></ul>                                                                                                         |
| [**`SetTokenUriResolver`**](/dev/api/contracts/jbprojects/events/settokenuriresolver.md) | <ul><li><code>[IJBTokenUriResolver](/dev/api/interfaces/ijbtokenuriresolver.md) indexed resolver</code></li><li><code>address caller</code></li></ul>                                                                                                         |

#### Properties

| Name                                                                                                        | Definition                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`count`**](/dev/api/contracts/jbprojects/properties/count.md)                                                                          | <p><strong>Returns</strong></p><ul><li><code>uint256</code></li></ul>                                                                                                |
| [**`metadataContentOf`**](/dev/api/contracts/jbprojects/properties/metadatacontentof.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _domain</code></li></ul><p><strong>Returns</strong></p><ul><li><code>string</code></li></ul>                    |
| [**`tokenUriResolver`**](/dev/api/contracts/jbprojects/properties/tokenuriresolver.md) | <p><strong>Returns</strong></p><ul><li><code>[IJBTokenUriResolver](/dev/api/interfaces/ijbtokenuriresolver.md)</code></li></ul>                    |

#### Read

| Function                                                                                                     | Definition                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`tokenURI`**](/dev/api/contracts/jbprojects/read/tokenuri.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul>                                                                                                                          |
| [**`supportsInterface`**](/dev/api/contracts/jbprojects/read/supportsinterface.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _interfaceId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool</code></li></ul> |

#### Write

| Function                                                                                                     | Definition                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`createFor`**](/dev/api/contracts/jbprojects/write/createfor.md)                                                                        | <p><strong>Params</strong></p><ul><li><code>address _owner</code></li><li><code>[JBProjectMetadata](/dev/api/data-structures/jbprojectmetadata.md) _metadata</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 projectId</code></li></ul>                                             |
| [**`setMetadataOf`**](/dev/api/contracts/jbprojects/write/setmetadataof.md) | <p><strong>Traits</strong></p><ul><li><code>[requirePermission](/dev/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>[JBProjectMetadata](/dev/api/data-structures/jbprojectmetadata.md) _metadata</code></li></ul>                                                                                                                          |
| [**`setTokenUriResolver`**](/dev/api/contracts/jbprojects/write/settokenuriresolver.md) | <p><strong>Traits</strong></p><ul><li><code>[onlyOwner](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>[IJBTokenUriResolver](/dev/api/interfaces/ijbtokenuriresolver.md) _newResolver</code></li></ul>                                                                                                                          |
