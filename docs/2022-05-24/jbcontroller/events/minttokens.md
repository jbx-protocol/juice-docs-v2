# MintTokens

:::caution
This page describes v2 contracts used before [a bug was identified](/docs/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

Emitted from:

* [`mintTokensOf`](/protocol/api/contracts/or-controllers/jbcontroller/write/minttokensof.md)

#### Definition

```
event MintTokens(
  address indexed beneficiary,
  uint256 indexed projectId,
  uint256 tokenCount,
  uint256 beneficiaryTokenCount,
  string memo,
  uint256 reservedRate,
  address caller
);
```

* `beneficiary` is the address to which the tokens were minted.
* `projectId` is the ID of the token's project.
* `tokenCount` is the number of tokens that were minted in total, counting however many were reserved.
* `beneficiaryTokenCount` is the number of tokens that were minted for the beneficiary.
* `memo` is a note that was attached.
* `reservedRate` is the project's current reserved rate.
* `caller` is the address that issued the transaction within which the event was emitted.
