# projectId

Contract: [`JBNFTRewardDataSource`](/dev/api/contracts/or-data-sources/or-abstract/jbnftrewarddatasource/README.md)​‌

Interface: [`IJBNFTRewardDataSource`](/dev/api/interfaces/ijbnftrewarddatasource.md)

**The ID of the project this NFT should be distributed for.**

#### Definition

```
/**
  @notice
  The ID of the project this NFT should be distributed for.
*/
uint256 public immutable override projectId;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBNFTRewardDataSource`](/dev/api/interfaces/ijbnftrewarddatasource.md) interface.
