# HoldFee

Emitted from:

* [`_takeFeeFrom`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/-_takefeefrom.md)

#### Definition

```
event HoldFee(
  uint256 indexed projectId,
  uint256 indexed amount,
  uint256 indexed fee,
  uint256 feeDiscount,
  address beneficiary,
  address caller
);
```

* `projectId` is the ID of the project whos fees are being held.
* `amount` is the amount that a fee being held was taken from.
* `fee` is the percent of the fee, out of [`JBConstants.MAX_FEE`](/dev/api/libraries/jbconstants.md).
* `feeDiscount` is the fee discount that was applicable at the time of holding the fee. 
* `beneficiary` is the address that should receive any benefits from later processing the fee.
* `caller` is the address that issued the transaction within which the event was emitted.
