# tokenStore

Contract: [`JBController`](/api/contracts/or-controllers/jbcontroller/README.md)​‌

Interface: [`IJBController`](/api/interfaces/ijbcontroller.md)

**The contract that manages token minting and burning.**

# Definition

```
/** 
  @notice 
  The contract that manages token minting and burning.
*/
IJBTokenStore public immutable tokenStore;
```

* The value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBController`](/api/interfaces/ijbcontroller.md) interface.
