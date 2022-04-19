# JBFee

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/structs/JBFee.sol

#### Definition

```
struct JBFee {
  // The total amount the fee was taken from, as a fixed point number with the same number of decimals as the terminal in which this struct was created.
  uint256 amount;
  // The percent of the fee.
  uint32 fee;
  // The discount of the fee.
  uint32 feeDiscount;
  // The address that will receive the tokens that are minted as a result of the fee payment.
  address beneficiary;
}
```
