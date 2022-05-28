# AddTerminal

:::caution
This page describes v2 contracts used before [a bug was identified](/docs/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

Emitted from:

* [`_addTerminalIfNeeded`](/protocol/api/contracts/jbdirectory/write/-_addterminalifneeded.md)

Definition:

```
event AddTerminal(uint256 indexed projectId, IJBPaymentTerminal indexed terminal, address caller);
```

* `projectId` is the ID of the project that added a terminal.
* `terminal` is the address of the terminal that was added.
* `caller` is the address that issued the transaction within which the event was emitted.
