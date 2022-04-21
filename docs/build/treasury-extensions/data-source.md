# Data source

Before implementing, learn about data sources [here](/learn/glossary/data-source.md).
#### Specs

A contract can become a treasury data source by adhering to [`IJBFundingCycleDataSource`](/api/interfaces/ijbfundingcycledatasource.md):

```
interface IJBFundingCycleDataSource {
  function payParams(JBPayParamsData calldata _data)
    external
    view
    returns (
      uint256 weight,
      string memory memo,
      IJBPayDelegate delegate
    );

  function redeemParams(JBRedeemParamsData calldata _data)
    external
    view
    returns (
      uint256 reclaimAmount,
      string memory memo,
      IJBRedemptionDelegate delegate
    );
}
```

There are two functions that must be implemented, `payParams(...)` and `redeemParams(...)`. Either one can be left empty if the intent is to only extend the treasury's pay functionality or redeem functionality.

##### Pay

When extending the pay functionality with a data source, the protocol will pass a [`JBPayParamsData`](/api/data-structures/jbpayparamsdata.md) to the `payParams(...)` function:

```
struct JBPayParamsData {
  IJBPaymentTerminal terminal;
  address payer;
  JBTokenAmount amount;
  uint256 projectId;
  uint256 weight;
  uint256 reservedRate;
  string memo;
  bytes metadata;
}
```

```
struct JBTokenAmount {
  address token;
  uint256 value;
  uint256 decimals;
  uint256 currency;
}
```

Using these params, the data source's `payParams(...)` function is responsible for either reverting or returning a few bits of information:

* `weight` is a fixed point number with 18 decimals that the protocol can use to base arbitrary calculations on. For example, payment terminals based on the [`JBPayoutRedemptionPaymentTerminal`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal), such as [`JBETHPaymentTerminal`](/api/contracts/or-payment-terminals/jbethpaymentterminal/README.md)'s and [`JBERC20PaymentTerminal`](/api/contracts/or-payment-terminals/jberc20paymentterminal/README.md)'s, use the `weight` to determine how many project tokens to mint when a project receives a payment (see [the calculation](/api/contracts/jbsingletokenpaymentterminalstore/write/recordpaymentfrom.md)). By default, the protocol will use the `weight` of the project's current funding cycle, which is provided to the data source function in `JBPayParamsData.weight`. Increasing the weight will mint more tokens and decreasing the weight will mint fewer tokens, both as a function of the amount paid. Return the `JBPayParamsData.weight` value if no altered functionality is desired.
* `memo` is a string that will get emitted within the [`Pay`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/pay.md) event and sent along to any `delegate` that this function also returns. By default, the protocol will use the `memo` passed in directly by the payer, which is provided to this data source function in `JBPayParamsData.memo`. Return the `JBPayParamsData.memo` value if no altered functionality is desired.
* `delegate` is the address of a contract that adheres to [`IJBPayDelegate`](/api/interfaces/ijbpaydelegate.md) whose `didPay(...)` function will be called once the protocol finishes its standard payment routine. Checkout how to [build a pay delegate](/build/treasury-extensions/pay-delegate.md) for more details. If the same contract is being used as the data source and the pay delegate, return `address(this)`. Return the zero address if no additional functionality is desired.

The `payParams(...)` function can also revert if it's presented with any conditions it does not want to accept payments under. 

##### Redeem
 
When extending the redeem functionality with a data source, the protocol will pass a [`JBRedeemParamsData`](/api/data-structures/jbredeemparamsdata.md) to the `redeemParams(...)` function:

```
struct JBRedeemParamsData {
  IJBPaymentTerminal terminal;
  address holder;
  uint256 projectId;
  uint256 tokenCount;
  uint256 totalSupply;
  uint256 overflow;
  uint256 decimals;
  uint256 currency;
  uint256 reclaimAmount;
  bool useTotalOverflow;
  uint256 redemptionRate;
  uint256 ballotRedemptionRate;
  string memo;
  bytes metadata;
}
```

Using these params, the data source's `redeemParams(...)` function is responsible for either reverting or returning a few bits of information:

* `reclaimAmount` is the amount of tokens the terminal should send out to the redemption beneficiary as a result of burning the amount of tokens specified in `JBRedeemParamsData.tokenCount`, as a fixed point number with the same amount of decimals as `JBRedeemParamsData.decimals`. By default, the protocol will use a recliam amount determined by the standard protocol bonding curve based on the redemption rate the project has configured into its current funding cycle, which is provided to the data source function in `JBRedeemParamsData.reclaimAmount`. Return the `JBRedeemParamsData.reclaimAmount` value if no altered functionality is desired.
* `memo` is a string that will get emitted within the [`RedeemTokens`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/redeemtokens.md) event and sent along to any `delegate` that this function also returns. By default, the protocol will use the `memo` passed in directly by the redeemer, which is provided to this data source function in `JBRedeemParamsData.memo`. Return the `JBRedeemParamsData.memo` value if no altered functionality is desired.
* `delegate` is the address of a contract that adheres to [`IJBRedemptionDelegate`](/api/interfaces/ijbredemptiondelegate.md) whose `didRedeem(...)` function will be called once the protocol finishes its standard redemption routine (but before the reclaimed amount is sent to the beneficiary). Checkout how to [build a redemption delegate](/build/treasury-extensions/redemption-delegate.md) for more details. If the same contract is being used as the data source and the redemption delegate, return `address(this)`. Return the zero address if no additional functionality is desired.

The `redeemParams(...)` function can also revert if it's presented with any conditions it does not want to accept redemptions under. 

### Attaching

A data source contract should be deployed independently. Once deployed, its address can be configured into a project's funding cycle metadata to take effect while that funding cycle is active. Additionally, the metadata's `useDataSourceForPay` and/or `useDataSourceForRedeem` should be set to `true` if the respective data source hook should be referenced by the protocol.
