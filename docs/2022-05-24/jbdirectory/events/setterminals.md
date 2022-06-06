# SetTerminal

:::caution
This page describes v2 contracts used before [a bug was identified](/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

Emitted from:

* [`setTerminalsOf`](/protocol/api/contracts/jbdirectory/write/setterminalsof.md)

Definition:

```
event SetTerminals(
    uint256 indexed projectId,
    IJBPaymentTerminal[] indexed terminals,
    address caller
  );
```

* `projectId` is the ID of the project that set terminals.
* `terminals` are the terminals that were set.
* `caller` is the address that issued the transaction within which the event was emitted.
