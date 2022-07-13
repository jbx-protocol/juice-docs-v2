# setFee

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPayoutRedemptionPaymentTerminal`](/dev/api/interfaces/ijbpayoutredemptionpaymentterminal.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Allows the fee to be updated.**

_Only the owner of this contract can change the fee._

#### Definition

```
function setFee(uint256 _fee) external onlyOwner { ... }
```

* Arguments:
  * `_fee` is the new fee, out of MAX_FEE.
* Through the [`onlyOwner`](https://docs.openzeppelin.com/contracts/4.x/api/ownership#Ownable-onlyOwner--) modifier, the function can only be accessed by the owner of this contract.
* The function can be overriden by inheriting contracts.
* The function doesn't return anything.

#### Body

1.  Make sure the proposed fee is less than the max fee.

    ```
    // The provided fee must be within the max.
    if (_fee > _FEE_CAP) revert FEE_TOO_HIGH();
    ```

    _Internal references:_

    * [`_FEE_CAP`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/properties/-_fee_cap.md)
2.  Store the new fee.

    ```
    // Store the new fee.
    fee = _fee;
    ```

    _Internal references:_

    * [`fee`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/properties/fee.md)
    
3.  Emit a `SetFee` event with the relevant parameters.

    ```
    emit SetFee(_fee, msg.sender);
    ```

    _Event references:_

    * [`SetFee`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/events/setfee.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Allows the fee to be updated.

  @dev
  Only the owner of this contract can change the fee.

  @param _fee The new fee, out of MAX_FEE.
*/
function setFee(uint256 _fee) external virtual override onlyOwner {
  // The provided fee must be within the max.
  if (_fee > _FEE_CAP) revert FEE_TOO_HIGH();

  // Store the new fee.
  fee = _fee;

  emit SetFee(_fee, msg.sender);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String             | Description                                    |
| ------------------ | ---------------------------------------------- |
| **`FEE_TOO_HIGH`** | Thrown if the proposed fee is greater than 5%. |

</TabItem>

<TabItem value="Events" label="Events">

| Name                                | Data                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------ |
| [**`SetFee`**](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/events/setfee.md)                                                 | <ul><li><code>uint256 fee</code></li><li><code>address caller</code></li></ul>                                                                                                                                                                                                                                            |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
