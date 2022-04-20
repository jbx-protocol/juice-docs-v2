# _processFee

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Process a fee of the specified amount.**

#### Definition

```
function _processFee(uint256 _amount, address _beneficiary) { ... }
```

* Arguments:
  * `_amount` is the fee amount, as a floating point number with the same amount of decimals as this terminal.
  * `_beneficiary` is the address to mint the platform's tokens for.
* The function is private to this contract.
* The function doesn't return anything.

#### Body

1.  Get the terminal that the protocol project is accepting funds through for this terminal's token.

    ```
    // Get the terminal for the protocol project.
    IJBPaymentTerminal _terminal = directory.primaryTerminalOf(_PROTOCOL_PROJECT_ID, token);
    ```

    _Internal references:_

    * [`directory`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/directory.md)

    _External references:_

    * [`primaryTerminalOf`](/api/contracts/jbdirectory/read/primaryterminalof.md)

2.  If the protocol's terminal is the same as this terminal, save gas by paying the contract internally.

    ```
    // When processing the admin fee, save gas if the admin is using this contract as its terminal.
    if (_terminal == this) { ... }
    ```
    1.  Pay the protocol using the internal pay function.

        ```
        _pay(_amount, address(this), _PROTOCOL_PROJECT_ID, _beneficiary, 0, false, '', bytes('')); // Use the local pay call.
        ```

        _Internal references:_

        * [`_pay`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/-_pay.md)

3.  Otherwise if the terminal is different, transfer the fee over.

    ```
    else { ... }
    ```
    1.  Call any pre-transfer logic.

        ```
        // Trigger any inherited pre-transfer logic.
        _beforeTransferTo(address(_terminal), _amount);
        ```

        _Virtual references:_

        * [`_beforeTransferTo`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/-_beforetransferto.md)

    4.  Get a reference to the ETH amount that should be attached to the transaction. Only attach anything if the token being paid is ETH.

        ```
        // If this terminal's token is ETH, send it in msg.value.
        uint256 _payableValue = token == JBTokens.ETH ? _amount : 0;
        ```

        _Library references:_

        * [`JBTokens`](/api/libraries/jbtokens.md)
          * `.ETH`
    5.  Send the payment.

        ```
        // Send the payment.
        _terminal.pay{value: _payableValue}(
          _PROTOCOL_PROJECT_ID,
          _amount,
          token,
          _beneficiary,
          0,
          false,
          '',
          bytes('')
        ); // Use the external pay call of the correct terminal.
        ```

        _Internal references:_

        * [`_PROTOCOL_PROJECT_ID`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/-_protocol_project_id.md)
        
        _External references:_

        * [`pay`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/pay.md)


</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Process a fee of the specified amount.

  @param _amount The fee amount, as a floating point number with the same amount of decimals as this terminal.
  @param _beneficiary The address to mint the platform's tokens for.
*/
function _processFee(uint256 _amount, address _beneficiary) private {
  // Get the terminal for the protocol project.
  IJBPaymentTerminal _terminal = directory.primaryTerminalOf(_PROTOCOL_PROJECT_ID, token);

  // When processing the admin fee, save gas if the admin is using this contract as its terminal.
  if (_terminal == this)
    _pay(_amount, address(this), _PROTOCOL_PROJECT_ID, _beneficiary, 0, false, '', bytes('')); // Use the local pay call.
  else {
    // Trigger any inherited pre-transfer logic.
    _beforeTransferTo(address(_terminal), _amount);

    // If this terminal's token is ETH, send it in msg.value.
    uint256 _payableValue = token == JBTokens.ETH ? _amount : 0;

    // Send the payment.
    _terminal.pay{value: _payableValue}(
      _PROTOCOL_PROJECT_ID,
      _amount,
      token,
      _beneficiary,
      0,
      false,
      '',
      bytes('')
    ); // Use the external pay call of the correct terminal.
  }
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                | Description                             |
| --------------------- | --------------------------------------- |
| **`ZERO_VALUE_SENT`** | Thrown if the transaction had no value. |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>

</Tabs>
  
