# Redemption delegate

Before implementing, learn about delegates [here](/learn/glossary/delegate.md).
#### Specs

A contract can become a treasury redemption delegate by adhering to [`IJBRedemptionDelegate`](/api/interfaces/ijbredemptiondelegate.md):

```
interface IJBRedemptionDelegate {
  function didRedeem(JBDidRedeemData calldata _data) external;
}
```

When extending the redemption functionality with a delegate, the protocol will pass a [`JBDidRedeemData`](/api/data-structures/jbdidredeemdata.md) to the `didRedeem(...)` function:

```
struct JBDidRedeemData {
  address holder;
  uint256 projectId;
  uint256 projectTokenCount;
  JBTokenAmount reclaimedAmount;
  address payable beneficiary;
  string memo;
  bytes metadata;
}
```

```
struct JBTokenAmount {
  // The token the payment was made in.
  address token;
  // The amount of tokens that was paid, as a fixed point number.
  uint256 value;
  // The number of decimals included in the value fixed point number.
  uint256 decimals;
  // The expected currency of the value.
  uint256 currency;
}
```

The `msg.sender` to the delegate will be the payment terminal that facilitated the redemption. 

In payment terminals based on the [`JBPayoutRedemptionPaymentTerminal`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal), such as [`JBETHPaymentTerminal`](/api/contracts/or-payment-terminals/jbethpaymentterminal/README.md)'s and [`JBERC20PaymentTerminal`](/api/contracts/or-payment-terminals/jberc20paymentterminal/README.md)'s, the redemption delegate hook gets called _before_ the reclaimed amount is sent to the redemption beneficiary, but after all internal accounting has been updated.  [View the docs](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/redeemtokensof.md). 

Make sure to only allow trusted contracts to access the `didPay(...)` transaction.

#### Attaching

A delegate contract should be deployed independently. Once deployed, its address can be returned from a data source hook. See [how to build a data source](/build/treasury-extensions/data-source.md) for more.
