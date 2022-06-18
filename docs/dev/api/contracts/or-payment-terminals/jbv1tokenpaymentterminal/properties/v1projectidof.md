# v1ProjectIdOf

Contract: [`JBV1TokenPaymentTerminal`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/README.md)​‌

Interface: [`IJBV1TokenPaymentTerminal`](/dev/api/interfaces/ijbv1tokenpaymentterminal.md)

**The v1 project ID for a v2 project.**

#### Definition

```
/** 
  @notice 
  The v1 project ID for a v2 project.

  _projectId The ID of the v2 project to exchange tokens for. 
*/
mapping(uint256 => uint256) public override v1ProjectIdOf;
```

* Arguments:
  * `_projectId` is the ID of the v2 project to exchange tokens for.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBV1TokenPaymentTerminal`](/dev/api/interfaces/ijbv1tokenpaymentterminal.md) interface.
