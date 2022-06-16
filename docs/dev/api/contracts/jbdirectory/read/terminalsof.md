# terminalsOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Step by step" label="Step by step">

**For each project ID, the terminals that are currently managing its funds.**

#### Definition

```
function terminalsOf(uint256 _projectId)
  external
  view
  override
  returns (IJBPaymentTerminal[] memory) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to get terminals of.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IJBDirectory`](/dev/api/interfaces/ijbdirectory.md) interface.
* The function returns an array of terminal addresses.

#### Body

1.  This function just reads and returns the stored `_terminalsOf` the project.

    ```
    return _terminalsOf[_projectId];
    ```

    _Internal references:_

    * [`_terminalsOf`](/dev/api/contracts/jbdirectory/properties/-_terminalsof.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice
  For each project ID, the terminals that are currently managing its funds.

  @param _projectId The ID of the project to get terminals of.

  @return An array of terminal addresses.
*/
function terminalsOf(uint256 _projectId)
  external
  view
  override
  returns (IJBPaymentTerminal[] memory)
{
  return _terminalsOf[_projectId];
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
