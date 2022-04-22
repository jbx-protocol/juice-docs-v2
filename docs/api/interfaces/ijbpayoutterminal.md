# IJBPayoutTerminal

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/interfaces/IJBPayoutTerminal.sol

#### Definition

```
interface IJBPayoutTerminal {
  function distributePayoutsOf(
    uint256 _projectId,
    uint256 _amount,
    uint256 _currency,
    address _token,
    uint256 _minReturnedTokens,
    string calldata _memo
  ) external returns (uint256 netLeftoverDistributionAmount);
}
```
