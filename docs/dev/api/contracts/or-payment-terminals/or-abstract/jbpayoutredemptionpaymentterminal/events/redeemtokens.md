# RedeemTokens

Emitted from:

* [`_redeemTokensOf`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/-_redeemtokensof.md)

#### Definition

```
event RedeemTokens(
  uint256 indexed fundingCycleConfiguration,
  uint256 indexed fundingCycleNumber,
  uint256 indexed projectId,
  address holder,
  address beneficiary,
  uint256 tokenCount,
  uint256 reclaimedAmount,
  string memo,
  bytes metadata,
  address caller
);
```

* `fundingCycleConfiguration` is the funding cycle configuration during which tokens were redeemed.
* `fundingCycleNumber` is the number of the funding cycle during which tokens were redeemed.
* `projectId` is the ID of the project whose tokens were redeemed.
* `holder` is the address whose tokens were redeemed.
* `beneficiary` is the address to which any redemption benefits were sent.
* `tokenCount` is the amount of project tokens that were redeemed.
* `reclaimedAmount` is the amount of terminal tokens that were sent to the beneficiary as a result of the redemption.
* `memo` is a note that was attached.
* `metadata` is extra data sent to the data source, delegate, and emitted event, if provided.
* `caller` is the address that issued the transaction within which the event was emitted.
