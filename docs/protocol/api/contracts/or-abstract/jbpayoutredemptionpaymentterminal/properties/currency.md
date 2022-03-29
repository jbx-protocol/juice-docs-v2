# decimals

Contract: [`JBPayoutRedemptionPaymentTerminal`](/protocol/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPaymentTerminal`](/protocol/api/interfaces/ijbpaymentterminal.md)

**The currency to use when resolving price feeds for this terminal.**

# Definition

```solidity
/**
  @notice
  The currency to use when resolving price feeds for this terminal.
*/
uint256 public immutable override currency;
```

* The value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBPaymentTerminal`](/protocol/api/interfaces/ijbpaymentterminal.md) interface.
