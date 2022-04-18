# projects

Contract: [`JBPayoutRedemptionPaymentTerminal`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPayoutRedemptionPaymentTerminal`](/api/interfaces/ijbpayoutredemptionpaymentterminal.md)

**The Projects contract which mints ERC-721's that represent project ownership and transfers.**

#### Definition

```
/**
  @notice
  The Projects contract which mints ERC-721's that represent project ownership and transfers.
*/
IJBProjects public immutable override projects;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBPayoutRedemptionPaymentTerminal`](/api/interfaces/ijbpayoutredemptionpaymentterminal.md) interface.
