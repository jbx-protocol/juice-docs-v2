# DistributeToSplitGroup

Emitted from:

* [`_payToSplits`](/dev/api/contracts/or-utilities/jbetherc20splitspayer/write/-_paytosplits.md)

#### Definition

```
event DistributeToSplitGroup(
  uint256 indexed projectId,
  uint256 indexed domain,
  uint256 indexed group,
  address caller
);
```

* `projectId` is the ID of the project to which the split belongs.
* `domain` is the namespace that differentiates different split groups for the projectId.
* `group` is the property that joins multiple splits into one full group.
* `caller` is the address that issued the transaction within which the event was emitted.
