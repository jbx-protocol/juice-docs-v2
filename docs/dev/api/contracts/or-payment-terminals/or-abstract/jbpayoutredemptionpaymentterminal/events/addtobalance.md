# AddToBalance

Emitted from:

* [`addToBalanceOf`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/addtobalanceof.md)

#### Definition

```
event AddToBalance(uint256 indexed projectId, uint256 amount, string memo  bytes metadata, address caller);
```

* `projectId` is the ID of the balance's project.
* `amount` is the amount being added.
* `memo` is a note that was attached.
* `metadata` is extra data sent to the data source, delegate, and emitted event, if provided.
* `caller` is the address that issued the transaction within which the event was emitted.
