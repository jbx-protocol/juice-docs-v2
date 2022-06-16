# reservedTokenBalanceOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBController`](/dev/api/contracts/or-controllers/jbcontroller/README.md)​‌

Interface: [`IJBController`](/dev/api/interfaces/ijbcontroller.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Gets the amount of reserved tokens that a project has available to distribute.**

### Definition

```
function reservedTokenBalanceOf(uint256 _projectId, uint256 _reservedRate)
  external
  view
  override
  returns (uint256) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to get a reserved token balance of.
  * `_reservedRate` is the reserved rate to use when making the calculation.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IJBController`](/dev/api/interfaces/ijbcontroller.md) interface.
* The function returns the reserved token balance.

#### Body

1.  Forward the call to the internal version of the function that is also used by other operations.

    ```
    return
      _reservedTokenAmountFrom(
        _processedTokenTrackerOf[_projectId],
        _reservedRate,
        tokenStore.totalSupplyOf(_projectId)
      );
    ```

    _Internal references:_

    * [`_reservedTokenAmountFrom`](/dev/api/contracts/or-controllers/jbcontroller/read/-_reservedtokenamountfrom.md)
    * [`_processedTokenTrackerOf`](/dev/api/contracts/or-controllers/jbcontroller/properties/-_processedtokentrackerof.md)

    _External references:_

    * [`totalSupplyOf`](/dev/api/contracts/jbtokenstore/read/totalsupplyof.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Gets the amount of reserved tokens that a project has available to distribute.

  @param _projectId The ID of the project to get a reserved token balance of.
  @param _reservedRate The reserved rate to use when making the calculation.

  @return The current amount of reserved tokens.
*/
function reservedTokenBalanceOf(uint256 _projectId, uint256 _reservedRate)
  external
  view
  override
  returns (uint256)
{
  return
    _reservedTokenAmountFrom(
      _processedTokenTrackerOf[_projectId],
      _reservedRate,
      tokenStore.totalSupplyOf(_projectId)
    );
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
