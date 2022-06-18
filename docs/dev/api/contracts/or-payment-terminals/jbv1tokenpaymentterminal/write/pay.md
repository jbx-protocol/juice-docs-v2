# pay

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBV1TokenPaymentTerminal`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/README.md)​‌

Interface: [`IJBPaymentTerminal`](/dev/api/interfaces/ijbpaymentterminal.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Allows a v1 project token holder to pay into this terminal to get commensurate about of its v2 token.**

#### Definition

```
function pay(
  uint256 _projectId,
  uint256 _amount,
  address _token,
  address _beneficiary,
  uint256 _minReturnedTokens,
  bool _preferClaimedTokens,
  string calldata _memo,
  bytes calldata _metadata
) external payable override isTerminalOf(_projectId) returns (uint256 beneficiaryTokenCount) { ... }
```

* Arguments:
  * `_projectId` is the ID of the v2 project to pay towards.
  * `_amount` is te amount of v1 project tokens being paid, as a fixed point number with the same amount of decimals as this terminal.
  * `_token` is the token being paid. This terminal ignores this property since it only manages v1 tokens preset by the project being paid.
  * `_beneficiary` is the address to mint v2 project tokens for.
  * `_minReturnedTokens` is the minimum number of v2 project tokens expected in return, as a fixed point number with 18 decimals.
  * `_preferClaimedTokens` is a flag indicating whether the request prefers to mint v2 project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract. Leaving them unclaimed saves gas.
  * `_memo` is memo to pass along to the emitted event. 
  * `_metadata` are bytes to send along to the data source, delegate, and emitted event, if provided. This terminal ignores this property because there's no data source.
* The function can be accessed externally by anyone.
* The function can be overriden by inheriting contracts.
* Through the [`isTerminalOf`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/modifiers/isterminalof.md) modifier, this transaction reverts if this terminal is not one of the project's terminals.
* The function accepts ETH, but reverts if it receives ETH. 
* The resulting function overrides a function definition from the [`IJBPaymentTerminal`](/dev/api/interfaces/ijbpaymentterminal.md) interface.
* The function returns the number of v2 project tokens minted for the beneficiary, as a fixed point number with 18 decimals.

#### Body

1.  Make sure the project owner hasn't finalized exchanges yet. 

    ```
    // Make sure the migration hasn't already been finalized.
    if (finalized[_projectId]) revert MIGRATION_TERMINATED();
    ```

    _Internal references:_

    * [`finalized`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/finalized.md)

2.  Make sure some v1 project tokens are being paid. 

    ```
    // Make sure an amount is specified.
    if (_amount == 0) revert INVALID_AMOUNT();
    ```

3.  Make sure no ETH was sent to the function.

    ```
    // Make sure no ETH was sent.
    if (msg.value > 0) revert NO_MSG_VALUE_ALLOWED();
    ```

4.  Forward the call to the internal version of the function.

    ```
    return _pay(_projectId, _amount, _beneficiary, _minReturnedTokens, _preferClaimedTokens, _memo);
    ```

    _Internal references:_

    * [`_pay`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/write/-_pay.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  Allows a v1 project token holder to pay into this terminal to get commensurate about of its v2 token.

  @param _projectId The ID of the v2 project to pay towards.
  @param _amount The amount of v1 project tokens being paid, as a fixed point number with the same amount of decimals as this terminal.
  @param _token The token being paid. This terminal ignores this property since it only manages v1 tokens preset by the project being paid. 
  @param _beneficiary The address to mint v2 project tokens for.
  @param _minReturnedTokens The minimum number of v2 project tokens expected in return, as a fixed point number with 18 decimals.
  @param _preferClaimedTokens A flag indicating whether the request prefers to mint v2 project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract. Leaving them unclaimed saves gas.
  @param _memo A memo to pass along to the emitted event. 
  @param _metadata Bytes to send along to the data source, delegate, and emitted event, if provided. This terminal ignores this property because there's no data source.

  @return beneficiaryTokenCount The number of v2 tokens minted for the beneficiary, as a fixed point number with 18 decimals.
*/
function pay(
  uint256 _projectId,
  uint256 _amount,
  address _token,
  address _beneficiary,
  uint256 _minReturnedTokens,
  bool _preferClaimedTokens,
  string calldata _memo,
  bytes calldata _metadata
) external payable override isTerminalOf(_projectId) returns (uint256 beneficiaryTokenCount) {
  _token; // Prevents unused var compiler and natspec complaints.
  _metadata; // Prevents unused var compiler and natspec complaints.

  // Make sure the migration hasn't already been finalized.
  if (finalized[_projectId]) revert MIGRATION_TERMINATED();

  // Make sure an amount is specified.
  if (_amount == 0) revert INVALID_AMOUNT();

  // Make sure no ETH was sent.
  if (msg.value > 0) revert NO_MSG_VALUE_ALLOWED();

  return _pay(_projectId, _amount, _beneficiary, _minReturnedTokens, _preferClaimedTokens, _memo);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                       | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| **`MIGRATION_TERMINATED`** | Thrown if the project owner has already finalized exchanges. |
| **`INVALID_AMOUNT`** | Thrown if no exchange amount was specified. |
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
