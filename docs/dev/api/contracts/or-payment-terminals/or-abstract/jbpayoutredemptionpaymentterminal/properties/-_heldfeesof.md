# _heldFeesOf

Contract: [`JBPayoutRedemptionPaymentTerminal`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

**Fees that are being held to be processed later.** 

#### Definition

```
/**
  @notice
  Fees that are being held to be processed later.

  _projectId The ID of the project for which fees are being held.
*/
mapping(uint256 => JBFee[]) private _heldFeesOf;
```

* Arguments:
  * `_projectId` is the ID of the project for which fees are being held.
* The resulting view function is private to this contract.
