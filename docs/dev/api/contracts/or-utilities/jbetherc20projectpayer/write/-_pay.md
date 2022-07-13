# _pay

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBETHERC20ProjectPayer`](/dev/api/contracts/or-utilities/jbetherc20projectpayer/README.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Make a payment to the specified project.**

#### Definition

```
function _pay(
  uint256 _projectId,
  address _token,
  uint256 _amount,
  uint256 _decimals,
  address _beneficiary,
  uint256 _minReturnedTokens,
  bool _preferClaimedTokens,
  string memory _memo,
  bytes memory _metadata
) internal virtual { ... }
```

* Arguments:
  * `_projectId` is the ID of the project that is being paid.
  * `_token` is the token being paid in. Use `JBTokens.ETH` if paying in ETH.
  * `_amount` is the amount of tokens being paid, as a fixed point number. If the token is ETH, this is ignored and msg.value is used in its place.
  * `_decimals` is the number of decimals in the `_amount` fixed point number. If the token is ETH, this is ignored and 18 is used in its place, which corresponds to the amount of decimals expected in msg.value.
  * `_beneficiary` is the address who will receive tokens from the payment.
  * `_minReturnedTokens` is the minimum number of project tokens expected in return, as a fixed point number with 18 decimals.
  * `_preferClaimedTokens` is a flag indicating whether the request prefers to mint project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract. Leaving them unclaimed saves gas.
  * `_memo` is a memo to pass along to the emitted event, and passed along the the funding cycle's data source and delegate.  A data source can alter the memo before emitting in the event and forwarding to the delegate.
  * `_metadata` are bytes to send along to the data source, delegate, and emitted event, if provided.
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

    * [`approve`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-approve-address-uint256-)

5.  Keep a reference to the amount to send in the transaction. If the token being paid is ETH, send the value along with the tx.   

    ```solidity
    // If the token is ETH, send it in msg.value.
    uint256 _payableValue = _token == JBTokens.ETH ? _amount : 0;
    ```

    _Library references:_

    * [`JBTokens`](/dev/api/libraries/jbtokens.md)
      * `.ETH`
      
6.  Send the payment to the terminal with the provided properties. If no beneficiary was specified, set the message sender as the beneficiary.

    ```
    // Send funds to the terminal.
    // If the token is ETH, send it in msg.value.
    _terminal.pay{value: _payableValue}(
      _projectId,
      _amount, // ignored if the token is JBTokens.ETH.
      _token,
      _beneficiary != address(0) ? _beneficiary : msg.sender,
      _minReturnedTokens,
      _preferClaimedTokens,
      _memo,
      _metadata
    );
    ```

    _External references:_

    * [`pay`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/pay.md)
    
</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  Make a payment to the specified project.

  @param _projectId The ID of the project that is being paid.
  @param _token The token being paid in.
  @param _amount The amount of tokens being paid, as a fixed point number. If the token is ETH, this is ignored and msg.value is used in its place.
  @param _decimals The number of decimals in the `_amount` fixed point number. If the token is ETH, this is ignored and 18 is used in its place, which corresponds to the amount of decimals expected in msg.value.
  @param _beneficiary The address who will receive tokens from the payment.
  @param _minReturnedTokens The minimum number of project tokens expected in return, as a fixed point number with 18 decimals.
  @param _preferClaimedTokens A flag indicating whether the request prefers to mint project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract. Leaving them unclaimed saves gas.
  @param _memo A memo to pass along to the emitted event, and passed along the the funding cycle's data source and delegate.  A data source can alter the memo before emitting in the event and forwarding to the delegate.
  @param _metadata Bytes to send along to the data source, delegate, and emitted event, if provided.
*/
function _pay(
  uint256 _projectId,
  address _token,
  uint256 _amount,
  uint256 _decimals,
  address _beneficiary,
  uint256 _minReturnedTokens,
  bool _preferClaimedTokens,
  string memory _memo,
  bytes memory _metadata
) internal virtual {
  // Find the terminal for the specified project.
  IJBPaymentTerminal _terminal = directory.primaryTerminalOf(_projectId, _token);

  // There must be a terminal.
  if (_terminal == IJBPaymentTerminal(address(0))) revert TERMINAL_NOT_FOUND();

  // The amount's decimals must match the terminal's expected decimals.
  if (_terminal.decimalsForToken(_token) != _decimals) revert INCORRECT_DECIMAL_AMOUNT();

  // Approve the `_amount` of tokens from this terminal to transfer tokens from this terminal.
  if (_token != JBTokens.ETH) IERC20(_token).approve(address(_terminal), _amount);

  // If the token is ETH, send it in msg.value.
  uint256 _payableValue = _token == JBTokens.ETH ? _amount : 0;

  // Approve the `_amount` of tokens from the destination terminal to transfer tokens from this contract.
  if (_token != JBTokens.ETH) IERC20(_token).approve(address(_terminal), _amount);

  // If the token is ETH, send it in msg.value.
  uint256 _payableValue = _token == JBTokens.ETH ? _amount : 0;

  // Send funds to the terminal.
  // If the token is ETH, send it in msg.value.
  _terminal.pay{value: _payableValue}(
    _projectId,
    _amount, // ignored if the token is JBTokens.ETH.
    _token,
    _beneficiary != address(0) ? _beneficiary : msg.sender,
    _minReturnedTokens,
    _preferClaimedTokens,
    _memo,
    _metadata
  );
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
