# ticketBooth

Contract: [`JBV1TokenPaymentTerminal`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/README.md)​‌

Interface: [`IJBV1TokenPaymentTerminal`](/dev/api/interfaces/ijbv1tokenpaymentterminal.md)

**The V1 contract where token balances are stored.**

#### Definition

```
/**
  @notice
  The V1 contract where token balances are stored.
*/
ITicketBooth public immutable override ticketBooth;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBV1TokenPaymentTerminal`](/dev/api/interfaces/ijbv1tokenpaymentterminal.md) interface.