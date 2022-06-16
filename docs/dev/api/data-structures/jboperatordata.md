# JBOperatorData

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/structs/JBGroupedSplits.sol

#### Definition

```
/** 
  @member operator The address of the operator.
  @member domain The domain within which the operator is being given permissions. A domain of 0 is a wildcard domain, which gives an operator access to all domains.
  @member permissionIndexes The indexes of the permissions the operator is being given.
*/
struct JBOperatorData {
  address operator;
  uint256 domain;
  uint256[] permissionIndexes;
}
```

* `operator` is the address of the operator.
* `domain` is the domain within which the operator is being given permissions. A domain of 0 is a wildcard domain, which gives an operator access to all domains.
* `permissionIndexes` are the indexes of the permissions the operator is being given.