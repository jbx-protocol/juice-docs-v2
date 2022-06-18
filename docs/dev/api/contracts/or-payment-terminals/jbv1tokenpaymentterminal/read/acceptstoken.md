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

1.  Get a reference to the v1 project that has been attached to the specified v2 project.

    ```
    // Get a reference to the V1 project for the provided project ID.
    uint256 _v1ProjectId = v1ProjectIdOf[_projectId];
    ```

    _Internal references:_

    * [`v1ProjectIdOf`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/v1projectidof.md)

1.  This terminal should not accept a token if it's been explicitly set by the project, and the exchanging has not yet been finalized. 

    ```
    // Accept the token if it has been set and the exchange hasn't yet finalized.
    return address(ticketBooth.ticketsOf(_v1ProjectId)) == _token && !finalized[_v1ProjectId];
    ```

    _Internal references:_

    * [`finalized`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/finalized.md)
    * [`ticketBooth`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/ticketbooth.md)

    _External references:_
    
    * [`ticketsOf`](https://github.com/jbx-protocol/juice-contracts-v1/blob/a91b55e8d264267c338b089aa9a45b29fd8e8f13/contracts/interfaces/ITicketBooth.sol#L69)

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

  // Get a reference to the V1 project for the provided project ID.
  uint256 _v1ProjectId = v1ProjectIdOf[_projectId];

  // Accept the token if it has been set and the exchange hasn't yet finalized.
  return address(ticketBooth.ticketsOf(_v1ProjectId)) == _token && !finalized[_v1ProjectId];
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
