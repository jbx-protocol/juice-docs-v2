# JBTokenAmount

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/structs/JBTokenAmount.sol

#### Definition

```
/* 
  @member token The token the payment was made in.
  @member value The amount of tokens that was paid, as a fixed point number.
  @member decimals The number of decimals included in the value fixed point number.
  @member currency The expected currency of the value.
**/
struct JBTokenAmount {
  address token;
  uint256 value;
  uint256 decimals;
  uint256 currency;
}
```

* `token` is the token the payment was made in.
* `value` is the amount of tokens that was paid, as a fixed point number.
* `decimals` is the number of decimals included in the value fixed point number.
* `currency` is the expected currency of the value.
