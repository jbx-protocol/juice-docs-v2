# directory

Contract: [`JBSingleTokenPaymentTerminalStore`](/dev/api/contracts/jbsingletokenpaymentterminalstore/README.md)​‌

Interface: [`IJBSingleTokenPaymentTerminalStore`](/dev/api/interfaces/ijbsingletokenpaymentterminalstore.md)

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
* The resulting function overrides a function definition from the [`JBSingleTokenPaymentTerminalStore`](/dev/api/interfaces/ijbsingletokenpaymentterminalstore.md) interface.
