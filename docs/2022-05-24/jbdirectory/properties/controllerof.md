# controllerOf

:::caution
This page describes v2 contracts used before [a bug was identified](/docs/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

Contract: [`JBDirectory`](/protocol/api/contracts/jbdirectory/README.md/)​‌

Interface: [`IJBDirectory`](/protocol/api/interfaces/ijbdirectory.md)

**For each project ID, the controller that manages how terminals interact with tokens and funding cycles.**

#### Definition

```
/** 
  @notice 
  For each project ID, the controller that manages how terminals interact with tokens and funding cycles.

  _projectId The ID of the project to get the controller of.
*/
mapping(uint256 => address) public override controllerOf;
```

* Arguments:
  * `_projectId` is the ID of the project to get the controller of.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBDirectory`](/protocol/api/interfaces/ijbdirectory.md) interface.
