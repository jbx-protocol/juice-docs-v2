# isAllowedToSetFirstController

:::caution
This page describes v2 contracts used before [a bug was identified](/docs/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

Contract: [`JBDirectory`](/protocol/api/contracts/jbdirectory/README.md)‌

Interface: [`IJBDirectory`](/protocol/api/interfaces/ijbdirectory.md)

**Addresses that can set a project's first controller on their behalf. These addresses/contracts have been vetted and verified by this contract's owner.** 

#### Definition

```
/**
  @notice
  Addresses that can set a project's first controller on their behalf. These addresses/contracts have been vetted and verified by this contract's owner.

  _address The address that is either allowed or not.
*/
mapping(address => bool) public override isAllowedToSetFirstController;
```

* Arguments:
  * `_address` is the address that is either allowed or not.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBDirectory`](/protocol/api/interfaces/ijbdirectory.md) interface.
 
