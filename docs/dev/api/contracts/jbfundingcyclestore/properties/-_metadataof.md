# _metadataOf

Contract: [`JBFundingCycleStore`](/dev/api/contracts/jbfundingcyclestore/README.md)​‌

**Stores the metadata for each funding cycle configuration, packed into one storage slot.**

#### Definition

```
/** 
  @notice
  Stores the metadata for each funding cycle configuration, packed into one storage slot.

  _projectId The ID of the project to get metadata of.
  _configuration The funding cycle configuration to get metadata of.
*/
mapping(uint256 => mapping(uint256 => uint256)) private _metadataOf;
```

* Arguments:
  * `_projectId` is the ID of the project to get metadata of.
  * `_configuration` is the funding cycle configuration to get metadata of.
* The resulting view function is private to this contract.
