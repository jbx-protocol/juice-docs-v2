# currentTotalOverflowOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBSingleTokenPaymentTerminalStore`](/dev/api/contracts/jbsingletokenpaymentterminalstore/README.md)​‌

Interface: [`IJBSingleTokenPaymentTerminalStore`](/dev/api/interfaces/ijbsingletokenpaymentterminalstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Gets the current overflowed amount for a specified project across all terminals.**

#### Definition

```
function currentTotalOverflowOf(
  uint256 _projectId,
  uint256 _decimals,
  uint256 _currency
) external view override returns (uint256)  { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to get total overflow for.
  * `_decimals` is the number of decimals that the fixed point overflow should include.
  * `_currency` is the currency that the total overflow should be in terms of.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The resulting function overrides a function definition from the [`JBSingleTokenPaymentTerminalStore`](/dev/api/interfaces/ijbsingletokenpaymentterminalstore.md) interface.
* The function returns the current total amount of overflow that project has across all terminals.

#### Body

1.  Forward the call to the internal version of the function that is also used by other operations.

    ```
    return _currentTotalOverflowOf(_projectId, _decimals, _currency);
    ```

    _Internal references:_

    * [`_currentTotalOverflowOf`](/dev/api/contracts/jbsingletokenpaymentterminalstore/read/-_currenttotaloverflowof.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Gets the current overflowed amount for a specified project across all terminals.

  @param _projectId The ID of the project to get total overflow for.
  @param _decimals The number of decimals that the fixed point overflow should include.
  @param _currency The currency that the total overflow should be in terms of.

  @return The current total amount of overflow that project has across all terminals.
*/
function currentTotalOverflowOf(
  uint256 _projectId,
  uint256 _decimals,
  uint256 _currency
) external view override returns (uint256) {
  return _currentTotalOverflowOf(_projectId, _decimals, _currency);
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
