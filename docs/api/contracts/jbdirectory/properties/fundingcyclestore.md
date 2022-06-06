# fundingCycleStore

Contract: [`JBController`](/api/contracts/jbdirectory/README.md)​‌

Interface: [`IJBController`](/api/interfaces/ijbcontroller.md)

**The contract storing all funding cycle configurations.**

#### Definition

```
/** 
  @notice 
  The contract storing all funding cycle configurations.
*/
IJBFundingCycleStore public immutable fundingCycleStore;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBController`](/api/interfaces/ijbcontroller.md) interface.
