# SetDefaultValues

Emitted from:

* [`setDefaultValues`](/dev/api/contracts/or-utilities/jbetherc20projectpayer/write/setdefaultvalues.md)

#### Definition

```
event SetDefaultValues(
  uint256 indexed projectId,
  address indexed beneficiary,
  bool preferClaimedTokens,
  string memo,
  bytes metadata,
  bool preferAddToBalance,
  address caller
);
```

* `projectId` is the ID of the project whose treasury should be forwarded this contract's received payments.
* `defaultBeneficiary` is the address that'll receive the project's tokens.
* `defaultPreferClaimedTokens` is a flag indicating whether issued tokens should be automatically claimed into the beneficiary's wallet.
* `defaultMemo` is the memo that'll be passed along to the emitted event.
* `defaultMetadata` are bytes to send along to the project's data source and delegate, if provided.
* `preferAddToBalance` is a flag indicating if received payments should be forwarded to the project's `addToBalance` function or `pay` function. 
* `caller` is the address that issued the transaction within which the event was emitted.
