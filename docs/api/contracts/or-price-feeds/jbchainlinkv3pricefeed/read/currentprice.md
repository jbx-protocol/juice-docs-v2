# currentPrice

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBChainlinkV3PriceFeed`](/protocol/api/contracts/or-price-feeds/jbchainlinkv3pricefeed/README.md)​‌

Interface: [`IJBPriceFeed`](/protocol/api/interfaces/ijbpricefeed.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Gets the current price from the feed, normalized to the specified number of decimals.**

#### Definition

```
function currentPrice(uint256 _decimals) external view override returns (uint256)  { ... }
```

* Arguments:
  * `_decimals` is the number of decimals the returned fixed point price should include.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IJBPriceFeed`](/protocol/api/interfaces/ijbpricefeed.md) interface.
* The function returns the current price of the feed, as a fixed point number with the specified number of decimals.

#### Body

1.  Get the latest price being reported by the price feed. The `latestRoundData` function returns several feed parameters, but only the `_price` is needed.

    ```
    // Get the latest round information. Only need the price is needed.
    (, int256 _price, , , ) = feed.latestRoundData();
    ```

    _Internal references:_

    * [`feed`](/protocol/api/contracts/or-price-feeds/jbchainlinkv3pricefeed/properties/feed.md)

    _External references:_

    * [`latestRoundData`](https://docs.chain.link/price-feeds-api-reference/#latestrounddata)
2.  Get the number of decimals being reported by the price feed that the provided price is expected to have.

    ```
    // Get a reference to the number of decimals the feed uses.
    uint256 _feedDecimals = feed.decimals();
    ```

    _Internal references:_

    * [`feed`](/protocol/api/contracts/or-price-feeds/jbchainlinkv3pricefeed/properties/feed.md)

    _External references:_

    * [`decimals`](https://docs.chain.link/price-feeds-api-reference/#decimals)
3. Return the fixed point price after normalizing the value to the desired number of decimals.

    ```
    // Return the price, adjusted to the target decimals.
    return uint256(_price).adjustDecimals(_feedDecimals, _decimals);
    ```

    _Library references:_

    * [`JBFixedPointNumber`](/protocol/api/libraries/jbfixedpointnumber.md)
      * `.adjustDecimals(...)`

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  Gets the current price from the feed, normalized to the specified number of decimals.

  @param _decimals The number of decimals the returned fixed point price should include.

  @return The current price of the feed, as a fixed point number with the specified number of decimals.
*/
function currentPrice(uint256 _decimals) external view override returns (uint256) {
  // Get the latest round information. Only need the price is needed.
  (, int256 _price, , , ) = feed.latestRoundData();

  // Get a reference to the number of decimals the feed uses.
  uint256 _feedDecimals = feed.decimals();

  // Return the price, adjusted to the target decimals.
  return uint256(_price).adjustDecimals(_feedDecimals, _decimals);
}
```

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
