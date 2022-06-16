# _reservedTokenAmountFrom

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Gets the amount of reserved tokens currently tracked for a project given a reserved rate.**

#### Definition

```
function _reservedTokenAmountFrom(
  int256 _processedTokenTracker,
  uint256 _reservedRate,
  uint256 _totalEligibleTokens
) internal pure returns (uint256) { ... }
```

* Arguments:
  * `_processedTokenTracker` is the tracker to make the calculation with.
  * `_reservedRate` is the reserved rate to use to make the calculation.
  * `_totalEligibleTokens` is the total amount to make the calculation with.
* The resulting function is internal to this contract and its inheriters. 
* The function does not alter state on the blockchain.
* The function returns the reserved token amount.

#### Body

1.  Get a reference to the number of tokens that have yet to be processed. This is the difference between the total eligible tokens and the tracker. If the tracker is negative, the difference can be found by adding its absolute value to the total eligible tokens.

    ```
    // Get a reference to the amount of tokens that are unprocessed.
    uint256 _unprocessedTokenBalanceOf = _processedTokenTracker >= 0
      ? _totalEligibleTokens - uint256(_processedTokenTracker)
      : _totalEligibleTokens + uint256(-_processedTokenTracker);
    ```
2.  If there are no unprocessed tokens, there are no outstanding reserved tokens.

    ```
    // If there are no unprocessed tokens, return.
    if (_unprocessedTokenBalanceOf == 0) return 0;
    ```
3.  If the reserved rate is 100%, the reserved token amount is equal to the unprocessed balance.

    ```
    // If all tokens are reserved, return the full unprocessed amount.
    if (_reservedRate == JBConstants.MAX_RESERVED_RATE) return _unprocessedTokenBalanceOf;
    ```

    _Library references:_

    * [`JBConstants`](/dev/api/libraries/jbconstants.md)
      * `.MAX_RESERVED_RATE`
4.  The reserved token amount is the reserved percentage of the unprocessed balance.

    ```
    return
      PRBMath.mulDiv(
        _unprocessedTokenBalanceOf,
        JBConstants.MAX_RESERVED_RATE,
        JBConstants.MAX_RESERVED_RATE - _reservedRate
      ) - _unprocessedTokenBalanceOf;
    ```

    _Library references:_

    * [`PRBMath`](https://github.com/hifi-finance/prb-math/blob/main/contracts/PRBMath.sol)
      * `.mulDiv(...)`
    * [`JBConstants`](/dev/api/libraries/jbconstants.md)
      * `.MAX_RESERVED_RATE`

</TabItem>

<TabItem value="Only code" label="Only code">

```
/**
  @notice
  Gets the amount of reserved tokens currently tracked for a project given a reserved rate.

  @param _processedTokenTracker The tracker to make the calculation with.
  @param _reservedRate The reserved rate to use to make the calculation.
  @param _totalEligibleTokens The total amount to make the calculation with.

  @return amount reserved token amount.
*/
function _reservedTokenAmountFrom(
  int256 _processedTokenTracker,
  uint256 _reservedRate,
  uint256 _totalEligibleTokens
) internal pure returns (uint256) {
  // Get a reference to the amount of tokens that are unprocessed.
  uint256 _unprocessedTokenBalanceOf = _processedTokenTracker >= 0 
    ? _totalEligibleTokens - uint256(_processedTokenTracker)
    : _totalEligibleTokens + uint256(-_processedTokenTracker);

  // If there are no unprocessed tokens, return.
  if (_unprocessedTokenBalanceOf == 0) return 0;

  // If all tokens are reserved, return the full unprocessed amount.
  if (_reservedRate == JBConstants.MAX_RESERVED_RATE) return _unprocessedTokenBalanceOf;

  return
    PRBMath.mulDiv(
      _unprocessedTokenBalanceOf,
      JBConstants.MAX_RESERVED_RATE,
      JBConstants.MAX_RESERVED_RATE - _reservedRate
    ) - _unprocessedTokenBalanceOf;
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
