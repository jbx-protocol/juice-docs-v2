# _refundHeldFees

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/protocol/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Refund fees based on the specified amount.**

#### Definition

```
function _refundHeldFees(uint256 _projectId, uint256 _amount)
  private
  returns (uint256 refundedFees) { ... }
```

* Arguments:
  * `_projectId` is the project for which fees are being refunded.
  * `_amount` is the amount to base the refund on, as a fixed point number with the same amount of decimals as this terminal.
* The function is private to this contract.
* The function doesn't return anything.

#### Body

1.  Get a reference to any held [`JBFee`](/protocol/api/data-structures/jbfee.md)'s for the project.

    ```
    // Get a reference to the project's held fees.
    JBFee[] memory _heldFees = _heldFeesOf[_projectId];
    ```

    _Internal references:_

    * [`_heldFeesOf`](/protocol/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/-_heldfeesof.md)
2.  Delete all of the project's held fees. These will be repopulated if they were not refunded.

    ```
    // Delete the current held fees.
    delete _heldFeesOf[_projectId];
    ```

    _Internal references:_

    * [`_heldFeesOf`](/protocol/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/-_heldfeesof.md)

3.  Get a reference to how much of the amount is left to refund fees for.

    ```
    // Get a reference to the leftover amount once all fees have been settled.
    uint256 leftoverAmount = _amount;
    ```

4.  Loop through each held fee, decrementing the amount as held fees are refunded and incrementing the amount of refunded fees. If the entire refund amount has been refunded, add the fee structure back into the project's held fees so that they can be processed or refunded later. If the amount left is greater than the fee structure's amount, decrement the refunded amount and leave the fee structure out of the project's held fees. If only some of the fee structure's amount is needed to cover the rest of the remaining amount, set the amount to 0 after adding the fee structure back into the project's held fees having subtracted the remaining refund amount.

    ```
    // Process each fee.
    for (uint256 _i = 0; _i < _heldFees.length; _i++) {
      if (leftoverAmount == 0) _heldFeesOf[_projectId].push(_heldFees[_i]);
      else if (leftoverAmount >= _heldFees[_i].amount) {
        leftoverAmount = leftoverAmount - _heldFees[_i].amount;
        refundedFees += _feeAmount(
          _heldFees[_i].amount,
          _heldFees[_i].fee,
          _heldFees[_i].feeDiscount
        );
      } else {
        _heldFeesOf[_projectId].push(
          JBFee(
            _heldFees[_i].amount - leftoverAmount,
            _heldFees[_i].fee,
            _heldFees[_i].feeDiscount,
            _heldFees[_i].beneficiary
          )
        );
        refundedFees += _feeAmount(leftoverAmount, _heldFees[_i].fee, _heldFees[_i].feeDiscount);
        leftoverAmount = 0;
      }
    }
    ```

    _Internal references:_

    * [`_heldFeesOf`](/protocol/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/-_heldfeesof.md)
    * [`_feeAmount`](/protocol/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/read/-_feeamount.md)

5.  Emit a `RefundHeldFees` event with the relevant parameters.

    ```
    emit RefundHeldFees(_projectId, _amount, refundedFees, leftoverAmount, msg.sender);
    ```

    _Event references:_

    * [`RefundHeldFees`](/protocol/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/refundheldfees.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Refund fees based on the specified amount.

  @param _projectId The project for which fees are being refunded.
  @param _amount The amount to base the refund on, as a fixed point number with the same amount of decimals as this terminal.

  @return refundedFees How much fees were refunded, as a fixed point number with the same number of decimals as this terminal.
*/
function _refundHeldFees(uint256 _projectId, uint256 _amount)
  private
  returns (uint256 refundedFees) {
  // Get a reference to the project's held fees.
  JBFee[] memory _heldFees = _heldFeesOf[_projectId];

  // Delete the current held fees.
  delete _heldFeesOf[_projectId];

  // Get a reference to the leftover amount once all fees have been settled.
  uint256 leftoverAmount = _amount;

  // Process each fee.
  for (uint256 _i = 0; _i < _heldFees.length; _i++) {
    if (leftoverAmount == 0) _heldFeesOf[_projectId].push(_heldFees[_i]);
    else if (leftoverAmount >= _heldFees[_i].amount) {
      leftoverAmount = leftoverAmount - _heldFees[_i].amount;
      refundedFees += _feeAmount(
        _heldFees[_i].amount,
        _heldFees[_i].fee,
        _heldFees[_i].feeDiscount
      );
    } else {
      _heldFeesOf[_projectId].push(
        JBFee(
          _heldFees[_i].amount - leftoverAmount,
          _heldFees[_i].fee,
          _heldFees[_i].feeDiscount,
          _heldFees[_i].beneficiary
        )
      );
      refundedFees += _feeAmount(leftoverAmount, _heldFees[_i].fee, _heldFees[_i].feeDiscount);
      leftoverAmount = 0;
    }
  }

  emit RefundHeldFees(_projectId, _amount, refundedFees, leftoverAmount, msg.sender);
}
```

</TabItem>

<TabItem value="Events" label="Events">

| Name                          | Data                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`RefundHeldFees`**](/protocol/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/refundheldfees.md)                                         | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed amount</code></li><li><code>uint256 indexed refundedFees</code></li><li><code>uint256 leftoverAmount</code></li><li><code>address caller</code></li></ul>        |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
