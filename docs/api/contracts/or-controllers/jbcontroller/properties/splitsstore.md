# splitsStore

Contract: [`JBController`](/api/contracts/or-controllers/jbcontroller/README.md)​‌

Interface: [`IJBController`](/api/interfaces/ijbcontroller.md)

**The contract that stores splits for each project.**

# Definition

```
/** 
  @notice 
  The contract that stores splits for each project.
*/
IJBSplitsStore public immutable splitsStore;
```

* The value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBController`](/api/interfaces/ijbcontroller.md) interface.
