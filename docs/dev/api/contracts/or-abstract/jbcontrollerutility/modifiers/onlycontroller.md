# onlyController

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBControllerUtility`](/dev/api/contracts/or-abstract/jbcontrollerutility/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Only allows the controller of the specified project to proceed.**

#### Definition

```
modifier onlyController(uint256 _projectId) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project. 
* The modifier function can be used by any internal function.

#### Body

1.  Make sure the message's sender is the project's controller.

    ```
    if (address(directory.controllerOf(_projectId)) != msg.sender) revert CONTROLLER_UNAUTHORIZED();
    ```

    _Internal references:_

    * [`directory`](/dev/api/contracts/or-abstract/jbcontrollerutility/properties/directory.md)

    _External references:_

    * [`controllerOf`](/dev/api/contracts/jbdirectory/properties/controllerof.md)

2.  Continue the rest of the function.

    ```
    _;
    ```

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice
  Only allows the controller of the specified project to proceed. 

  @param _projectId The ID of the project. 
*/
modifier onlyController(uint256 _projectId) {
  if (address(directory.controllerOf(_projectId)) != msg.sender) revert CONTROLLER_UNAUTHORIZED();
  _;
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
