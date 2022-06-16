# priceFor

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPrices`](/dev/api/contracts/jbprices/README.md)​‌

Interface: [`IJBPrices`](/dev/api/interfaces/ijbprices.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Gets the number of `_currency` units that can be converted to 1 `_base` unit.**

#### Definition

```
function priceFor(
  uint256 _currency,
  uint256 _base,
  uint256 _decimals
) external view override returns (uint256) { ... }
```

* Arguments:
  * `_currency` is the currency units the feed's resulting price is in terms of.
  * `_base` is the base currency unit being priced by the feed.
  * `_decimals` is the number of decimals the returned fixed point price should include.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IJBPrices`](/dev/api/interfaces/ijbprices.md) interface.
* The function returns the price of the currency in terms of the base, as a fixed point number with the specified number of decimals.

#### Body

1.  Return 1 if the currency and the base are the same, since they have the same price. Normalize to the desired number of decimals.

    ```
    // If the currency is the base, return 1 since they are priced the same. Include the desired number of decimals.
    if (_currency == _base) return 10**_decimals;
    ```
2.  Get a reference to the feed.

    ```
    // Get a reference to the feed.
    IJBPriceFeed _feed = feedFor[_currency][_base];
    ```

    _Internal references:_

    * [`feedFor`](/dev/api/contracts/jbprices/properties/feedfor.md)
3.  If the feed exists, return the price that it's currently reporting.

    ```solidity
    // If it exists, return the price.
    if (_feed != IJBPriceFeed(address(0))) return _feed.currentPrice(_decimals);
    ```

    _External references:_

    * [`currentPrice`](/dev/api/interfaces/ijbpricefeed.md)
4.  Get a reference to the feed using the inverse pair.

    ```
    // Get the inverse feed.
    _feed = feedFor[_base][_currency];
    ```

    _Internal references:_

    * [`feedFor`](/dev/api/contracts/jbprices/properties/feedfor.md)
5.  If the inverse feed exists, return the inverse of the price that it's currently reporting.

    ```solidity
    // If it exists, return the inverse price.
    if (_feed != IJBPriceFeed(address(0)))
      return PRBMath.mulDiv(10**_decimals, 10**_decimals, _feed.currentPrice(_decimals));
    ```

    _Library references:_

    * [`PRBMath`](https://github.com/hifi-finance/prb-math/blob/main/contracts/PRBMath.sol)
      * `.mulDiv(...)`

    _External references:_

    * [`currentPrice`](/dev/api/interfaces/ijbpricefeed.md)
6.  Revert if no feed was found.

    ```
    // No price feed available, revert.
    revert PRICE_FEED_NOT_FOUND();
    ```

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  Gets the number of `_currency` units that can be converted to 1 `_base` unit.
  
  @param _currency The currency units the feed's resulting price is in terms of.
  @param _base The base currency unit being priced by the feed.
  @param _decimals The number of decimals the returned fixed point price should include.
  
  @return The price of the currency in terms of the base, as a fixed point number with the specified number of decimals.
*/
function priceFor(
  uint256 _currency,
  uint256 _base,
  uint256 _decimals
) external view override returns (uint256) {
  // If the currency is the base, return 1 since they are priced the same. Include the desired number of decimals.
  if (_currency == _base) return 10**_decimals;

  // Get a reference to the feed.
  IJBPriceFeed _feed = feedFor[_currency][_base];

  // If it exists, return the price.
  if (_feed != IJBPriceFeed(address(0))) return _feed.currentPrice(_decimals);

  // Get the inverse feed.
  _feed = feedFor[_base][_currency];

  // If it exists, return the inverse price.
  if (_feed != IJBPriceFeed(address(0)))
    return PRBMath.mulDiv(10**_decimals, 10**_decimals, _feed.currentPrice(_decimals));

  // No price feed available, revert.
  revert PRICE_FEED_NOT_FOUND();
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                     | Description                                                        |
| -------------------------- | ------------------------------------------------------------------ |
| **`PRICE_FEED_NOT_FOUND`** | Thrown if a feed wasn't found for the specified currency and base. |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
