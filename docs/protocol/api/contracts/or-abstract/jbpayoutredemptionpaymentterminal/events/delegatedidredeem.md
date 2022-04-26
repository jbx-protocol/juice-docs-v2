# DelegateDidRedeem

Emitted from:

* [`redeemTokensOf`](/protocol/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/redeemtokensof.md)

#### Definition

```
event DelegateDidRedeem(
  IJBRedemptionDelegate indexed delegate,
  JBDidRedeemData data,
  address caller
);
```

* `delegate` is the [`IJBRedeemDelegate`](/protocol/api/interfaces/ijbredemptiondelegate.md) whos `didRedeem` transaction was triggered.
* `data` is the [`JBDidRedeemData`](/protocol/api/data-structures/jbdidredeemdata.md) that was sent to the `IJBRedeemDelegate`'s `didRedeem` function.
* `caller` is the address that issued the transaction within which the event was emitted.
