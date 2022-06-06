# ShouldRequireClaim

:::caution
This page describes v2 contracts used before [a bug was identified](/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

Emitted from:

* [`shouldRequireClaimingFor`](/protocol/api/contracts/jbtokenstore/write/shouldrequireclaimingfor.md)

#### Definition

```
event ShouldRequireClaim(uint256 indexed projectId, bool indexed flag, address caller)
```

* `projectId` is the ID of the project which is requiring claimed tokens or not.
* `flag` is whether or not claimed tokens are being required.
* `caller` is the address that issued the transaction within which the event was emitted.
