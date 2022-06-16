# defaultPreferClaimedTokens

Contract: [`JBETHERC20ProjectPayer`](/dev/api/contracts/or-utilities/jbetherc20projectpayer/README.md)

Interface: [`IJBProjectPayer`](/dev/api/interfaces/ijbprojectpayer.md)

**A flag indicating whether issued tokens should be automatically claimed into the beneficiary's wallet. Leaving tokens unclaimed saves gas.**

#### Definition

```
/** 
  @notice 
  A flag indicating whether issued tokens should be automatically claimed into the beneficiary's wallet. Leaving tokens unclaimed saves gas.
*/
bool public override defaultPreferClaimedTokens;
```

* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBProjectPayer`](/dev/api/interfaces/ijbprojectpayer.md) interface.
