# Pay

Emitted from:

* [`pay`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/pay.md)

#### Definition

```
event Pay(
  uint256 indexed fundingCycleConfiguration,
  uint256 indexed fundingCycleNumber,
  uint256 indexed projectId,
  address payer,
  address beneficiary,
  uint256 amount,
  uint256 beneficiaryTokenCount,
  string memo,
  bytes metadata,
  address caller
);
```

* `fundingCycleConfiguration` is the funding cycle configuration during which the payment was made.
* `fundingCycleNumber` is the number of the funding cycle during which the payment was made.
* `projectId` is the ID of the project that was paid.
* `payer` is the address that paid. 
* `beneficiary` is the address that was specified to receive benefits from the payment, such as the project's tokens.
* `amount` is the amount of tokens that was paid.
* `beneficiaryTokenCount` is the amount of the project's tokens that were issued to the beneficiary as a result of the payment made.
* `memo` is a note that was attached.
* `metadata` is extra data sent to the data source, delegate, and emitted event, if provided.
* `caller` is the address that issued the transaction within which the event was emitted.
