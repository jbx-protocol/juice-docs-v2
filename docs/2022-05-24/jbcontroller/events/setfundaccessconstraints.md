# SetFundAccessConstraints

:::caution
This page describes v2 contracts used before [a bug was identified](/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

Emitted from:

* [`_configure`](/protocol/api/contracts/or-controllers/jbcontroller/write/-_configure.md)

#### Definition

```
event SetFundAccessConstraints(
  uint256 indexed fundingCycleConfiguration,
  uint256 indexed fundingCycleNumber,
  uint256 indexed projectId,
  JBFundAccessConstraints constraints,
  address caller
);
```

* `fundingCycleConfiguration` is the funding cycle configuration during which the constraints are valid.
* `fundingCycleNumber` is the number of the funding cycle during which the constraints were set.
* `projectId` is the ID of the project who has set an fund access constraints.
* `constraints` is the [`JBFundAccessConstraints`](/protocol/api/data-structures/jbfundaccessconstraints.md) data structure.
* `caller` is the address that issued the transaction within which the event was emitted.
