# IJBFundingCycleDataSource

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/interfaces/IJBFundingCycleDataSource.sol

#### Definition

```
interface IJBFundingCycleDataSource is IERC165 {
  function payParams(JBPayParamsData calldata _data)
    external
    returns (
      uint256 weight,
      string memory memo,
      IJBPayDelegate delegate
    );

  function redeemParams(JBRedeemParamsData calldata _data)
    external
    returns (
      uint256 reclaimAmount,
      string memory memo,
      IJBRedemptionDelegate delegate
    );
}
```
