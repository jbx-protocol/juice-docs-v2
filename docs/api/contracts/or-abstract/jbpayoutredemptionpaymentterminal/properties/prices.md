# prices

Contract: [`JBPayoutRedemptionPaymentTerminal`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPayoutRedemptionPaymentTerminal`](/api/interfaces/ijbpayoutredemptionpaymentterminal.md)

**The contract that exposes price feeds.**

# Definition

```
/**
  @notice
  The contract that exposes price feeds.
*/
IJBPrices public immutable override prices;
```

* The value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBPayoutRedemptionPaymentTerminal`](/api/interfaces/ijbpayoutredemptionpaymentterminal.md) interface.
