# processFees

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPayoutRedemptionPaymentTerminal`](/dev/api/interfaces/ijbpayoutredemptionpaymentterminal.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Process any fees that are being held for the project.**

_Only a project owner, an operator, or the contract's owner can process held fees._

#### Definition

```
function processFees(uint256 _projectId)
  external
  virtual
  override
  requirePermissionAllowingOverride(
    projects.ownerOf(_projectId),
    _projectId,
    JBOperations.PROCESS_FEES,
    msg.sender == owner()
  )
  nonReentrant { ... }
```

* Arguments:
  * `_projectId` is the ID of the project whos held fees should be processed.
* Through the [`requirePermissionAllowingOverride`](/dev/api/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md) modifier, the function is only accessible by the project's owner, from an operator that has been given the [`JBOperations.PROCESS_FEES`](/dev/api/libraries/jboperations.md) permission by the project owner for the provided `_projectId`, or from the owner of this contract.
* The function can be overriden by inheriting contracts.
* The function cannot be accessed recursively or while other `nonReentrant` functions in this contract are in progress.
* The resulting function overrides a function definition from the [`IJBPayoutRedemptionPaymentTerminal`](/dev/api/interfaces/ijbpayoutredemptionpaymentterminal.md) interface.
* The function doesn't return anything.

#### Body

1.  Get a reference to all held fees for the project.

    ```
    // Get a reference to the project's held fees.
    JBFee[] memory _heldFees = _heldFeesOf[_projectId];
    ```

    _Internal references:_

    * [`_heldFeesOf`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/properties/-_heldfeesof.md)
2.  Remove all fees.

    ```
    // Delete the held fee's now that they've been processed.
    delete _heldFeesOf[_projectId];
    ```

    _Internal references:_

    * [`_heldFeesOf`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/properties/-_heldfeesof.md)
2.  Iterate through the array. Take fee's for each [`JBFee`](/dev/api/data-structures/jbfee.md) data structure. Emit a `ProcessFee` event with the relevant parameters for each fee processed.

    ```
    // Push array length in stack
    uint256 _heldFeeLength = _heldFees.length;

    // Process each fee.
    for (uint256 _i = 0; _i < _heldFeeLength;) {
      // Get the fee amount.
      uint256 _amount = _feeAmount(
        _heldFees[_i].amount,
        _heldFees[_i].fee,
        _heldFees[_i].feeDiscount
      );

      // Process the fee.
      _processFee(_amount, _heldFees[_i].beneficiary);

      emit ProcessFee(_projectId, _amount, _heldFees[_i].beneficiary, msg.sender);

      unchecked {
        ++_i;
      }
    }
    ```

    _Internal references:_

    * [`_processFee`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/-_processfee.md)
    * [`_feeAmount`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/read/-_feeamount.md)

    _Event references:_

    * [`ProcessFee`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/events/processfee.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Process any fees that are being held for the project.

  @dev
  Only a project owner, an operator, or the contract's owner can process held fees.

  @param _projectId The ID of the project whos held fees should be processed.
*/
function processFees(uint256 _projectId)
  external
  virtual
  override
  requirePermissionAllowingOverride(
    projects.ownerOf(_projectId),
    _projectId,
    JBOperations.PROCESS_FEES,
    msg.sender == owner()
  )
{
  // Get a reference to the project's held fees.
  JBFee[] memory _heldFees = _heldFeesOf[_projectId];

  // Delete the held fees.
  delete _heldFeesOf[_projectId];

  // Push array length in stack
  uint256 _heldFeeLength = _heldFees.length;

  // Process each fee.
  for (uint256 _i = 0; _i < _heldFeeLength;) {
    // Get the fee amount.
    uint256 _amount = _feeAmount(
      _heldFees[_i].amount,
      _heldFees[_i].fee,
      _heldFees[_i].feeDiscount
    );

    // Process the fee.
    _processFee(_amount, _heldFees[_i].beneficiary);

    emit ProcessFee(_projectId, _amount, true, _heldFees[_i].beneficiary, msg.sender);

    unchecked {
      ++_i;
    }
  }
}
```

</TabItem>

<TabItem value="Events" label="Events">

| Name                                          | Data                                                                                                                                                       |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`ProcessFee`**](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/events/processfee.md)                         | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed amount</code></li><li><code>bool indexed wasHeld</code></li><li><code>address beneficiary</code></li><li><code>address caller</code></li></ul>                                                                                                                                                                                                                                                                                                                         |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
