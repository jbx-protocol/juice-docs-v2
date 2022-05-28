# directory

:::caution
This page describes v2 contracts used before [a bug was identified](/docs/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

Contract: [`JBSplitsStore`](/protocol/api/contracts/jbsplitsstore/README.md)​‌

Interface: [`IJBSplitsStore`](/protocol/api/interfaces/ijbsplitsstore.md)

**The directory of terminals and controllers for projects.**

#### Definition

```
/** 
  @notice 
  The directory of terminals and controllers for projects.
*/ 
IJBDirectory public immutable override directory;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBSplitsStore`](/protocol/api/interfaces/ijbsplitsstore.md) interface.
