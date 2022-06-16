# IJBFundingCycleBallot

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/interfaces/IJBFundingCycleBallot.sol

#### Definition

```
interface IJBFundingCycleBallot is IERC165  {
  function duration() external view returns (uint256);

  function stateOf(
    uint256 _projectId,
    uint256 _configuration,
    uint256 _start
  ) external view returns (JBBallotState);
}
```
