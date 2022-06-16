# DeployProjectPayer

Emitted from:

* [`deploySplitsPayer`](/dev/api/contracts/or-utilities/jbetherc20splitspayerdeployer/write/deploysplitspayer.md)

#### Definition

```
event DeploySplitsPayer(
  IJBSplitsPayer indexed splitsPayer,
  uint256 defaultSplitsProjectId,
  uint256 defaultSplitsDomain,
  uint256 defaultSplitsGroup,
  IJBSplitsStore splitsStore,
  uint256 defaultProjectId,
  address defaultBeneficiary,
  bool defaultPreferClaimedTokens,
  string defaultMemo,
  bytes defaultMetadata,
  bool preferAddToBalance,
  address owner,
  address caller
);
```

* `splitsPayer` is the address of the splits payer contract that was deployed. 
* `defaultSplitsProjectId` is the project ID to use when looking up splits to distribute between when receiving payments. 
* `defaultSplitsDomain` is the domain to use when looking up splits to distribute between when receiving payments. 
* `defaultSplitsGroup` is the group to use when looking up splits to distribute between when receiving payments. 
* `splitsStore` is a contract that stores splits for each project.
* `defaultProjectId` is the ID of the project whose treasury should be forwarded the split payer contract's received payment leftovers after settling splits.
* `defaultBeneficiary` is the address that'll receive the project's tokens.
* `defaultPreferClaimedTokens` is a flag indicating whether issued tokens should be automatically claimed into the beneficiary's wallet.
* `defaultMemo` is the memo that'll be passed along to the emitted event.
* `defaultMetadata` are bytes to send along to the project's data source and delegate, if provided.
* `preferAddToBalance` is a flag indicating if received payments should be forwarded to the project's `addToBalance` function or `pay` function. 
* `_owner` is the address that owns the project payer contract.
* `caller` is the address that issued the transaction within which the event was emitted.
