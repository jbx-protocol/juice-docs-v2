# JBChainlinkV3PriceFeed

_Manages and normalizes price feeds._

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBChainlinkV3PriceFeed.sol

#### Addresses

Ethereum mainnet: [`0xfd6Bc33C9e25c6d9Bbd00b04992E3639E786DCEd`](https://etherscan.io/address/0xfd6Bc33C9e25c6d9Bbd00b04992E3639E786DCEd)

#### Interfaces

| Name                                             | Description                                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBPriceFeed`**](/api/interfaces/ijbpricefeed.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Constructor

```
/** 
  @param _feed The feed to report prices from.
*/
constructor(AggregatorV3Interface _feed) {
  feed = _feed;
}
```

* `_feed` is the feed to report prices from.

#### Properties

| Function                                                          | Definition                                                                                                                                                                                                |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`feed`**](/api/contracts/or-price-feeds/jbchainlinkv3pricefeed/properties/feed.md)                            | <p><strong>Returns</strong></p><ul><li><code>[AggregatorV3Interface](https://docs.chain.link/docs/price-feeds-api-reference/) feed</code></li></ul> |

#### Read

| Function                                 | Definition                                                                                                                                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`currentPrice`**](/api/contracts/or-price-feeds/jbchainlinkv3pricefeed/read/currentprice.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _decimals</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 price</code></li></ul> |
