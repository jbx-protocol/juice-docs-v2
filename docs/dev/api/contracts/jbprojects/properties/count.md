# count

Contract: [`JBProjects`](/dev/api/contracts/jbprojects/README.md)

Interface: [`IJBProjects`](/dev/api/interfaces/ijbprojects.md)

**The number of projects that have been created using this contract.**

_The count is incremented with each new project created. The resulting ERC-721 token ID for each project is the newly incremented `count` value._

#### Definition

```
/** 
  @notice 
  The number of projects that have been created using this contract.

  @dev
  The count is incremented with each new project created. 
  The resulting ERC-721 token ID for each project is the newly incremented count value.
*/
uint256 public override count = 0;
```

* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBProjects`](/dev/api/interfaces/ijbprojects.md) interface.
