# JBFee

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/structs/JBFee.sol

#### Definition

```
/** 
  @member amount The total amount the fee was taken from, as a fixed point number with the same number of decimals as the terminal in which this struct was created.
  @member fee The percent of the fee, out of MAX_FEE.
  @member feeDiscount The discount of the fee.
  @member beneficiary The address that will receive the tokens that are minted as a result of the fee payment.
*/
struct JBFee {
  uint256 amount;
  uint32 fee;
  uint32 feeDiscount;
  address beneficiary;
}
```

* `amount` is the total amount the fee was taken from, as a fixed point number with the same number of decimals as the terminal in which this struct was created.
* `fee` is the percent of the fee, out of [`JBConstants.MAX_FEE`](/protocol/api/libraries/jbconstants.md).
* `feeDiscount` is the discount of the fee.
* `beneficiary` is the address that will receive the tokens that are minted as a result of the fee payment.