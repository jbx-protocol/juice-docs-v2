# SetIsAllowedToSetFirstController

:::caution
This page describes v2 contracts used before [a bug was identified](/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

Emitted from:

* [`setIsAllowedToSetFirstController`](/protocol/api/contracts/jbdirectory/write/setisallowedtosetfirstcontroller.md)

Definition:

```
event SetIsAllowedToSetFirstController(address indexed addr, bool indexed flag, address caller);
```

* `addr` is the address of the contract that is being given or revoked allowance to set projects' first controllers on their behalf. 
* `flag` is the value that was set, either `true` or `false`.
* `caller` is the address that issued the transaction within which the event was emitted.
