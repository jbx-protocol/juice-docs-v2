# addToBalanceOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBV1TokenPaymentTerminal`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/README.md)​‌

Interface: [`IJBPaymentTerminal`](/dev/api/interfaces/ijbpaymentterminal.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Receives funds belonging to the specified project.**

#### Definition

```
function addToBalanceOf(
  uint256 _projectId,
  uint256 _amount,
  address,
  string calldata _memo,
  bytes calldata _metadata
) external payable virtual override { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to which the funds received belong. This is ignored since this terminal doesn't allow this function.
  * `_amount` is the amount of tokens to add, as a fixed point number with the same number of decimals as this terminal. This is ignored since this terminal doesn't allow this function.
  * `_token` is the token being paid. This terminal ignores this property since it only manages one token. This is ignored since this terminal doesn't allow this function.
  * `_memo` is a memo to pass along to the emitted event. This is ignored since this terminal doesn't allow this function.
  * `_metadata` is metadata to pass along to the emitted event. This is ignored since this terminal doesn't allow this function.
* The function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBPaymentTerminal`](/dev/api/interfaces/ijbpaymentterminal.md) interface.
* The function doesn't return anything.

#### Body

1.  This function should not be called. Revert every time.

    ```
    revert NOT_SUPPORTED();
    ```

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Receives funds belonging to the specified project.

  @dev 
  This terminal does not allow adding directly to a project's balance.

  @param _projectId The ID of the project to which the funds received belong. This is ignored since this terminal doesn't allow this function.
  @param _amount The amount of tokens to add, as a fixed point number with the same number of decimals as this terminal. This is ignored since this terminal doesn't allow this function.
  @param _token The token being paid. This terminal ignores this property since it only manages one currency. This is ignored since this terminal doesn't allow this function.
  @param _memo A memo to pass along to the emitted event. This is ignored since this terminal doesn't allow this function.
  @param _metadata Extra data to pass along to the emitted event. This is ignored since this terminal doesn't allow this function.
*/
function addToBalanceOf(
  uint256 _projectId,
  uint256 _amount,
  address _token,
  string calldata _memo,
  bytes calldata _metadata
) external payable override {
  _projectId; // Prevents unused var compiler and natspec complaints.
  _amount; // Prevents unused var compiler and natspec complaints.
  _token; // Prevents unused var compiler and natspec complaints.
  _memo; // Prevents unused var compiler and natspec complaints.
  _metadata; // Prevents unused var compiler and natspec complaints.

  revert NOT_SUPPORTED();
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                       | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| **`NOT_SUPPORTED`** | Thrown when this function is called. |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
