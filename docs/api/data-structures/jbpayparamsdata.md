# JBPayParamsData

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/structs/JBPayParamsData.sol

#### Definition

```
/** 
  @member terminal The terminal that is facilitating the payment.
  @member payer The address from which the payment originated.
  @member amount The amount of the payment. Includes the token being paid, the value, the number of decimals included, and the currency of the amount.
  @member projectId The ID of the project being paid.
  @member currentFundingCycleConfiguration The configuration of the funding cycle during which the payment is being made.
  @member beneficiary The specified address that should be the beneficiary of anything that results from the payment.
  @member weight The weight of the funding cycle during which the payment is being made.
  @member reservedRate The reserved rate of the funding cycle during which the payment is being made.
  @member memo The memo that was sent alongside the payment.
  @member metadata Extra data provided by the payer.
*/
struct JBPayParamsData {
  IJBPaymentTerminal terminal;
  address payer;
  JBTokenAmount amount;
  uint256 projectId;
  uint256 currentFundingCycleConfiguration;
  address beneficiary;
  uint256 weight;
  uint256 reservedRate;
  string memo;
  bytes metadata;
}
```

* `terminal` is the terminal that is facilitating the payment.
* `payer` is the address from which the payment originated.
* `amount` is the amount of the payment. Includes the token being paid, the value, the number of decimals included, and the currency of the amount.
* `projectId` is the ID of the project being paid.
* `currentFundingCycleConfiguration` is the configuration of the funding cycle during which the payment is being made.
* `beneficiary` is the specified address that should be the beneficiary of anything that results from the payment.
* `weight` is the weight of the funding cycle during which the payment is being made.
* `reservedRate` is the reserved rate of the funding cycle during which the payment is being made.
* `memo` is the memo that was sent alongside the payment.
* `metadata` is extra data provided by the payer.
