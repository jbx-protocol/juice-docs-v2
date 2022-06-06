# SetController

:::caution
This page describes v2 contracts used before [a bug was identified](/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

Emitted from:

* [`setControllerOf`](/protocol/api/contracts/jbdirectory/write/setcontrollerof.md)

Definition:

```
event SetController(uint256 indexed projectId, IJBController indexed controller, address caller);
```

* `projectId` is the ID of the project whose controller was set.
* `controller` is the address of the controller that was set.
* `caller` is the address that issued the transaction within which the event was emitted.
