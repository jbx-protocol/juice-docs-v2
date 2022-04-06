# fundingCycleStore

Contract: [`JBController`](/api/contracts/jbdirectory/README.md)​‌

Interface: [`IJBController`](/api/interfaces/ijbcontroller.md)

**The contract storing all funding cycle configurations.**

# Definition

```solidity
/** 
  @notice 
  The contract storing all funding cycle configurations.
*/
IJBFundingCycleStore public immutable fundingCycleStore;
```

* The value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBController`](/api/interfaces/ijbcontroller.md) interface.
