# currentReclaimableOverflowOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBSingleTokenPaymentTerminalStore`](/dev/api/contracts/jbsingletokenpaymentterminalstore/README.md)​‌

Interface: [`IJBSingleTokenPaymentTerminalStore`](/dev/api/interfaces/ijbsingletokenpaymentterminalstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**The current amount of overflowed tokens from a terminal that can be reclaimed by the specified number of tokens, using the specified total token supply and overflow amounts.**

_If the project has an active funding cycle reconfiguration ballot, the project's ballot redemption rate is used._

#### Definition

```
function currentReclaimableOverflowOf(
  uint256 _projectId,
  uint256 _tokenCount,
  uint256 _totalSupply,
  uint256 _overflow
) external view override returns (uint256) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to get the reclaimable overflow amount for.
  * `_tokenCount` is the number of tokens to make the calculation with, as a fixed point number with 18 decimals.
  * `_totalSupply` is the total number of tokens to make the calculation with, as a fixed point number with 18 decimals.
  * `_overflow` is the amount of overflow to make the calculation with, as a fixed point number.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The resulting function overrides a function definition from the [`JBSingleTokenPaymentTerminalStore`](/dev/api/interfaces/ijbsingletokenpaymentterminalstore.md) interface.
* The function returns the amount of overflowed tokens that can be reclaimed, as a fixed point number with the same number of decimals as the provided `_overflow`.

#### Body

1.  If there's no overflow, there's nothing reclaimable.

    ```
    // If there's no overflow, there's no reclaimable overflow.
    if (_overflow == 0) return 0;
    ```

2.  Make sure the provided token count is within the bounds of the total supply.

    ```
    // Can't redeem more tokens that is in the supply.
    if (_tokenCount > _totalSupply) return 0;
    ```

3.  Get a reference to the project's current funding cycle.
    
    ```
    // Get a reference to the project's current funding cycle.
    JBFundingCycle memory _fundingCycle = fundingCycleStore.currentOf(_projectId);
    ```

    _External references:_

    * [`currentOf`](/dev/api/contracts/jbfundingcyclestore/read/currentof.md)

4.  Return the reclaimable overflow using the project's current funding cycle and the provided parameters. 

    ```
    // If there is no overflow, nothing is reclaimable.
    return
      _reclaimableOverflowDuring(_projectId, _fundingCycle, _tokenCount, _totalSupply, _overflow);
    ```

    _Internal references:_

    * [`_reclaimableOverflowDuring`](/dev/api/contracts/jbsingletokenpaymentterminalstore/read/-_reclaimableoverflowduring.md)


</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  The current amount of overflowed tokens from a terminal that can be reclaimed by the specified number of tokens, using the specified total token supply and overflow amounts.

  @dev 
  If the project has an active funding cycle reconfiguration ballot, the project's ballot redemption rate is used.

  @param _projectId The ID of the project to get the reclaimable overflow amount for.
  @param _tokenCount The number of tokens to make the calculation with, as a fixed point number with 18 decimals.
  @param _totalSupply The total number of tokens to make the calculation with, as a fixed point number with 18 decimals.
  @param _overflow The amount of overflow to make the calculation with, as a fixed point number.

  @return The amount of overflowed tokens that can be reclaimed, as a fixed point number with the same number of decimals as the provided `_overflow`.
*/
function currentReclaimableOverflowOf(
  uint256 _projectId,
  uint256 _tokenCount,
  uint256 _totalSupply,
  uint256 _overflow
) external view override returns (uint256) {
  // If there's no overflow, there's no reclaimable overflow.
  if (_overflow == 0) return 0;

  // Can't redeem more tokens that is in the supply.
  if (_tokenCount > _totalSupply) return 0;

  // Get a reference to the project's current funding cycle.
  JBFundingCycle memory _fundingCycle = fundingCycleStore.currentOf(_projectId);

  // Return the reclaimable overflow amount.
  return
    _reclaimableOverflowDuring(_projectId, _fundingCycle, _tokenCount, _totalSupply, _overflow);
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
