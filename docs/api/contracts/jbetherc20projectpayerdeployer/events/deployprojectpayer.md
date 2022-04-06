# Create

Emitted from:

* [`deployProjectPayer`](/api/contracts/jbetherc20projectpayerdeployer/write/deployprojectpayer.md)

## Definition

```solidity
event SetDefaultValues(
  uint256 indexed projectId,
  address indexed beneficiary,
  bool preferClaimedTokens,
  string memo,
  bytes metadata,
  address caller
);
```

* `projectId` is the ID of the project whose treasury should be forwarded the project payer contract's received payments.
* `beneficiary` is the address that'll receive the project's tokens.
* `preferClaimedTokens` is a flag indicating whether issued tokens should be automatically claimed into the beneficiary's wallet.
* `memo` is the memo that'll be passed along to the emitted event.
* `metadata` are bytes to send along to the project's data source and delegate, if provided.
* `caller` is the address that issued the transaction within which the event was emitted.
