# AddToBalance

Emitted from:

* [`_refundHeldFees`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/-_refundheldfees.md)

#### Definition

```
event RefundHeldFees(
  uint256 indexed projectId,
  uint256 indexed amount,
  uint256 indexed refundedFees,
  uint256 leftoverAmount,
  address caller
);
```

* `projectId` is the ID of the project having held fees refunded.
* `amount` is the amount being used to refund the held fees.
* `refundedFees` is the amount of fees that were refunded.
* `leftoverAmount` is the leftover funds that weren't needed to refund all held fees.
* `caller` is the address that issued the transaction within which the event was emitted.
