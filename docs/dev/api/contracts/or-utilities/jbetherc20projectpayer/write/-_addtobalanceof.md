# _addToBalanceOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBETHERC20ProjectPayer`](/dev/api/contracts/or-utilities/jbetherc20projectpayer/README.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Add to the balance of the specified project.**

#### Definition

```
function _addToBalanceOf(
  uint256 _projectId,
  address _token,
  uint256 _amount,
  uint256 _decimals,
  string memory _memo,
  bytes memory _metadata
) internal virtual { ... }
```

* Arguments:
  * `_projectId` is the ID of the project that is being paid.
  * `_token` is the token being paid in.
  * `_amount` is the amount of tokens being paid, as a fixed point number. If the token is ETH, this is ignored and msg.value is used in its place.
  * `_decimals` is the number of decimals in the `_amount` fixed point number. If the token is ETH, this is ignored and 18 is used in its place, which corresponds to the amount of decimals expected in msg.value.
  * `_memo` is a memo to pass along to the emitted event.
  * `_metadata` is extra data to pass along to the terminal.
* The function is private to this contract.
* The function doesn't return anything.

#### Body

1.  Get a reference to the terminal that should be sent the payment by checking for the project's stored primary terminal for the token being paid.  

    ```
    // Find the terminal for the specified project.
    IJBPaymentTerminal _terminal = directory.primaryTerminalOf(_projectId, _token);
    ```

    _Internal references:_

    * [`directory`](/dev/api/contracts/or-utilities/jbetherc20projectpayer/properties/directory.md)

    _External references:_

    * [`primaryTerminalOf`](/dev/api/contracts/jbdirectory/read/primaryterminalof.md)
2.  Make sure there is a terminal to make a payment towards.

    ```
    // There must be a terminal.
    if (_terminal == IJBPaymentTerminal(address(0))) revert TERMINAL_NOT_FOUND();
    ```

3.  Make sure the number of decimals in the amount being paid matches the number of decimals expected by the terminal.

    ```
    // The amount's decimals must match the terminal's expected decimals.
    if (_terminal.decimalsForToken(_token) != _decimals) revert INCORRECT_DECIMAL_AMOUNT();
    ```

    _External references:_

    * [`decimalsForToken`](/dev/api/contracts/or-payment-terminals/or-abstract/jbsingletokenpaymentterminal/read/decimalsfortoken.md)

4.  If the token being paid is an ERC20, approve the terminal to spend the amount of tokens from this terminal.

    ```
    // Approve the `_amount` of tokens from the destination terminal to transfer tokens from this contract.
    if (_token != JBTokens.ETH) IERC20(_token).approve(address(_terminal), _amount);
    ```

    _Library references:_

    * [`JBTokens`](/dev/api/libraries/jbtokens.md)
      * `.ETH`

    _External references:_

    * [`approve`](https://docs.openzeppelin.com/contracts/4.x/dev/api/token/erc20#IERC20-approve-address-uint256-)

5.  Keep a reference to the amount to send in the transaction. If the token being paid is ETH, send the value along with the tx.   

    ```solidity
    // If the token is ETH, send it in msg.value.
    uint256 _payableValue = _token == JBTokens.ETH ? _amount : 0;
    ```

    _Library references:_

    * [`JBTokens`](/dev/api/libraries/jbtokens.md)
      * `.ETH`

5.  Add to the project's balance with the provided properties. 

    ```
    // Add to balance so tokens don't get issued.
    _terminal.addToBalanceOf{value: _payableValue}(_projectId, _amount, _token, _memo);
    ```

    _External references:_

    * [`addToBalanceOf`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/addtobalanceof.md)
    
</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  Add to the balance of the specified project.

  @param _projectId The ID of the project that is being paid.
  @param _token The token being paid in.
  @param _amount The amount of tokens being paid, as a fixed point number. If the token is ETH, this is ignored and msg.value is used in its place.
  @param _decimals The number of decimals in the `_amount` fixed point number. If the token is ETH, this is ignored and 18 is used in its place, which corresponds to the amount of decimals expected in msg.value.
  @param _memo A memo to pass along to the emitted event, and passed along the the funding cycle's data source and delegate.  A data source can alter the memo before emitting in the event and forwarding to the delegate.
  @param _memo A memo to pass along to the emitted event.
  @param _metadata Extra data to pass along to the terminal.
*/
function _addToBalanceOf(
  uint256 _projectId,
  address _token,
  uint256 _amount,
  uint256 _decimals,
  string memory _memo,
  bytes memory _metadata
) internal virtual {
  // Find the terminal for the specified project.
  IJBPaymentTerminal _terminal = directory.primaryTerminalOf(_projectId, _token);

  // There must be a terminal.
  if (_terminal == IJBPaymentTerminal(address(0))) revert TERMINAL_NOT_FOUND();

  // The amount's decimals must match the terminal's expected decimals.
  if (_terminal.decimalsForToken(_token) != _decimals) revert INCORRECT_DECIMAL_AMOUNT();

  // Approve the `_amount` of tokens from the destination terminal to transfer tokens from this contract.
  if (_token != JBTokens.ETH) IERC20(_token).approve(address(_terminal), _amount);

  // If the token is ETH, send it in msg.value.
  uint256 _payableValue = _token == JBTokens.ETH ? _amount : 0;

  // Add to balance so tokens don't get issued.
  _terminal.addToBalanceOf{value: _payableValue}(_projectId, _amount, _token, _memo, _metadata);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                                       | Description                                                                     |
| -------------------------------------------- | ------------------------------------------------------------------------------- |
| **`TERMINAL_NOT_FOUND`**    | Thrown if the project has no terminal for the specified token   |
| **`INCORRECT_DECIMAL_AMOUNT`**                     | Thrown if the amount being paid is a fixed point number with a different amount of decimals than the terminal expects  |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
