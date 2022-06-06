# JBFundingCycleMetadata

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/structs/JBFundingCycleMetadata.sol

#### Definition

```
/** 
  @member global Data used globally in non-migratable ecosystem contracts.
  @member reservedRate The reserved rate of the funding cycle. This number is a percentage calculated out of `JBConstants.MAX_RESERVED_RATE`.
  @member redemptionRate The redemption rate of the funding cycle. This number is a percentage calculated out of `JBConstants.MAX_REDEMPTION_RATE`.
  @member ballotRedemptionRate The redemption rate to use during an active ballot of the funding cycle. This number is a percentage calculated out of `JBConstants.MAX_REDEMPTION_RATE`.
  @member pausePay A flag indicating if the pay functionality should be paused during the funding cycle.
  @member pauseDistributions A flag indicating if the distribute functionality should be paused during the funding cycle.
  @member pauseRedeem A flag indicating if the redeem functionality should be paused during the funding cycle.
  @member pauseBurn A flag indicating if the burn functionality should be paused during the funding cycle.
  @member allowMinting A flag indicating if the mint functionality should be allowed during the funding cycle.
  @member allowChangeToken A flag indicating if changing tokens should be allowed during this funding cycle.
  @member allowTerminalMigration A flag indicating if migrating terminals should be allowed during this funding cycle.
  @member allowControllerMigration A flag indicating if migrating controllers should be allowed during this funding cycle.
  @member holdFees A flag indicating if fees should be held during this funding cycle.
  @member useTotalOverflowForRedemptions A flag indicating if redemptions should use the project's balance held in all terminals instead of the project's local terminal balance from which the redemption is being fulfilled.
  @member useDataSourceForPay A flag indicating if the data source should be used for pay transactions during this funding cycle.
  @member useDataSourceForRedeem A flag indicating if the data source should be used for redeem transactions during this funding cycle.
  @member dataSource The data source to use during this funding cycle.
*/
struct JBFundingCycleMetadata {
  JBGlobalFundingCycleMetadata global;
  uint256 reservedRate;
  uint256 redemptionRate;
  uint256 ballotRedemptionRate;
  bool pausePay;
  bool pauseDistributions;
  bool pauseRedeem;
  bool pauseBurn;
  bool allowMinting;
  bool allowChangeToken;
  bool allowTerminalMigration;
  bool allowControllerMigration;
  bool holdFees;
  bool useTotalOverflowForRedemptions;
  bool useDataSourceForPay;
  bool useDataSourceForRedeem;
  address dataSource;
}
```

* `global` is data used globally in non-migratable ecosystem contracts.
* `reservedRate` is the reserved rate of the funding cycle. This number is a percentage calculated out of [`JBConstants.MAX_RESERVED_RATE`](/protocol/api/libraries/jbconstants.md).
* `redemptionRate` is the redemption rate of the funding cycle. This number is a percentage calculated out of [`JBConstants.MAX_REDEMPTION_RATE`](/protocol/api/libraries/jbconstants.md).
* `ballotRedemptionRate` is the redemption rate to use during an active ballot of the funding cycle. This number is a percentage calculated out of [`JBConstants.MAX_REDEMPTION_RATE`](/protocol/api/libraries/jbconstants.md).
* `pausePay` is a flag indicating if the pay functionality should be paused during the funding cycle.
* `pauseDistributions` is a flag indicating if the distribute functionality should be paused during the funding cycle.
* `pauseRedeem` is a flag indicating if the redeem functionality should be paused during the funding cycle.
* `pauseBurn` is a flag indicating if the burn functionality should be paused during the funding cycle.
* `allowMinting` is a flag indicating if the mint functionality should be allowed during the funding cycle.
* `allowChangeToken` is a flag indicating if changing tokens should be allowed during this funding cycle.
* `allowTerminalMigration` is a flag indicating if migrating terminals should be allowed during this funding cycle.
* `allowControllerMigration` is a flag indicating if migrating controllers should be allowed during this funding cycle.
* `holdFees` is a flag indicating if fees should be held during this funding cycle.
* `useTotalOverflowForRedemptions` is a flag indicating if redemptions should use the project's balance held in all terminals instead of the project's local terminal balance from which the redemption is being fulfilled.
* `useDataSourceForPay` is a flag indicating if the data source should be used for pay transactions during this funding cycle.
* `useDataSourceForRedeem` is a flag indicating if the data source should be used for redeem transactions during this funding cycle.
* `dataSource` is the data source to use during this funding cycle.