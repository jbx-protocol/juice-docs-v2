# currentEthOverflowOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBV1TokenPaymentTerminal`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/README.md)​‌

Interface: [`IJBPaymentTerminal`](/dev/api/interfaces/ijbpaymentterminal.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Gets the current overflowed amount in this terminal for a specified project, in terms of ETH.**

_The current overflow is represented as a fixed point number with 18 decimals._

### Definition

```
function currentEthOverflowOf(uint256 _projectId) external view override returns (uint256) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to which the ETH overflow belongs.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The resulting function overrides a function definition from the [`IJBPaymentTerminal`](/dev/api/interfaces/ijbpaymentterminal.md) interface.
* The function returns the current amount of ETH overflow that project has in this terminal, as a fixed point number with 18 decimals.

#### Body

1.  This terminal does not manage overflow.

    ```
    // This terminal has no overflow.
    return 0;
    ```

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Gets the current overflowed amount in this terminal for a specified project, in terms of ETH.

  @dev
  The current overflow is represented as a fixed point number with 18 decimals.

  @param _projectId The ID of the project to get overflow for.

  @return The current amount of ETH overflow that project has in this terminal, as a fixed point number with 18 decimals.
*/
function currentEthOverflowOf(uint256 _projectId) external pure override returns (uint256) {
  _projectId; // Prevents unused var compiler and natspec complaints.

  // This terminal has no overflow.
  return 0;
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
