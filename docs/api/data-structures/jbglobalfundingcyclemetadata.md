# JBGlobalFundingCycleMetadata

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/structs/JBGlobalFundingCycleMetadata.sol

#### Definition

```
/** 
  @member allowSetTerminals A flag indicating if setting terminals should be allowed during this funding cycle.
  @member allowSetController A flag indicating if setting a new controller should be allowed during this funding cycle.
*/
struct JBGlobalFundingCycleMetadata {
  bool allowSetTerminals;
  bool allowSetController;
}

```

* `allowSetTerminals` is a flag indicating if setting terminals should be allowed during this funding cycle.
* `allowSetController` is a flag indicating if setting a new controller should be allowed during this funding cycle.