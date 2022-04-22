# IJBAllowanceTerminal

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/interfaces/IJBAllowanceTerminal.sol

#### Definition

```
interface IJBAllowanceTerminal {
  function useAllowanceOf(
    uint256 _projectId,
    uint256 _amount,
    uint256 _currency,
    address _token,
    uint256 _minReturnedTokens,
    address payable _beneficiary,
    string calldata _memo
  ) external returns (uint256 netDistributedAmount);
}
```
