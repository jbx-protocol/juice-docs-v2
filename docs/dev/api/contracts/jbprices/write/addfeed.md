# addFeedFor

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPrices`](/dev/api/contracts/jbprices/README.md)​‌

Interface: [`IJBPrices`](/dev/api/interfaces/ijbprices.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Add a price feed for a currency in terms of the provided base currency.**

_Current feeds can't be modified._

#### Definition

```
function addFeedFor(
  uint256 _currency,
  uint256 _base,
  AggregatorV3Interface _feed
) external override onlyOwner { ... }
```

* Arguments:
  * `_currency` is the currency that the price feed is for.
  * `_base` is the currency that the price feed is based on.
  * `_feed` is the [`IJBPriceFeed`](/dev/api/interfaces/ijbpricefeed.md) contract being added.
* Through the [`onlyOwner`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--) modifier, this function can only be accessed by the address that owns this contract.
* The function overrides a function definition from the [`IJBPrices`](/dev/api/interfaces/ijbprices.md) interface.
* The function doesn't return anything.

#### Body

1.  Make sure there isn't already a price feed set for the currency base pair.

    ```
    // There can't already be a feed for the specified currency.
    if (feedFor[_currency][_base] != IJBPriceFeed(address(0))) revert PRICE_FEED_ALREADY_EXISTS();
    ```

    _Internal references:_

    * [`feedFor`](/dev/api/contracts/jbprices/properties/feedfor.md)
2.  Store the provided feed for the currency base pair.

    ```
    // Store the feed.
    feedFor[_currency][_base] = _feed;
    ```

    _Internal references:_

    * [`feedFor`](/dev/api/contracts/jbprices/properties/feedfor.md)
3.  Emit an `AddFeed` event with the relevant parameters.

    ```
    emit AddFeed(_currency, _base, _feed);
    ```

    _Event references:_

    * [`AddFeed`](/dev/api/contracts/jbprices/events/addfeed.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  Add a price feed for a currency in terms of the provided base currency.

  @dev
  Current feeds can't be modified.

  @param _currency The currency that the price feed is for.
  @param _base The currency that the price feed is based on.
  @param _feed The price feed being added.
*/
function addFeedFor(
  uint256 _currency,
  uint256 _base,
  IJBPriceFeed _feed
) external override onlyOwner {
  // There can't already be a feed for the specified currency.
  if (feedFor[_currency][_base] != IJBPriceFeed(address(0))) revert PRICE_FEED_ALREADY_EXISTS();

  // Store the feed.
  feedFor[_currency][_base] = _feed;

  emit AddFeed(_currency, _base, _feed);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                          | Description                                                            |
| ------------------------------- | ---------------------------------------------------------------------- |
| **`PRICE_FEED_ALREADY_EXISTS`** | Thrown if the specified currency already has an associated price feed. |

</TabItem>

<TabItem value="Events" label="Events">

| Name                                  | Data                                                                                                                                                                                                                                                                                           |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`AddFeed`**](/dev/api/contracts/jbprices/events/addfeed.md) | <ul><li><code>uint256 indexed currency</code></li><li><code>uint256 indexed base</code></li><li><code>[IJBPriceFeed](/dev/api/interfaces/ijbpricefeed.md) feed</code></li></ul> |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
