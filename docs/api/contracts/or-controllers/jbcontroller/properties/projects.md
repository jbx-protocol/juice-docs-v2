# projects

Contract: [`JBController`](/api/contracts/or-controllers/jbcontroller/README.md)​‌

Interface: [`IJBController`](/api/interfaces/ijbcontroller.md)

**The Projects contract which mints ERC-721's that represent project ownership and transfers.**

#### Definition

```
/** 
  @notice 
  The Projects contract which mints ERC-721's that represent project ownership and transfers.
*/ 
IJBProjects public immutable override projects;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBController`](/api/interfaces/ijbcontroller.md) interface.
