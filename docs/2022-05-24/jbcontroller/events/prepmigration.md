# Migrate

:::caution
This page describes v2 contracts used before [a bug was identified](/docs/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

Emitted from:

* [`prepMigrationOf`](/protocol/api/contracts/or-controllers/jbcontroller/write/prepformigrationof.md)

#### Definition

```
event PrepMigration(uint256 indexed projectId, IJBController from, address caller);
```

* `projectId` is the ID of the project that was prepped for migration.
* `from` is the controller that the project is being migrated from.
* `caller` is the address that issued the transaction within which the event was emitted.