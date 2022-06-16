# projects

Contract: [`JBSplitsStore`](/dev/api/contracts/jbsplitsstore/README.md)​‌

Interface: [`IJBSplitsStore`](/dev/api/interfaces/ijbsplitsstore.md)

**Mints ERC-721's that represent project ownership and transfers.**

#### Definition

```
/** 
  @notice 
  Mints ERC-721's that represent project ownership and transfers.
*/ 
IJBProjects public immutable override projects;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBSplitsStore`](/dev/api/interfaces/ijbsplitsstore.md) interface.
