# JBSplitAllocationData

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/structs/JBSplitAllocationData.sol

#### Definition

```
/** 
  @member token The token being sent to the split allocator.
  @member amount The amount being sent to the split allocator, as a fixed point number.
  @member decimals The number of decimals in the amount.
  @member projectId The project to which the split belongs.
  @member group The group to which the split belongs.
  @member split The split that caused the allocation.
*/
struct JBSplitAllocationData {
  address token;
  uint256 amount;
  uint256 decimals;
  uint256 projectId;
  uint256 group;
  JBSplit split;
}
```

* `token` is the token being sent to the split allocator.
* `amount` is the amount being sent to the split allocator, as a fixed point number.
* `decimals` is the number of decimals in the amount.
* `projectId` is the project to which the split belongs.
* `group` is the group to which the split belongs.
* `split` is the split that caused the allocation.