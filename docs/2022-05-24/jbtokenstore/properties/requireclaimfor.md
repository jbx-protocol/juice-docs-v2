# requireClaimFor

:::caution
This page describes v2 contracts used before [a bug was identified](/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

Contract: [`JBTokenStore`](/protocol/api/contracts/jbtokenstore/README.md)​‌

Interface: [`IJBTokenStore`](/protocol/api/interfaces/ijbtokenstore.md)

**A flag indicating if tokens are required to be issued as claimed for a particular project.**

#### Definition

```
/**
  @notice
  A flag indicating if tokens are required to be issued as claimed for a particular project.

  _projectId The ID of the project to which the requirement applies.
*/
mapping(uint256 => bool) public override requireClaimFor;
```

* Arguments:
  * `_projectId` is the ID of the project to which the requirement applies.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBTokenStore`](/protocol/api/interfaces/ijbtokenstore.md) interface.
