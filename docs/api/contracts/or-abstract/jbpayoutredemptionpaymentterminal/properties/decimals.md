# decimals

Contract: [`JBPayoutRedemptionPaymentTerminal`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPaymentTerminal`](/api/interfaces/ijbpaymentterminal.md)

**The number of decimals the token fixed point amounts are expected to have.**

# Definition

```solidity
/**
  @notice
  The number of decimals the token fixed point amounts are expected to have.
*/
uint256 public immutable override decimals;
```

* The value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBPaymentTerminal`](/api/interfaces/ijbpaymentterminal.md) interface.
