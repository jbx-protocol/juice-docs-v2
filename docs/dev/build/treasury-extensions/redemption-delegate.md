# Redemption delegate

Before implementing, learn about delegates [here](/dev/learn/glossary/delegate.md).

#### Specs

A contract can become a treasury redemption delegate by adhering to [`IJBRedemptionDelegate`](/dev/api/interfaces/ijbredemptiondelegate.md):

```
interface IJBRedemptionDelegate {
  function didRedeem(JBDidRedeemData calldata _data) external;
}
```

When extending the redemption functionality with a delegate, the protocol will pass a [`JBDidRedeemData`](/dev/api/data-structures/jbdidredeemdata.md) to the `didRedeem(...)` function:

```
struct JBDidRedeemData {
  address holder;
  uint256 projectId;
  uint256 currentFundingCycleConfiguration;
  uint256 projectTokenCount;
  JBTokenAmount reclaimedAmount;
  address payable beneficiary;
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

The `msg.sender` to the delegate will be the payment terminal that facilitated the redemption. 

In payment terminals based on the [`JBPayoutRedemptionPaymentTerminal`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal), such as [`JBETHPaymentTerminal`](/dev/api/contracts/or-payment-terminals/jbethpaymentterminal/README.md)'s and [`JBERC20PaymentTerminal`](/dev/api/contracts/or-payment-terminals/jberc20paymentterminal/README.md)'s, the redemption delegate hook gets called *before* the reclaimed amount is sent to the redemption beneficiary, but after all internal accounting has been updated.  [View the docs](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/redeemtokensof.md). 

Make sure to only allow trusted contracts to access the `didPay(...)` transaction.

#### Attaching

New delegate contracts should be deployed independently. Once deployed, its address can be returned from a data source hook. See [how to build a data source](/dev/build/treasury-extensions/data-source.md) for more.
