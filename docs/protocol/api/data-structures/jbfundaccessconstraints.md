# JBOverflowAllowance

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/structs/JBFundAccessConstraints.sol

#### Definition

```
/** 
  @member terminal The terminal within which the distribution limit and the overflow allowance applies.
  @member token The token for which the fund access constraints apply.
  @member distributionLimit The amount of the distribution limit, as a fixed point number with the same number of decimals as the terminal within which the limit applies.
  @member distributionLimitCurrency The currency of the distribution limit.
  @member overflowAllowance The amount of the allowance, as a fixed point number with the same number of decimals as the terminal within which the allowance applies.
  @member overflowAllowanceCurrency The currency of the overflow allowance.
*/
struct JBFundAccessConstraints {
  IJBPaymentTerminal terminal;
  address token;
  uint256 distributionLimit;
  uint256 distributionLimitCurrency;
  uint256 overflowAllowance;
  uint256 overflowAllowanceCurrency;
}
```

* `terminal` is the terminal within which the distribution limit and the overflow allowance applies.
* `token` is the token for which the fund access constraints apply.
* `distributionLimit` is the amount of the distribution limit, as a fixed point number with the same number of decimals as the terminal within which the limit applies.
* `distributionLimitCurrency` is the currency of the distribution limit.
* `overflowAllowance` is the amount of the allowance, as a fixed point number with the same number of decimals as the terminal within which the allowance applies.
* `overflowAllowanceCurrency` is the currency of the overflow allowance.