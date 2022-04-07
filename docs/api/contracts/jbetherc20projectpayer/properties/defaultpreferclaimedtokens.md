# defaultPreferClaimedTokens

Contract: [`JBETHERC20ProjectPayer`](/api/contracts/jbetherc20projectpayer/README.md)

Interface: [`IJBProjectPayer`](/api/interfaces/ijbprojectpayer.md)

**A flag indicating whether issued tokens should be automatically claimed into the beneficiary's wallet. Leaving tokens unclaimed saves gas.**

# Definition

```
/** 
  @notice 
  A flag indicating whether issued tokens should be automatically claimed into the beneficiary's wallet. Leaving tokens unclaimed saves gas.
*/
bool public override defaultPreferClaimedTokens;
```

* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBProjectPayer`](/api/interfaces/ijbprojectpayer.md) interface.
