# IJBRedemptionTerminal

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/interfaces/IJBRedemptionTerminal.sol

#### Definition

```
interface IJBRedemptionTerminal {
  function redeemTokensOf(
    address _holder,
    uint256 _projectId,
    uint256 _count,
    address _token,
    uint256 _minReturnedTokens,
    address payable _beneficiary,
    string calldata _memo,
    bytes calldata _metadata
  ) external returns (uint256 reclaimAmount);
}
```
