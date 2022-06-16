# defaultPreferAddToBalance

Contract: [`JBETHERC20ProjectPayer`](/dev/api/contracts/or-utilities/jbetherc20projectpayer/README.md)

Interface: [`IJBProjectPayer`](/dev/api/interfaces/ijbprojectpayer.md)

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
* The resulting function overrides a function definition from the [`IJBProjectPayer`](/dev/api/interfaces/ijbprojectpayer.md) interface.
