# JBSingleTokenPaymentTerminal

_Generic terminal managing all inflows and outflows of funds into the protocol ecosystem._

#### Traits

`abstract`
#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/abstract/JBPayoutRedemptionPaymentTerminal.sol


#### Interfaces

| Name                                             | Description                                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBSingleTokenPaymentTerminal`**](/dev/api/interfaces/ijbpayoutredemptionpaymentterminal.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                                  | Description                                                                                                                              |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`ERC165`**](https://docs.openzeppelin.com/contracts/2.x/dev/api/introspection#ERC165)                            |  Introspection on interface adherance.                      |


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

* `_token` is the token that this terminal manages.
* `_decimals` is the number of decimals the token fixed point amounts are expected to have.
* `_currency` is the currency that this terminal's token adheres to for price feeds. From [`JBCurrencies`](/dev/api/libraries/jbcurrencies.md).

#### Properties

| Function                                                                  | Definition                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`token`**](/dev/api/contracts/or-payment-terminals/or-abstract/jbsingletokenpaymentterminal/properties/token.md)                                        | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>address token</code></li></ul> |
| [**`decimals`**](/dev/api/contracts/or-payment-terminals/or-abstract/jbsingletokenpaymentterminal/properties/decimals.md)                                        | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 decimals</code></li></ul> |
| [**`currency`**](/dev/api/contracts/or-payment-terminals/or-abstract/jbsingletokenpaymentterminal/properties/currency.md)                                        | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 currency</code></li></ul> |

#### Read

| Function                                   | Definition                                                                                                                                                                                                                            |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`acceptsToken`**](/dev/api/contracts/or-payment-terminals/or-abstract/jbsingletokenpaymentterminal/read/acceptstoken.md) | <p><strong>Params</strong></p><ul><li><code>address _token</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool flag</code></li></ul>                                                                        |
| [**`decimalsForToken`**](/dev/api/contracts/or-payment-terminals/or-abstract/jbsingletokenpaymentterminal/read/decimalsfortoken.md)     | <p><strong>Params</strong></p><ul><li><code>address _token</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 decimals</code></li></ul> |
| [**`currencyForToken`**](/dev/api/contracts/or-payment-terminals/or-abstract/jbsingletokenpaymentterminal/read/currencyfortoken.md)     | <p><strong>Params</strong></p><ul><li><code>address _token</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 currency</code></li></ul> |
| [**`supportsInterface`**](/dev/api/contracts/or-payment-terminals/or-abstract/jbsingletokenpaymentterminal/read/supportsinterface.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _interfaceId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool</code></li></ul> |
