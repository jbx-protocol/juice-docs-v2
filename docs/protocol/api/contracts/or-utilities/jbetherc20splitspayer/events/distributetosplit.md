# DistributeToSplit

Emitted from:

* [`_payToSplits`](/protocol/api/contracts/or-utilities/jbetherc20splitspayer/write/-_paytosplits.md)

#### Definition

```
event DistributeToSplit(
  uint256 indexed projectId,
  uint256 indexed domain,
  uint256 indexed group,
  JBSplit split,
  uint256 amount,
  address defaultBeneficiary,
  address caller
);
```

* `projectId` is the ID of the project to which the split belongs.
* `domain` is the namespace that differentiates different split groups for the projectId.
* `group` is the property that joins multiple splits into one full group.
* `split` is the [`JBSplit`](/protocol/api/data-structures/jbsplit.md) to which the distribution was made.
* `amount` is the total token amount that was distributed to the split.
* `defaultBeneficiary` is the address that'll be sent tokens if the split doesn't specify a recipient.
* `caller` is the address that issued the transaction within which the event was emitted.
