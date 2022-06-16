# directory

Contract: [`JBSplitsStore`](/dev/api/contracts/jbsplitsstore/README.md)​‌

Interface: [`IJBSplitsStore`](/dev/api/interfaces/ijbsplitsstore.md)

**The directory of terminals and controllers for projects.**

#### Definition

```
/** 
  @notice 
  The directory of terminals and controllers for projects.
*/ 
IJBDirectory public immutable override directory;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBSplitsStore`](/dev/api/interfaces/ijbsplitsstore.md) interface.
