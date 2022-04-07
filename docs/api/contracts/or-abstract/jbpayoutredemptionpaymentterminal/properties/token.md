# token

Contract: [`JBPayoutRedemptionPaymentTerminal`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPaymentTerminal`](/api/interfaces/ijbpaymentterminal.md)

**The token that this terminal accepts.**

# Definition

```
/**
  @notice
  The token that this terminal accepts.
*/
address public immutable override token;
```

* The value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBPaymentTerminal`](/api/interfaces/ijbpaymentterminal.md) interface.
