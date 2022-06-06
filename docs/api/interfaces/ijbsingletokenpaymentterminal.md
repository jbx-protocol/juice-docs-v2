# IJBSingleTokenPaymentTerminal

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/interfaces/IJBSingleTokenPaymentTerminal.sol

#### Definition

```
interface IJBSingleTokenPaymentTerminal is IJBPaymentTerminal {
  function token() external view returns (address);

  function currency() external view returns (uint256);

  function decimals() external view returns (uint256);
}
```
