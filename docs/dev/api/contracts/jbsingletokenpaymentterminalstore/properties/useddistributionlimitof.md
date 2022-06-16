# usedDistributionLimitOf

Contract: [`JBSingleTokenPaymentTerminalStore`](/dev/api/contracts/jbsingletokenpaymentterminalstore/README.md)​‌

Interface: [`IJBSingleTokenPaymentTerminalStore`](/dev/api/interfaces/ijbsingletokenpaymentterminalstore.md)

**The amount of funds that a project has distributed from its limit during the current funding cycle for each terminal, in terms of the distribution limit's currency.**

_Increases as projects use their preconfigured distribution limits._

_The used distribution limit is represented as a fixed point number with the same amount of decimals as its relative terminal._

#### Definition

```
/**
  @notice
  The amount of funds that a project has distributed from its limit during the current funding cycle for each terminal, in terms of the distribution limit's currency.

  @dev
  Increases as projects use their preconfigured distribution limits.

  @dev
  The used distribution limit is represented as a fixed point number with the same amount of decimals as its relative terminal.

  _terminal The terminal to which the used distribution limit applies.
  _projectId The ID of the project to get the used distribution limit of.
  _fundingCycleNumber The number of the funding cycle during which the distribution limit was used.
*/
mapping(IJBSingleTokenPaymentTerminal => mapping(uint256 => mapping(uint256 => uint256)))
  public
  override usedDistributionLimitOf;
```

* Arguments:
  * `_terminal` is the terminal to which the used distribution limit applies.
  * `_projectId` is the ID of the project to get the used distribution limit of.
  * `_fundingCycleNumber` is the number of the funding cycle during which the distribution limit was used.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`JBSingleTokenPaymentTerminalStore`](/dev/api/interfaces/ijbsingletokenpaymentterminalstore.md) interface.
