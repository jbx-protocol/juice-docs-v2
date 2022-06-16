# _processedTokenTrackerOf

Contract: [`JBController`](/dev/api/contracts/or-controllers/jbcontroller/README.md)​‌

**The difference between the processed token tracker of a project and the project's token's total supply is the amount of tokens that still need to have reserves minted against them.**

#### Definition

```
/**
  @notice
  The difference between the processed token tracker of a project and the project's token's total supply is the amount of tokens that still need to have reserves minted against them.

  _projectId The ID of the project to get the tracker of.
*/
mapping(uint256 => int256) internal _processedTokenTrackerOf;
```

* Arguments:
  * `_projectId` is the ID of the project to get the tracker of.
* The resulting function is internal to this contract and its inheriters. 
