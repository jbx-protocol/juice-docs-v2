# _terminalsOf

:::caution
This page describes v2 contracts used before [a bug was identified](/docs/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

Contract: [`JBDirectory`](/protocol/api/contracts/jbdirectory/README.md)‌

**For each project ID, the terminals that are currently managing its funds.**

#### Definition

```
/** 
  @notice 
  For each project ID, the terminals that are currently managing its funds.

  _projectId The ID of the project to get terminals of.
*/
mapping(uint256 => IJBPaymentTerminal[]) private _terminalsOf;
```

* Arguments:
  * `_projectId` is the ID of the project to get terminals of.
* The resulting view function is private to this contract.
