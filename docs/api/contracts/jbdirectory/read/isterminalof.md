# isTerminalOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Whether or not a specified terminal is a terminal of the specified project.**

#### Definition

```
function isTerminalOf(uint256 _projectId, IJBPaymentTerminal _terminal)
  public
  view
  override
  returns (bool) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to check within.
  * `_terminal` is the address of the terminal to check for.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IJBDirectory`](/api/interfaces/ijbdirectory.md) interface.
* The function returns a flag indicating whether or not the specified terminal is a terminal of the specified project.

#### Body

1.  Loop through each of the project's terminals looking for the one specified. If it's found, return true.

    ```
    for (uint256 _i; _i < _terminalsOf[_projectId].length; _i++)
      if (_terminalsOf[_projectId][_i] == _terminal) return true;
    ```

    _Internal references:_

    * [`_terminalsOf`](/api/contracts/jbdirectory/properties/-_terminalsof.md)
2.  If a terminal is not found, return false.

    ```
    return false;
    ```

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice
  Whether or not a specified terminal is a terminal of the specified project.

  @param _projectId The ID of the project to check within.
  @param _terminal The address of the terminal to check for.

  @return A flag indicating whether or not the specified terminal is a terminal of the specified project.
*/
function isTerminalOf(uint256 _projectId, IJBPaymentTerminal _terminal)
  public
  view
  override
  returns (bool)
{
  for (uint256 _i; _i < _terminalsOf[_projectId].length; _i++)
    if (_terminalsOf[_projectId][_i] == _terminal) return true;
  return false;
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
