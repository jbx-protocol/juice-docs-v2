# requireClaimFor

Contract: [`JBTokenStore`](/api/contracts/jbtokenstore/README.md)​‌

Interface: [`IJBTokenStore`](/api/interfaces/ijbtokenstore.md)

**A flag indicating if tokens are required to be issued as claimed for a particular project.**

#### Definition

```
/**
  @notice
  A flag indicating if tokens are required to be issued as claimed for a particular project.

  _projectId The ID of the project to which the requirement applies.
*/
mapping(uint256 => bool) public override requireClaimFor;
```

* Arguments:
  * `_projectId` is the ID of the project to which the requirement applies.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBTokenStore`](/api/interfaces/ijbtokenstore.md) interface.
