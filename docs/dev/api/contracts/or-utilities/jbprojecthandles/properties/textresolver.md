# textResolver

Contract: [`JBProjectHandles`](/dev/api/contracts/or-utilities/jbprojecthandles/README.md)​‌

Interface: [`IJBProjectHandles`](/dev/api/interfaces/ijbprojecthandles.md)

**The ENS text resolver contract address.**

#### Definition

```
/** 
  @notice 
  The ENS text resolver contract address.
*/ 
ITextResolver public immutable override textResolver;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBProjectHandles`](/dev/api/interfaces/ijbprojecthandles.md) interface.
