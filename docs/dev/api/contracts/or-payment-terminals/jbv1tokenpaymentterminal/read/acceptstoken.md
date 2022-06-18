# acceptsToken

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBV1TokenPaymentTerminal`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/README.md)​‌

Interface: [`IJBPaymentTerminal`](/dev/api/interfaces/ijbpaymentterminal.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**A flag indicating if this terminal accepts the specified token.**

### Definition

```
function acceptsToken(address _token, uint256 _projectId) external view override returns (bool) { ... }
```

* Arguments:
  * `_token` is the token to check if this terminal accepts or not.
  * `_projectId` is the project ID to check for token acceptance.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The resulting function overrides a function definition from the [`IJBPaymentTerminal`](/dev/api/interfaces/ijbpaymentterminal.md) interface.
* The function returns the flag.

#### Body

1.  This terminal should not accept a token if it's been explicitly set by the project, and the exchanging has not yet been finalized. 

    ```
    // Accept the token if it has been set and the exchange hasn't yet finalized.
    return v1ProjectIdOf[_projectId] == _token && !finalized[_projectId];
    ```

    _Internal references:_

    * [`v1ProjectIdOf`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/v1projectidof.md)
    * [`finalized`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/finalized.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice
  A flag indicating if this terminal accepts the specified token.

  @param _token The token to check if this terminal accepts or not.
  @param _projectId The project ID to check for token acceptance.

  @return The flag.
*/
function acceptsToken(address _token, uint256 _projectId) external view override returns (bool) {
  _token; // Prevents unused var compiler and natspec complaints.
  _projectId; // Prevents unused var compiler and natspec complaints.

  // Accept the token if it has been set and the exchange hasn't yet finalized.
  return v1ProjectIdOf[_projectId] == _token && !finalized[_projectId];
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
