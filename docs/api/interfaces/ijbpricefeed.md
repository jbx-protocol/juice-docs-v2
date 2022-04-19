# IJBPriceFeed

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/interfaces/IJBPriceFeed.sol

#### Definition

```
interface IJBPriceFeed {
  function currentPrice(uint256 _targetDecimals) external view returns (uint256);
}
```