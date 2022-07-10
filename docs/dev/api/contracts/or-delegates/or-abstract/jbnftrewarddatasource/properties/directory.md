# directory

Contract: [`JBNFTRewardDataSource`](/dev/api/contracts/or-delegates/or-abstract/jbnftrewarddatasource/README.md)​‌

Interface: [`IJBNFTRewardDataSource`](/dev/api/interfaces/ijbnftrewarddatasource.md)

**The directory of terminals and controllers for projects.**

#### Definition

```
/** 
  @notice 
  The directory of terminals and controllers for projects.
*/ 
IJBDirectory public immutable override directory;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBNFTRewardDataSource`](/dev/api/interfaces/ijbnftrewarddatasource.md) interface.
