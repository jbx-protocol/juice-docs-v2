# isTerminalOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**A modifier that verifies this terminal is a terminal of provided project ID.**

#### Definition

```
modifier isTerminalOf(uint256 _projectId) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to check.

#### Body

1.  Make sure this terminal is a terminal of the specified project.

    ```
    if (!directory.isTerminalOf(_projectId, this)) revert PROJECT_TERMINAL_MISMATCH();
    _;
    ```

    _Internal references:_

    * [`directory`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/directory.md)

    _External references:_

    * [`isTerminalOf`](/api/contracts/jbdirectory/read/isterminalof.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  A modifier that verifies this terminal is a terminal of provided project ID.
*/
modifier isTerminalOf(uint256 _projectId) {
  if (!directory.isTerminalOf(_projectId, this)) revert PROJECT_TERMINAL_MISMATCH();
  _;
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                       | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| **`PROJECT_TERMINAL_MISMATCH`** | Thrown if this terminal is not a terminal of the specified project. |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
