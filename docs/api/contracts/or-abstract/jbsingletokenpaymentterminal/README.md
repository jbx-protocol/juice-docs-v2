# JBSingleTokenPaymentTerminal

_Generic terminal managing all inflows and outflows of funds into the protocol ecosystem._

#### Traits

`abstract`
#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/abstract/JBPayoutRedemptionPaymentTerminal.sol


#### Interfaces

| Name                                             | Description                                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBPayoutRedemptionPaymentTerminal`**](/api/interfaces/ijbpayoutredemptionpaymentterminal.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                                  | Description                                                                                                                              |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`ReentrancyGuard`**](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard) | Contract module that helps prevent reentrant calls to a function. |


#### Constructor

```
/**
  @param _token The token that this terminal manages.
  @param _decimals The number of decimals the token fixed point amounts are expected to have.
  @param _currency The currency that this terminal's token adheres to for price feeds.
*/
constructor(
  address _token,
  uint256 _decimals,
  uint256 _currency,
) {
  token = _token;
  decimals = _decimals;
  currency = _currency;
}
```

* **Arguments:**
  * `_token` is the token that this terminal manages.
  * `_decimals` is the number of decimals the token fixed point amounts are expected to have.
  * `_currency` is the currency that this terminal's token adheres to for price feeds. From [`JBCurrencies`](/api/libraries/jbcurrencies.md).

#### Properties

| Function                                                                  | Definition                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`token`**](/api/contracts/or-abstract/jbsingletokenpaymentterminal/properties/token.md)                                        | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>address token</code></li></ul> |
| [**`decimals`**](/api/contracts/or-abstract/jbsingletokenpaymentterminal/properties/decimals.md)                                        | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 decimals</code></li></ul> |
| [**`currency`**](/api/contracts/or-abstract/jbsingletokenpaymentterminal/properties/currency.md)                                        | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 currency</code></li></ul> |

#### Read

| Function                                   | Definition                                                                                                                                                                                                                            |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`acceptsToken`**](/api/contracts/or-abstract/jbsingletokenpaymentterminal/read/acceptstoken.md) | <p><strong>Params</strong></p><ul><li><code>address _token</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool flag</code></li></ul>                                                                        |
| [**`decimalsForToken`**](/api/contracts/or-abstract/jbsingletokenpaymentterminal/read/decimalsfortoken.md)     | <p><strong>Params</strong></p><ul><li><code>address _token</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 decimals</code></li></ul> |
| [**`currencyForToken`**](/api/contracts/or-abstract/jbsingletokenpaymentterminal/read/currencyfortoken.md)     | <p><strong>Params</strong></p><ul><li><code>address _token</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 currency</code></li></ul> |
