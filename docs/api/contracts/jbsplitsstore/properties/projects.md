# projects

Contract: [`JBSplitsStore`](/api/contracts/jbsplitsstore/README.md)​‌

Interface: [`IJBSplitsStore`](/api/interfaces/ijbsplitsstore.md)

**The Projects contract which mints ERC-721's that represent project ownership and transfers.**

# Definition

```
/** 
  @notice 
  The Projects contract which mints ERC-721's that represent project ownership and transfers.
*/ 
IJBProjects public immutable override projects;
```

* The value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBSplitsStore`](/api/interfaces/ijbsplitsstore.md) interface.
