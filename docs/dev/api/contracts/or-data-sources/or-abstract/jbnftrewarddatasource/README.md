# JBNFTRewardDataSource

_Data source that offers project contributors NFTs._

_This JBFundingCycleDataSource implementation will simply through the weight, reclaimAmount, and memos they are called with._

#### Code

https://github.com/jbx-protocol/juice-nft-rewards/blob/main/contracts/abstract/JBNFTRewardDataSource.sol

#### Addresses

Ethereum mainnet: _Not yet deployed_

#### Interfaces

| Name                                                 | Description                                                                                                                              |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBNFTRewardDataSource`**](/dev/api/interfaces/ijbnftrewarddatasource.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                                     | Description                                                                                                           |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [**`JBOperatable`**](/dev/api/contracts/or-abstract/jboperatable/)                           | Includes convenience functionality for checking a message sender's permissions before executing certain transactions. |
| [**`ERC721Votes`**](https://docs.openzeppelin.com/contracts/4.x/dev/api/token/erc721#ERC721Votes) | A checkpointable standard definition for non-fungible tokens (NFTs).                                                                  |
| [**`Ownable`**](https://docs.openzeppelin.com/contracts/4.x/dev/api/access#Ownable) | Includes convenience functionality for specifying an address that owns the contract, with modifiers that only allow access by the owner. |

#### Constructor

```
/**
  @param _projectId The ID of the project for which this NFT should be minted in response to payments made. 
  @param _directory The directory of terminals and controllers for projects.
  @param _name The name of the token.
  @param _symbol The symbol that the token should be represented by.
  @param _tokenUriResolver A contract responsible for resolving the token URI for each token ID.
  @param _baseUri The token's base URI, to be used if a URI resolver is not provided. 
  @param _contractUri A URI where contract metadata can be found. 
  @param __expectedCaller The address that should be calling the data source.
  @param _owner The address that will own this contract.
*/
constructor(
  uint256 _projectId,
  IJBDirectory _directory,
  string memory _name,
  string memory _symbol,
  IJBTokenUriResolver _tokenUriResolver,
  string memory _baseUri,
  string memory _contractUri,
  address __expectedCaller,
  address _owner
) ERC721Rari(_name, _symbol) {
  projectId = _projectId;
  directory = _directory;
  baseUri = _baseUri;
  tokenUriResolver = _tokenUriResolver;
  contractUri = _contractUri;
  _expectedCaller = __expectedCaller;

  // Transfer the ownership to the specified address.
  if (_owner != address(0)) _transferOwnership(_owner);
}
```

* `_projectId` is the ID of the project for which this NFT should be minted in response to payments made. 
* `_directory` is the directory of terminals and controllers for projects.
* `_name` is the name of the token.
* `_symbol` is the symbol that the token should be represented by.
* `_tokenUriResolver` is a contract responsible for resolving the token URI for each token ID.
* `_baseUri` is the token's base URI, to be used if a URI resolver is not provided. 
* `_contractUri` is a URI where contract metadata can be found. 
* `__expectedCaller` is the address that should be calling the data source.
* `_owner` is the address that will own this contract.

#### Events

| Name                               | Data                                                                                                                                                                                    |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`SetContractUri`**](/dev/api/contracts/or-data-sources/or-abstract/jbnftrewarddatasource/events/setcontracturi.md) | <ul><li><code>string indexed contractUri</code></li><li><code>address caller</code></li></ul> |
| [**`SetBaseUri`**](/dev/api/contracts/or-data-sources/or-abstract/jbnftrewarddatasource/events/setbaseuri.md) | <ul><li><code>string indexed baseUri</code></li><li><code>address caller</code></li></ul> |
| [**`SetTokenUriResolver`**](/dev/api/contracts/or-data-sources/or-abstract/jbnftrewarddatasource/events/settokenuriresolver.md) | <ul><li><code>IToken721UriResolver indexed _newResolver</code></li><li><code>address caller</code></li></ul> |

#### Properties

| Function                                                          | Definition                                                                                                                                                                                                |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`projectId`**](/dev/api/contracts/or-data-sources/or-abstract/jbnftrewarddatasource/properties/projectid.md)                            | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256</code></li></ul> |
| [**`directory`**](/dev/api/contracts/or-data-sources/or-abstract/jbnftrewarddatasource/properties/directory.md)                            | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBDirectory](/dev/api/interfaces/ijbdirectory.md)</code></li></ul> |
| [**`baseUri`**](/dev/api/contracts/or-data-sources/or-abstract/jbnftrewarddatasource/properties/baseuri.md)                            | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>string memory</code></li></ul> |
| [**`contractUri`**](/dev/api/contracts/or-data-sources/or-abstract/jbnftrewarddatasource/properties/contracturi.md)                            | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>string memory</code></li></ul> |
| [**`tokenUriResolver`**](/dev/api/contracts/or-data-sources/or-abstract/jbnftrewarddatasource/properties/tokenuriresolver.md)                            | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>IToken721UriResolver</code></li></ul> |

#### Write

| Function                                 | Definition                                                                                                                                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`setContractUri`**](/dev/api/contracts/or-data-sources/or-abstract/jbnftrewarddatasource/write/setcontracturi.md) | <p><strong>Params</strong></p><ul><li><code>string calldata _contractMetadataUri</code></li></ul> |
| [**`setTokenUriResolver`**](/dev/api/contracts/or-data-sources/or-abstract/jbnftrewarddatasource/write/settokenuriresolver.md) | <p><strong>Params</strong></p><ul><li><code>[IJBTokenUriResolver](/dev/api/interfaces/ijbtokenuriresolver.md) _newResolver</code></li></ul> |
| [**`setBaseUri`**](/dev/api/contracts/or-data-sources/or-abstract/jbnftrewarddatasource/write/setbaseuri.md) | <p><strong>Params</strong></p><ul><li><code>string calldata _baseUri</code></li></ul> |
