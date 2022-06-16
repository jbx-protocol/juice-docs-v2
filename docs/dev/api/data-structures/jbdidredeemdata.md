# JBDidRedeemData

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/structs/JBDidRedeemData.sol

#### Definition

```
/** 
  @member holder The holder of the tokens being redeemed.
  @member projectId The ID of the project with which the redeemed tokens are associated.
  @member currentFundingCycleConfiguration The configuration of the funding cycle during which the redemption is being made.
  @member projectTokenCount The number of project tokens being redeemed.
  @member reclaimedAmount The amount reclaimed from the treasury. Includes the token being reclaimed, the value, the number of decimals included, and the currency of the amount.
  @member beneficiary The address to which the reclaimed amount will be sent.
  @member memo The memo that is being emitted alongside the redemption.
  @member metadata Extra data to send to the delegate.
*/
struct JBDidRedeemData {
  address holder;
  uint256 projectId;
  uint256 currentFundingCycleConfiguration;
  uint256 projectTokenCount;
  JBTokenAmount reclaimedAmount;
  address payable beneficiary;
  string memo;
  bytes metadata;
}
```

* `holder` is the holder of the tokens being redeemed.
* `projectId` is the ID of the project with which the redeemed tokens are associated.
* `currentFundingCycleConfiguration` is the configuration of the funding cycle during which the redemption is being made.
* `projectTokenCount` is the number of project tokens being redeemed.
* `reclaimedAmount` is the amount reclaimed from the treasury. Includes the token being reclaimed, the value, the number of decimals included, and the currency of the amount.
* `beneficiary` is the address to which the reclaimed amount will be sent.
* `memo` is the memo that is being emitted alongside the redemption.
* `metadata` is extra data to send to the delegate.