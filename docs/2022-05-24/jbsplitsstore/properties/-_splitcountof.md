# _splitCountOf

:::caution
This page describes v2 contracts used before [a bug was identified](/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

Contract: [`JBSplitsStore`](/protocol/api/contracts/jbsplitsstore/README.md)​‌

**The number of splits currently set for each project ID's configurations.**

#### Definition

```
/** 
  @notice
  The number of splits currently set for each project ID's configurations.

  _projectId The ID of the project to get the split count for.
  _domain An identifier within which the returned splits should be considered active.
  _group The identifying group of the splits.
*/
mapping(uint256 => mapping(uint256 => mapping(uint256 => uint256))) private _splitCountOf;
```

* Arguments:
  * `_projectId` is the ID of the project to get the split count for.
  * `_domain` is an identifier within which the returned splits should be considered active.
  * `_group` is the identifying group of the splits.
* Returns the number of splits the project has under the specified domain and gorup.
* The resulting view function is private to this contract.
