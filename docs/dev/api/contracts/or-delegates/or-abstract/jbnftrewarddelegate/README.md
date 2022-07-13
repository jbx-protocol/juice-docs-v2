# JBNFTRewardDelegate

_Delegate that offers project contributors NFTs upon payment._

_Also can be used as a data source._

#### Code

https://github.com/jbx-protocol/juice-nft-rewards/blob/main/contracts/abstract/JBNFTRewardDelegate.sol

#### Addresses

Ethereum mainnet: _Not yet deployed_

#### Interfaces

| Name                                                 | Description                                                                                                                              |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBNFTRewardDelegate`**](/dev/api/interfaces/ijbnftrewarddelegate.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |
| [**`IJBFundingCycleDataSource`**](/dev/api/interfaces/ijbfundingcycledatasource.md) | Allows this contract to be attached to a funding cycle to have its methods called during regular protocol operations. |
| [**`IJBPayDelegate`**](/dev/api/interfaces/ijbpaydelegate.md) | Allows this contract to receive callbacks when a project receives a payment. |

#### Inheritance

| Contract                                                                     | Description                                                                                                           |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [**`JBOperatable`**](/dev/api/contracts/or-abstract/jboperatable/)                           | Includes convenience functionality for checking a message sender's permissions before executing certain transactions. |
| [**`ERC721Votes`**](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#ERC721Votes) | A checkpointable standard definition for non-fungible tokens (NFTs).                                                                  |
| [**`Ownable`**](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable) | Includes convenience functionality for specifying an address that owns the contract, with modifiers that only allow access by the owner. |

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
| [**`SetContractUri`**](/dev/api/contracts/or-delegates/or-abstract/jbnftrewarddelegate/events/setcontracturi.md) | <ul><li><code>string indexed contractUri</code></li><li><code>address caller</code></li></ul> |
| [**`SetBaseUri`**](/dev/api/contracts/or-delegates/or-abstract/jbnftrewarddelegate/events/setbaseuri.md) | <ul><li><code>string indexed baseUri</code></li><li><code>address caller</code></li></ul> |
| [**`SetTokenUriResolver`**](/dev/api/contracts/or-delegates/or-abstract/jbnftrewarddelegate/events/settokenuriresolver.md) | <ul><li><code>IToken721UriResolver indexed _newResolver</code></li><li><code>address caller</code></li></ul> |

#### Properties

| Function                                                          | Definition                                                                                                                                                                                                |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`projectId`**](/dev/api/contracts/or-delegates/or-abstract/jbnftrewarddelegate/properties/projectid.md)                            | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256</code></li></ul> |
| [**`directory`**](/dev/api/contracts/or-delegates/or-abstract/jbnftrewarddelegate/properties/directory.md)                            | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBDirectory](/dev/api/interfaces/ijbdirectory.md)</code></li></ul> |
| [**`baseUri`**](/dev/api/contracts/or-delegates/or-abstract/jbnftrewarddelegate/properties/baseuri.md)                            | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>string memory</code></li></ul> |
| [**`contractUri`**](/dev/api/contracts/or-delegates/or-abstract/jbnftrewarddelegate/properties/contracturi.md)                            | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>string memory</code></li></ul> |
| [**`tokenUriResolver`**](/dev/api/contracts/or-delegates/or-abstract/jbnftrewarddelegate/properties/tokenuriresolver.md)                            | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBTokenUriResolver](/dev/api/interfaces/ijbtokenuriresolver.md)</code></li></ul> |

#### Read

| Function                                 | Definition                                                                                                                                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`payParams`**](/dev/api/contracts/or-delegates/or-abstract/jbnftrewarddelegate/read/payparams.md) | <p><strong>Params</strong></p><ul><li><code>[JBPayParamsData](/dev/api/data-structures/jbpayparamsdata.md) calldata _data</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 reclaimAmount</code></li><li><code>string memory memo</code></li><li><code>[IJBPayDelegate](/dev/api/interfaces/ijbpaydelegate.md) delegate</code></li></ul> |
| [**`redeemParams`**](/dev/api/contracts/or-delegates/or-abstract/jbnftrewarddelegate/read/redeemparams.md) | <p><strong>Params</strong></p><ul><li><code>[JBRedeemParamsData](/dev/api/data-structures/jbredeemparamsdata.md) calldata _data</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 weight</code></li><li><code>string memory memo</code></li><li><code>[IJBRedemptionDelegate](/dev/api/interfaces/ijbredemptiondelegate.md) delegate</code></li></ul> |
| [**`supportsInterface`**](/dev/api/contracts/or-delegates/or-abstract/jbnftrewarddelegate/read/supportsinterface.md) | <p><strong>Params</strong></p><ul><li><code>bytes4 _interfaceId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool</code></li></ul> |
| [**`tokenURI`**](/dev/api/contracts/or-delegates/or-abstract/jbnftrewarddelegate/read/tokenuri.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _tokenId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>string memory</code></li></ul> |

#### Write

| Function                                 | Definition                                                                                                                                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`didPay`**](/dev/api/contracts/or-delegates/or-abstract/jbnftrewarddelegate/write/didpay.md) | <p><strong>Params</strong></p><ul><li><code>[JBDidPayData](/dev/api/data-structures/jbdidpaydata.md) _data</code></li></ul> |
| [**`setContractUri`**](/dev/api/contracts/or-delegates/or-abstract/jbnftrewarddelegate/write/setcontracturi.md) | <p><strong>Params</strong></p><ul><li><code>string calldata _contractMetadataUri</code></li></ul> |
| [**`setTokenUriResolver`**](/dev/api/contracts/or-delegates/or-abstract/jbnftrewarddelegate/write/settokenuriresolver.md) | <p><strong>Params</strong></p><ul><li><code>[IJBTokenUriResolver](/dev/api/interfaces/ijbtokenuriresolver.md) _newResolver</code></li></ul> |
| [**`setBaseUri`**](/dev/api/contracts/or-delegates/or-abstract/jbnftrewarddelegate/write/setbaseuri.md) | <p><strong>Params</strong></p><ul><li><code>string calldata _baseUri</code></li></ul> |
