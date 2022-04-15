# prices

Contract: [`JBPaymentTerminalStore`](/api/contracts/jbpaymentterminalstore/README.md)​‌

Interface: [`JBPaymentTerminalStore`](/api/interfaces/ijbpaymentterminalstore.md)

**The contract that exposes price feeds.**

# Definition

```
/** 
  @notice 
  The contract that exposes price feeds.
*/
IJBPrices public immutable override prices;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`JBPaymentTerminalStore`](/api/interfaces/ijbpaymentterminalstore.md) interface.
