# DistributeToPayoutSplit

Emitted from:

* [`_distributeToPayoutSplitsOf`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/-_distributetopayoutsplitsof.md)

#### Definition

```
event DistributeToPayoutSplit(
  uint256 indexed projectId,
  uint256 indexed domain,
  uint256 indexed group,
  JBSplit split,
  uint256 amount,
  address caller
);
```

* `projectId` is the ID of the project to which the split belongs.
* `domain` is the namespace that differentiates different split groups for the projectId.
* `group` is the property that joins multiple splits into one full group.
* `split` is the [`JBSplit`](/api/data-structures/jbsplit.md) to which the distribution was made.
* `amount` is the total token amount that was distributed to the split.
* `caller` is the address that issued the transaction within which the event was emitted.
