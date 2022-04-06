# operatorStore

Contract: [`JBOperatable`](/api/contracts/or-abstract/jboperatable/README.md)​‌

Interface: [`IJBOperatable`](/api/interfaces/ijboperatable.md)
**A contract storing operator assignments.**

# Definition

```solidity
/** 
  @notice 
  A contract storing operator assignments.
*/ 
IJBOperatorStore public immutable override operatorStore;
```

* The value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBOperatable`](/api/interfaces/ijboperatable.md) interface.
