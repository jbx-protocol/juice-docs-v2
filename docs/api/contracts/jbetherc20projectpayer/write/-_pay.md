# _pay

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBETHERC20ProjectPayer`](/api/contracts/jbetherc20projectpayer/README.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Make a payment to the specified project.**

#### Definition

```solidity
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
  * `_token` is the token being paid in.
  * `_amount` is the amount of tokens being paid, as a fixed point number. If this terminal's token is ETH, this is ignored and msg.value is used in its place.
  * `_decimals` is the number of decimals in the `_amount` fixed point number. If this terminal's token is ETH, this is ignored and 18 is used in its place, which corresponds to the amount of decimals expected in msg.value.
  * `_beneficiary` is the address who will receive tokens form the payment.
  * `_minReturnedTokens` is the minimum number of project tokens expected in return, as a fixed point number with 18 decimals.
  * `_preferClaimedTokens` is a flag indicating whether the request prefers to mint project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract. Leaving them unclaimed saves gas.
  * `_memo` is a memo to pass along to the emitted event, and passed along the the funding cycle's data source and delegate.  A data source can alter the memo before emitting in the event and forwarding to the delegate.
  * `_metadata` are bytes to send along to the data source and delegate, if provided.
* The function is private to this contract.
* The function doesn't return anything.

#### Body

1.  Get a reference to the terminal that should be sent the payment by checking for the project's stored primary terminal for the token being paid.  

    ```solidity
    // Find the terminal for this contract's project.
    IJBPaymentTerminal _terminal = directory.primaryTerminalOf(_projectId, _token);
    ```

    _Internal references:_

    * [`directory`](/api/contracts/jbetherc20projectpayer/properties/directory.md)

    _External references:_

    * [`primaryTerminalOf`](/api/contracts/jbdirectory/read/primaryterminalof.md)
2.  Make sure there is a terminal to make a payment towards.

    ```solidity
    // There must be a terminal.
    if (_terminal == IJBPaymentTerminal(address(0))) revert TERMINAL_NOT_FOUND();
    ```

3.  Make sure the number of decimals in the amount being paid matches the number of decimals expected by the terminal.

    ```solidity
    // The amount's decimals must match the terminal's expected decimals.
    if (_terminal.decimals() != _decimals) revert INCORRECT_DECIMAL_AMOUNT();
    ```

    _External references:_

    * [`decimals`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/decimals.md)

4.  If the token being paid is an ERC20, approve the terminal to spend the amount of tokens from this terminal.

    ```
    // Approve the `_amount` of tokens from this terminal to transfer tokens from this terminal.
    if (_token != JBTokens.ETH) IERC20(_token).approve(address(_terminal), _amount);
    ```

    _External references:_

    * [`approve`](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#IERC20-approve-address-uint256-)

5.  Get a reference to the ETH amount that should be attached to the transaction. Only attach anything if the token being paid is ETH.

    ```
    // If this terminal's token is ETH, send it in msg.value.
    uint256 _payableValue = _token == JBTokens.ETH ? _amount : 0;
    ```

6.  If a beneficiary was specified, send the payment to the terminal with the provided properties. Otherwise, add the amount to the project's balance in the terminal.

    ```
    // Pay if there's a beneficiary to receive tokens.
    if (_beneficiary != address(0))
      // Send funds to the terminal.
      _terminal.pay{value: _payableValue}(
        _amount, // ignored if the token is JBTokens.ETH.
        _projectId,
        _beneficiary,
        _minReturnedTokens,
        _preferClaimedTokens,
        _memo,
        _metadata
      );
      // Otherwise just add to balance so tokens don't get issued.
    else _terminal.addToBalanceOf{value: _payableValue}(_projectId, _amount, _memo);
    ```

    _External references:_

    * [`pay`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/pay.md)
    * [`addToBalance`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/addtobalanceof.md)
    
</TabItem>

<TabItem value="Code" label="Code">

```solidity
/** 
  @notice 
  Make a payment to the specified project.

  @param _projectId The ID of the project that is being paid.
  @param _token The token being paid in.
  @param _amount The amount of tokens being paid, as a fixed point number. If this terminal's token is ETH, this is ignored and msg.value is used in its place.
  @param _decimals The number of decimals in the `_amount` fixed point number. If this terminal's token is ETH, this is ignored and 18 is used in its place, which corresponds to the amount of decimals expected in msg.value.
  @param _beneficiary The address who will receive tokens form the payment.
  @param _minReturnedTokens The minimum number of project tokens expected in return, as a fixed point number with 18 decimals.
  @param _preferClaimedTokens A flag indicating whether the request prefers to mint project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract. Leaving them unclaimed saves gas.
  @param _memo A memo to pass along to the emitted event, and passed along the the funding cycle's data source and delegate.  A data source can alter the memo before emitting in the event and forwarding to the delegate.
  @param _metadata Bytes to send along to the data source and delegate, if provided.
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
  // Find the terminal for this contract's project.
  IJBPaymentTerminal _terminal = directory.primaryTerminalOf(_projectId, _token);

  // There must be a terminal.
  if (_terminal == IJBPaymentTerminal(address(0))) revert TERMINAL_NOT_FOUND();

  // The amount's decimals must match the terminal's expected decimals.
  if (_terminal.decimals() != _decimals) revert INCORRECT_DECIMAL_AMOUNT();

  // Approve the `_amount` of tokens from this terminal to transfer tokens from this terminal.
  if (_token != JBTokens.ETH) IERC20(_token).approve(address(_terminal), _amount);

  // If this terminal's token is ETH, send it in msg.value.
  uint256 _payableValue = _token == JBTokens.ETH ? _amount : 0;

  // Pay if there's a beneficiary to receive tokens.
  if (_beneficiary != address(0))
    // Send funds to the terminal.
    _terminal.pay{value: _payableValue}(
      _amount, // ignored if the token is JBTokens.ETH.
      _projectId,
      _beneficiary,
      _minReturnedTokens,
      _preferClaimedTokens,
      _memo,
      _metadata
    );
    // Otherwise just add to balance so tokens don't get issued.
  else _terminal.addToBalanceOf{value: _payableValue}(_projectId, _amount, _memo);
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
