# BurnTokens

:::caution
This page describes v2 contracts used before [a bug was identified](/docs/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

Emitted from:

* [`burnTokensOf`](/protocol/api/contracts/or-controllers/jbcontroller/write/burntokensof.md)

#### Definition

```
event BurnTokens(
  address indexed holder,
  uint256 indexed projectId,
  uint256 tokenCount,
  string memo,
  address caller
);
```

* `holder` is the address from which the tokens were burned.
* `projectId` is the ID of the token's project.
* `tokenCount` is the number of tokens that were burned.
* `memo` is a note that was attached.
* `caller` is the address that issued the transaction within which the event was emitted.
