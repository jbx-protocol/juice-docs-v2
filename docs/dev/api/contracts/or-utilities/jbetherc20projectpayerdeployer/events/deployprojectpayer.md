# DeployProjectPayer

Emitted from:

* [`deployProjectPayer`](/dev/api/contracts/or-utilities/jbetherc20projectpayerdeployer/write/deployprojectpayer.md)

#### Definition

```
event DeployProjectPayer(
  IJBProjectPayer indexed projectPayer,
  uint256 defaultProjectId,
  address defaultBeneficiary,
  bool defaultPreferClaimedTokens,
  string defaultMemo,
  bytes defaultMetadata,
  bool preferAddToBalance,
  IJBDirectory directory,
  address owner,
  address caller
);
```

* `projectPayer` is the address of the project payer contract that was deployed. 
* `defaultProjectId` is the ID of the project whose treasury should be forwarded the project payer contract's received payments.
* `defaultBeneficiary` is the address that'll receive the project's tokens.
* `defaultPreferClaimedTokens` is a flag indicating whether issued tokens should be automatically claimed into the beneficiary's wallet.
* `defaultMemo` is the memo that'll be passed along to the emitted event.
* `defaultMetadata` are bytes to send along to the project's data source and delegate, if provided.
* `preferAddToBalance` is a flag indicating if received payments should be forwarded to the project's `addToBalance` function or `pay` function. 
* `directory` is the [`IJBDirectory`](/dev/api/interfaces/ijbdirectory.md) contract storing directories of terminals and controllers for each project.
* `_owner` is the address that owns the project payer contract.
* `caller` is the address that issued the transaction within which the event was emitted.
