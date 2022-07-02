# decimalsForToken

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBSingleTokenPaymentTerminal`](/dev/api/contracts/or-payment-terminals/or-abstract/jbsingletokenpaymentterminal/README.md)​‌

Interface: [`IJBPaymentTerminal`](/dev/api/interfaces/ijbpaymentterminal.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**The decimals that should be used in fixed number accounting for the specified token.**

### Definition

```
function decimalsForToken(address _token) external view override returns (uint256) { ... }
```

* Arguments:
  * `_token` is the token to check for the decimals of.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The resulting function overrides a function definition from the [`IJBPaymentTerminal`](/dev/api/interfaces/ijbpaymentterminal.md) interface.
* The function returns the number of decimals for the token.

#### Body

1.  This terminal only uses one decimals.

    ```
    return decimals;
    ```

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice
  The decimals that should be used in fixed number accounting for the specified token.

  @param _token The token to check for the decimals of.

  @return The number of decimals for the token.
*/
function decimalsForToken(address _token) external view override returns (uint256) {
  _token; // Prevents unused var compiler and natspec complaints.

  return decimals;
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
