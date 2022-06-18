# finalized

Contract: [`JBV1TokenPaymentTerminal`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/README.md)​‌

Interface: [`IJBV1TokenPaymentTerminal`](/dev/api/interfaces/ijbv1tokenpaymentterminal.md)

**A flag indicating if a project's migration has finished.**

#### Definition

```
/** 
  @notice 
  A flag indicating if a project's migration has finished.

  _projectId The ID of the project to check the migration status.
*/
mapping(uint256 => bool) public override finalized;
```

* Arguments:
  * `_projectId` is the ID of the project to check the migration status.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBV1TokenPaymentTerminal`](/dev/api/interfaces/ijbv1tokenpaymentterminal.md) interface.
