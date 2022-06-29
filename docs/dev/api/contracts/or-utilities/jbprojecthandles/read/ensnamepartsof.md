# ensNamePartsOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBProjectHandles`](/dev/api/contracts/or-utilities/jbprojecthandles/README.md)​‌

Interface: [`IJBProjectHandles`](/dev/api/interfaces/ijbprojecthandles.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**The parts of the stored ENS name of a project.**

### Definition

```
function ensNamePartsOf(uint256 _projectId) external view override returns (string[] memory) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to get the ENS name of.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IJBProjectHandles`](/dev/api/interfaces/ijbprojecthandles.md) interface.
* The function returns the ENS name parts of a project.

#### Body

1.  Return the contents of the stored internal variable.

    ```
    return _ensNamePartsOf[_projectId];
    ```

    _Internal references:_

    * [`_ensNamePartsOf`](/dev/api/contracts/or-utilities/jbprojecthandles/properties/-_ensnamepartsof.md)
      
</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  The parts of the stored ENS name of a project.

  @param _projectId The ID of the project to get the ENS name of.

  @return The parts of the ENS name parts of a project.
*/
function ensNamePartsOf(uint256 _projectId) external view override returns (string[] memory) {
  return _ensNamePartsOf[_projectId];
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
