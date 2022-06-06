# JBPrices

_Manages and normalizes price feeds._

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBPrices.sol

#### Addresses

Ethereum mainnet: [`0xCDE93bdA2a706Fc652F7e75241bA949aCB9f4Fe5`](https://etherscan.io/address/0xCDE93bdA2a706Fc652F7e75241bA949aCB9f4Fe5)

Ethereum rinkeby: [`0xFF1D73AB28140b574Bb7A90e9fBCeD1eDAFce5c1`](https://rinkeby.etherscan.io/address/0xFF1D73AB28140b574Bb7A90e9fBCeD1eDAFce5c1)

#### Interfaces

| Name                                             | Description                                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBPrices`**](/protocol/api/interfaces/ijbprices.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                                  | Description                                                                                                                              |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`Ownable`**](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable) | Includes convenience functionality for checking a message sender's permissions before executing certain transactions. |

#### Constructor

```
/** 
  @param _owner The address that will own the contract.
*/
constructor(address _owner) {
  // Transfer the ownership.
  transferOwnership(_owner);
}
```

* `_owner` is the address that will own the contract.

#### Events

| Name                               | Data                                                                                                                                                                                    |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`AddFeed`**](/protocol/api/contracts/jbprices/events/addfeed.md) | <ul><li><code>uint256 indexed currency</code></li><li><code>uint256 indexed base</code></li><li><code>[IJBPriceFeed](/protocol/api/interfaces/ijbpricefeed.md) feed</code></li></ul> |

#### Properties

| Function                                                          | Definition                                                                                                                                                                                                |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`feedFor`**](/protocol/api/contracts/jbprices/properties/feedfor.md)                            | <p><strong>Params</strong></p><ul><li><code>uint256 _currency</code></li><li><code>uint256 _base</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBPriceFeed](/protocol/api/interfaces/ijbpricefeed.md) feed</code></li></ul> |

#### Read

| Function                                 | Definition                                                                                                                                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`priceFor`**](read/pricefor.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _currency</code></li><li><code>uint256 _base</code></li><li><code>uint256 _decimals</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 price</code></li></ul> |

#### Write

| Function                             | Definition                                                                                                                                                                                                                               |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`addFeedFor`**](/protocol/api/contracts/jbprices/write/addfeed.md) | <p><strong>Traits</strong></p><ul><li><code>[onlyOwner](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _currency</code></li><li><code>uint256 _base</code></li><li><code>[IJBPriceFeed](/protocol/api/interfaces/ijbpricefeed.md) _feed</code></li></ul> |
