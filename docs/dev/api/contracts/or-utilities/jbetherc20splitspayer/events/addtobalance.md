# AddToBalance

Emitted from:

* [`addToBalance`](/dev/api/contracts/or-uti
lities/jbetherc20splitspayer/write/addtobalanceof.md)

#### Definition

```
event AddToBalance(
  uint256 indexed projectId,
  address beneficiary,
  address token,
  uint256 amount,
  uint256 decimals,
  uint256 leftoverAmount,
  string memo,
  address caller
);
```

* `projectId` is the ID of the project who received any leftover funds after splits were paid out.
* `beneficiary` is the address that received the project's tokens, or recieved the leftover funds if there was no project ID. 
* `token` is the token that was paid.
* `amount` is the amount that was paid, as a fixed point number.
* `decimals` is the amount of decimals in the amount.
* `leftoverAmount` is the amount leftover after all splits were paid. 
* `memo` is the memo that was forwarded with the payment.
* `caller` is the address that issued the transaction within which the event was emitted.
