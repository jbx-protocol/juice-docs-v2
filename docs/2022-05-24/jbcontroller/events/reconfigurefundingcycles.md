# ReconfigureFundingCycles

:::caution
This page describes v2 contracts used before [a bug was identified](/docs/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

Emitted from:

* [`reconfigureFundingCyclesOf`](/protocol/api/contracts/or-controllers/jbcontroller/write/reconfigurefundingcyclesof.md)

#### Definition

```
event ReconfigureFundingCycles(
  uint256 configuration,
  uint256 projectId,
  string memo,
  address caller
);
```

* `configuration` is the configuration of the funding cycle that was configured.
* `projectId` is the ID of the project that reconfigured its funding cycles.
* `memo` is a note that was attached.
* `caller` is the address that issued the transaction within which the event was emitted.
