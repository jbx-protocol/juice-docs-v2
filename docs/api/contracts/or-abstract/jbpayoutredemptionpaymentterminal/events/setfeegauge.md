# SetFeeGauge

Emitted from:

* [`setFeeGauge`](/protocol/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/setfeegauge.md)

## Definition

```solidity
event SetFeeGauge(IJBFeeGauge indexed feeGauge, address caller);
```

* `feeGauge` is the new [`feeGuage`](/protocol/api/interfaces/ijbfeegauge.md).
* `caller` is the address that issued the transaction within which the event was emitted.
