# defaultPreferAddToBalance

Contract: [`JBETHERC20ProjectPayer`](/api/contracts/or-utilities/jbetherc20projectpayer/README.md)

Interface: [`IJBProjectPayer`](/api/interfaces/ijbprojectpayer.md)

**A flag indicating if received payments should call the `pay` function or the `addToBalance` function of a project.**

#### Definition

```
/**
  @notice 
  A flag indicating if received payments should call the `pay` function or the `addToBalance` function of a project.
*/
bool public override defaultPreferAddToBalance;
```

* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBProjectPayer`](/api/interfaces/ijbprojectpayer.md) interface.
