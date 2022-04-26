# JBGroupedSplits

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/structs/JBGroupedSplits.sol

#### Definition

```
/** 
  @member group The group indentifier.
  @member splits The splits to associate with the group.
*/
struct JBGroupedSplits {
  uint256 group;
  JBSplit[] splits;
}
```

* `group` is the group indentifier.
* `splits` are the splits to associate with the group.