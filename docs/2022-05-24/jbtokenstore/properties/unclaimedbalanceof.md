# unclaimedBalanceOf

:::caution
This page describes v2 contracts used before [a bug was identified](/docs/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

Contract: [`JBTokenStore`](/protocol/api/contracts/jbtokenstore/README.md)​‌

Interface: [`IJBTokenStore`](/protocol/api/interfaces/ijbtokenstore.md)

**Each holder's balance of unclaimed tokens for each project.**

#### Definition

```
/**
  @notice
  Each holder's balance of unclaimed tokens for each project.

  _holder The holder of balance.
  _projectId The ID of the project to which the token belongs.
*/
mapping(address => mapping(uint256 => uint256)) public override unclaimedBalanceOf;
```

* Arguments:
  * `_holder` is the holder of balance.
  * `_projectId` is the ID of the project to which the token belongs.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBTokenStore`](/protocol/api/interfaces/ijbtokenstore.md) interface.
