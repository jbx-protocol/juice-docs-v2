# _takeFeeFrom

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/protocol/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Takes a fee into the platform's project, which has an id of _PROTOCOL_PROJECT_ID.**

#### Definition

```
function _takeFeeFrom(
  uint256 _projectId,
  JBFundingCycle memory _fundingCycle,
  uint256 _amount,
  address _beneficiary,
  uint256 _feeDiscount
) private returns (uint256 feeAmount) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project having fees taken from.
  * `_fundingCycle` is the [`JBFundingCycle`](/protocol/api/data-structures/jbfundingcycle.md) during which the fee is being taken.
  * `_amount` is the amount to take a fee from.
  * `_beneficiary` is the address to mint the platforms tokens for.
  * `_feeDiscount` is the amount of discount to apply to the fee, out of the MAX_FEE.
* The function is private to this contract.
* The function returns the amount of the fee taken.

#### Body

1.  Get a reference to the amount that should be taken.

    ```
    // Get the fee discount.
    feeAmount = _feeAmount(_amount, fee, _feeDiscount);
    ```

    _Internal references:_

    * [`fee`](/protocol/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/fee.md)
    * [`_feeAmount`](/protocol/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/read/-_feeamount.md)
2.  If the funding cycle is configured to hold fees, add a [`JBFee`](/protocol/api/data-structures/jbfee.md) data structure to the project's stored held fees to be either processed or refunded later, and emit a `HoldFee` event with the relevant parameters. Otherwise, take the fee and emit a `ProcessFee` event with the relevant parameters.

    ```
    if (_fundingCycle.shouldHoldFees()) {
      // Store the held fee.
      _heldFeesOf[_projectId].push(JBFee(_amount, uint32(fee), uint32(_feeDiscount), _beneficiary));

      emit HoldFee(_projectId, _amount, fee, _feeDiscount, _beneficiary, msg.sender);
    } else {
      // Process the fee.
      _processFee(feeAmount, _beneficiary); // Take the fee.

      emit ProcessFee(_projectId, feeAmount, false, _beneficiary, msg.sender);
    }
    ```

    _Internal references:_

    * [`fee`](/protocol/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/fee.md)
    * [`_heldFeesOf`](/protocol/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/-_heldfeesof.md)
    * [`_processFee`](/protocol/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/-_processfee.md)

    _Event references:_

    * [`HoldFee`](/protocol/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/holdfee.md)
    * [`ProcessFee`](/protocol/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/processfee.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Takes a fee into the platform's project, which has an id of _PROTOCOL_PROJECT_ID.

  @param _projectId The ID of the project having fees taken from.
  @param _fundingCycle The funding cycle during which the fee is being taken.
  @param _amount The amount of the fee to take, as a floating point number with 18 decimals.
  @param _beneficiary The address to mint the platforms tokens for.
  @param _feeDiscount The amount of discount to apply to the fee, out of the MAX_FEE.

  @return feeAmount The amount of the fee taken.
*/
function _takeFeeFrom(
  uint256 _projectId,
  JBFundingCycle memory _fundingCycle,
  uint256 _amount,
  address _beneficiary,
  uint256 _feeDiscount
) private returns (uint256 feeAmount) {
  feeAmount = _feeAmount(_amount, fee, _feeDiscount);

  if (_fundingCycle.shouldHoldFees()) {
    // Store the held fee.
    _heldFeesOf[_projectId].push(JBFee(_amount, uint32(fee), uint32(_feeDiscount), _beneficiary));

    emit HoldFee(_projectId, _amount, fee, _feeDiscount, _beneficiary, msg.sender);
  } else {
    // Process the fee.
    _processFee(feeAmount, _beneficiary); // Take the fee.

    emit ProcessFee(_projectId, feeAmount, false, _beneficiary, msg.sender);
  }
}
```

</TabItem>

<TabItem value="Events" label="Events">

| Name                          | Data                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`HoldFee`**](/protocol/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/holdfee.md)                         | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed amount</code></li><li><code>uint256 indexed fee</code></li><li><code>uint256 feeDiscount</code></li><li><code>address beneficiary</code></li><li><code>address caller</code></li></ul>                                                                                                                                                                                                                                                                                                                         |
| [**`ProcessFee`**](/protocol/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/processfee.md)                         | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed amount</code></li><li><code>bool indexed wasHeld</code></li><li><code>address beneficiary</code></li><li><code>address caller</code></li></ul>                                                                                                                                                                                                                                                                                                                         |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
