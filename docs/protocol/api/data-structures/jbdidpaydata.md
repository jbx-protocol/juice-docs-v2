# JBDidPayData

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/structs/JBDidPayData.sol

#### Definition

```
/** 
  @member payer The address from which the payment originated.
  @member projectId The ID of the project for which the payment was made.
  @member currentFundingCycleConfiguration The configuration of the funding cycle during which the payment is being made.
  @member amount The amount of the payment. Includes the token being paid, the value, the number of decimals included, and the currency of the amount.
  @member projectTokenCount The number of project tokens minted for the beneficiary.
  @member beneficiary The address to which the tokens were minted.
  @member preferClaimedTokens A flag indicating whether the request prefered to mint project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract.
  @member memo The memo that is being emitted alongside the payment.
  @member metadata Extra data to send to the delegate.
*/
struct JBDidPayData {
  address payer;
  uint256 projectId;
  uint256 currentFundingCycleConfiguration;
  JBTokenAmount amount;
  uint256 projectTokenCount;
  address beneficiary;
  bool preferClaimedTokens;
  string memo;
  bytes metadata;
}
```

* `payer` is the address from which the payment originated.
* `projectId` is the ID of the project for which the payment was made.
* `currentFundingCycleConfiguration` is the configuration of the funding cycle during which the payment is being made.
* `amount` is the amount of the payment. Includes the token being paid, the value, the number of decimals included, and the currency of the amount.
* `projectTokenCount` is the number of project tokens minted for the beneficiary.
* `beneficiary` is the address to which the tokens were minted.
* `preferClaimedTokens` is a flag indicating whether the request prefered to mint project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract.
* `memo` is the memo that is being emitted alongside the payment.
* `metadata` is extra data to send to the delegate.