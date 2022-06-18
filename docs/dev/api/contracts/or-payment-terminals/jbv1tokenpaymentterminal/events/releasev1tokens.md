
# ReleaseV1Tokens

Emitted from:

* [`releaseV1TokensOf`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/write/pay.md)

#### Definition

```
event ReleaseV1Tokens(
  uint256 indexed projectId,
  address indexed beneficiary,
  uint256 unclaimedBalance,
  uint256 erc20Balance,
  address caller
);
```

* `projectId` is the ID of the v1 project whose tokens were released.
* `beneficiary` is the address that received the v1 project's tokens. 
* `unclaimedBalance` is the amount of unclaimed tokens this contract had that were transfered to the beneficiary, as a fixed point number with 18 decimals.
* `erc20Balance` is the amount of ERC20 tokens this contract had that were transfered to the beneficiary, as a fixed point number with 18 decimals.
* `caller` is the address that issued the transaction within which the event was emitted.
