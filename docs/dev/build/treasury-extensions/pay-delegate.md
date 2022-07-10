# Pay delegate

Before implementing, learn about delegates [here](/dev/learn/glossary/delegate.md).
#### Specs

A contract can become a treasury pay delegate by adhering to [`IJBPayDelegate`](/dev/api/interfaces/ijbpaydelegate.md):

```
interface IJBPayDelegate {
  function didPay(JBDidPayData calldata _data) external;
}
```

When extending pay functionality with a delegate, the protocol will pass a [`JBDidPayData`](/dev/api/data-structures/jbdidpaydata.md) to the `didPay(...)` function:

```
struct JBDidPayData {
  address payer;
  uint256 projectId;
  uint256 currentFundingCycleConfiguration;
  JBTokenAmount amount;
  uint256 projectTokenCount;
  address beneficiary;
  bool preferClaimedTokens;
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

The `msg.sender` to the delegate will be the payment terminal that facilitated the payment. 

In payment terminals based on the [`JBPayoutRedemptionPaymentTerminal`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal), such as [`JBETHPaymentTerminal`](/dev/api/contracts/or-payment-terminals/jbethpaymentterminal/README.md)'s and [`JBERC20PaymentTerminal`](/dev/api/contracts/or-payment-terminals/jberc20paymentterminal/README.md)'s, the pay delegate hook gets called *after* the project's tokens have been minted and distributed. [View the docs](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/-_pay.md). 

Make sure to only allow trusted contracts to access the `didPay(...)` transaction.

#### Attaching

New delegate contracts should be deployed independently. Once deployed, its address can be returned from a data source hook. See [how to build a data source](/dev/build/treasury-extensions/data-source.md) for more.

#### Examples

```
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@jbx-protocol/contracts-v2/contracts/interfaces/IJBFundingCycleDataSource.sol';
import '@jbx-protocol/contracts-v2/contracts/interfaces/IJBPayDelegate.sol';
import '@jbx-protocol/contracts-v2/contracts/structs/JBTokenAmount.sol';

contract NFTPayDelegate is ERC721, IJBFundingCycleDataSource, IJBPayDelegate {
  error INVALID_PAYMENT_EVENT();

  IJBDirectory directory;
  uint256 projectId;
  JBTokenAmount contributionThreshold;
  uint256 supply;
  
  // This contract can be used as a funding cycle data source to ensure its didPay function is called once the payment has gone through.
  function payParams(JBPayParamsData calldata _data)
    external
    view
    override
    returns (
      uint256 weight,
      string memory memo,
      IJBPayDelegate delegate
    )
  {
    // Forward the recieved weight and memo, and use this contract as a pay delegate.
    return (_data.weight, _data.memo, IJBPayDelegate(address(this)));
  }
  
  // This is unused but needs to be included to fulfill IJBFundingCycleDataSource.
  function redeemParams(JBRedeemParamsData calldata _data)
    external
    pure
    override
    returns (
      uint256 reclaimAmount,
      string memory memo,
      IJBRedemptionDelegate delegate
    )
  {
    // Return the default values.
    return (_data.reclaimAmount.value, _data.memo, IJBRedemptionDelegate(address(0)));
  }

  constructor(IJBDirectory _directory, uint256 _projectId, JBTokenAmount _contributionThreshold, string calldata _name, string calldata _symbol) ERC721(_name, _symbol) {
    directory = _directory;
    projectId = _projectId;
  },
  
  // Called once the payment has gone through if the project's current funding cycle is using a data source that returns this delegate.
  function didPay(JBDidPayData calldata _data) external override {
    // Make sure the caller is a terminal of the project, and the call is being made on behalf of an interaction with the correct project.
    if (
      !directory.isTerminalOf(projectId, IJBPaymentTerminal(msg.sender)) ||
      _data.projectId != projectId
    ) revert INVALID_PAYMENT_EVENT();

    // Make the contribution is being made in the expected token.
    if (_data.amount.token != contributionThreshold.token) return;

    // Make sure the values use the same number of decimals.
    if (_data.amount.decimals < contributionThreshold.decimals) return;

    // Make sure the threshold is met.
    if (_data.amount.value < contributionThreshold.value) return;

    uint256 _tokenId = ++supply;

    _mint(_data.beneficiary, _tokenId);
  }
}
```
