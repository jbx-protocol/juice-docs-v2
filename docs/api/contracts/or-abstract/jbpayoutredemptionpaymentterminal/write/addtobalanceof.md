# addToBalanceOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPaymentTerminal`](/api/interfaces/ijbtokenstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Receives funds belonging to the specified project.**

#### Definition

```
function addToBalanceOf(
  uint256 _projectId,
  uint256 _amount,
  address,
  string calldata _memo
) external payable virtual override isTerminalOf(_projectId) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to which the funds received belong.
  * `_amount` is the amount of tokens to add, as a fixed point number with the same number of decimals as this terminal. If this is an ETH terminal, this is ignored and msg.value is used instead.
  * `_token` is the token being paid. This terminal ignores this property since it only manages one currency. This is ignored.
  * `_memo` is a memo to pass along to the emitted event.
* The function can be accessed externally by anyone.
* The function can be overriden by inheriting contracts.
* Through the [`isTerminalOf`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/modifiers/isterminalof.md) modifier, this transaction reverts if this terminal is not one of the project's terminals.
* The function accepts ETH. The transaction reverts if receives ETH but the terminal's token type isn't ETH.
* The resulting function overrides a function definition from the [`IJBPaymentTerminal`](/api/interfaces/ijbpaymentterminal.md) interface.
* The function doesn't return anything.

#### Body

1.  If this terminal's token isn't ETH, make sure ETH wasn't sent to the function, then transfer the amount of tokens from the message sender to this contract. If this terminal's contract is ETH, override the specified amount value with with amount of ETH sent to the function.

    ```
    // If this terminal's token isn't ETH, make sure no msg.value was sent, then transfer the tokens in from msg.sender.
    if (token != JBTokens.ETH) {
      // Amount must be greater than 0.
      if (msg.value > 0) revert NO_MSG_VALUE_ALLOWED();

      // Transfer tokens to this terminal from the msg sender.
      _transferFrom(msg.sender, payable(address(this)), _amount);
    }
    // If the terminal's token is ETH, override `_amount` with msg.value.
    else _amount = msg.value;
    ```

    _Virtual references:_

    * [`_transferFrom`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/-_transferfrom.md)
2.  Record the added funds.

    ```
    // Record the added funds.
    store.recordAddedBalanceFor(_projectId, _amount);
    ```

    _External references:_

    * [`recordAddedBalanceFor`](/api/contracts/jbpaymentterminalstore/write/recordaddedbalancefor.md)
3.  Refund any held fees. This is useful to allow a project to distribute funds from the protocol and subsequently add them back without paying eventually having to pay double fees.

    ```
    // Refund any held fees to make sure the project doesn't pay double for funds going in and out of the protocol.
    _refundHeldFees(_projectId, _amount);
    ```

    _Internal references:_

    * [`_refundHeldFees`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/-_refundheldfees.md)
4.  Emit a `AddToBalance` event with the relevant parameters.

    ```
    emit AddToBalance(_projectId, _amount, _memo, msg.sender);
    ```

    _Event references:_

    * [`AddToBalance`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/addtobalance.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Receives funds belonging to the specified project.

  @param _projectId The ID of the project to which the funds received belong.
  @param _amount The amount of tokens to add, as a fixed point number with the same number of decimals as this terminal. If this is an ETH terminal, this is ignored and msg.value is used instead.
  ignored: _token The token being paid. This terminal ignores this property since it only manages one currency. 
  @param _memo A memo to pass along to the emitted event.
*/
function addToBalanceOf(
  uint256 _projectId,
  uint256 _amount,
  address,
  string calldata _memo
) external payable virtual override isTerminalOf(_projectId) {
  // If this terminal's token isn't ETH, make sure no msg.value was sent, then transfer the tokens in from msg.sender.
  if (token != JBTokens.ETH) {
    // Amount must be greater than 0.
    if (msg.value > 0) revert NO_MSG_VALUE_ALLOWED();

    // Transfer tokens to this terminal from the msg sender.
    _transferFrom(msg.sender, payable(address(this)), _amount);
  }
  // If the terminal's token is ETH, override `_amount` with msg.value.
  else _amount = msg.value;

  // Record the added funds.
  store.recordAddedBalanceFor(_projectId, _amount);

  // Refund any held fees to make sure the project doesn't pay double for funds going in and out of the protocol.
  _refundHeldFees(_projectId, _amount);

  emit AddToBalance(_projectId, _amount, _memo, msg.sender);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                       | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| **`NO_MSG_VALUE_ALLOWED`** | Thrown if ETH was sent to a non-ETH terminal. |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
