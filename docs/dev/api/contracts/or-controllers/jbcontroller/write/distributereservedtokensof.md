# distributeReservedTokensOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBController`](/dev/api/contracts/or-controllers/jbcontroller/README.md)​‌

Interface: [`IJBController`](/dev/api/interfaces/ijbcontroller.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Distributes all outstanding reserved tokens for a project.**

#### Definition

```
function distributeReservedTokensOf(uint256 _projectId, string memory _memo)
  external
  virtual
  override
  returns (uint256) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to which the reserved tokens belong.
  * `_memo` is a memo to pass along to the emitted event.
* The function can be accessed externally by anyone.
* The function can be overriden by inheriting contracts.
* The function overrides a function definition from the [`IJBController`](/dev/api/interfaces/ijbcontroller.md) interface.
* The function returns the amount of minted reserved tokens.

#### Body

1.  Forward the call to the internal version of the function that is also used by other operations.

    ```
    return _distributeReservedTokensOf(_projectId, _memo);
    ```

    _Internal references:_

    * [`_distributeReservedTokensOf`](/dev/api/contracts/or-controllers/jbcontroller/write/-_distributereservedtokensof.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Distributes all outstanding reserved tokens for a project.

  @param _projectId The ID of the project to which the reserved tokens belong.
  @param _memo A memo to pass along to the emitted event.

  @return The amount of minted reserved tokens.
*/
function distributeReservedTokensOf(uint256 _projectId, string memory _memo)
  external
  virtual
  override
  returns (uint256)
{
  return _distributeReservedTokensOf(_projectId, _memo);
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
