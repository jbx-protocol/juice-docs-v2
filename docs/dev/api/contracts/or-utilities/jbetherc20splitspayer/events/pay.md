# Pay

Emitted from:

* [`pay`](/dev/api/contracts/or-utilities/jbetherc20splitspayer/write/pay.md)

#### Definition

```
event Pay(
  uint256 indexed projectId,
  address beneficiary,
  address token,
  uint256 amount,
  uint256 decimals,
  uint256 leftoverAmount,
  uint256 minReturnedTokens,
  bool preferClaimedTokens,
  string memo,
  bytes metadata,
  address caller
);
```

* `projectId` is the ID of the project who received any leftover funds after splits were paid out.
* `beneficiary` is the address that received the project's tokens, or recieved the leftover funds if there was no project ID. 
* `token` is the token that was paid.
* `amount` is the amount that was paid, as a fixed point number.
* `decimals` is the amount of decimals in the amount.
* `leftoverAmount` is the amount leftover after all splits were paid. 
* `minReturnedTokens` is the minimum amount of project tokens expected when paying the project any leftover amount. 
* `preferClaimedTokens` is a flag indicating if the project tokens resulting from paying the project with leftover funds should be claimed into the beneficiary's wallet.
* `memo` is the memo that was forwarded with the payment.
* `metadata` is the metadata that was forwarded with the payment.
* `caller` is the address that issued the transaction within which the event was emitted.
