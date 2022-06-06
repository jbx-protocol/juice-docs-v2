# Init

:::caution
This page describes v2 contracts used before [a bug was identified](/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

Emitted from:

* [`_initFor`](/protocol/api/contracts/jbfundingcyclestore/write/-_initfor.md)

#### Definition

```
event Init(uint256 indexed configuration, uint256 indexed projectId, uint256 indexed basedOn);
```

* `configuration` is the funding cycle configuration that was initialized.
* `projectId` is the ID of the project to which the initialized funding cycle belongs.
* `basedOn` is the ID of the funding cycle that the initialized funding cycle is based on.
