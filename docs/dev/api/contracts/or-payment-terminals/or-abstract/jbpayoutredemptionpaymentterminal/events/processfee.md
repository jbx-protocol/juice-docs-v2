# ProcessFee

Emitted from:

* [`processFees`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/processfees.md)
* [`_takeFeeFrom`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/-_takefeefrom.md)

#### Definition

```
event ProcessFee(
  uint256 indexed projectId,
  uint256 indexed amount,
  bool indexed wasHeld,
  address beneficiary,
  address caller
);
```

* `projectId` is the ID of the project whos fees were processed.
* `amount` is the amount of the fee that was processed.
* `wasHeld` is a flag indicating if the processed fee was previously being held.
* `beneficiary` is the address that received any benefits for paying the fee.
* `caller` is the address that issued the transaction within which the event was emitted.
