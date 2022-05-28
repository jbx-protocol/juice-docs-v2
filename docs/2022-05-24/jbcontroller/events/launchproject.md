# LaunchProject

:::caution
This page describes v2 contracts used before [a bug was identified](/docs/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

Emitted from:

* [`launchProjectFor`](/protocol/api/contracts/or-controllers/jbcontroller/write/launchprojectfor.md)

#### Definition

```
event LaunchProject(uint256 configuration, uint256 projectId, string memo, address caller);
```

* `configuration` is the configuration of the first funding cycle.
* `projectId` is the ID of the project that was launched.
* `memo` is a note that was attached.
* `caller` is the address that issued the transaction within which the event was emitted.
