# _ensNamePartsOf

Contract: [`JBProjectHandles`](/dev/api/contracts/or-utilities/jbprojecthandles/README.md)​‌

**Mapping of project ID to an array of strings that make up an ENS name and its subdomains.**

_["jbx", "dao", "foo"] represents foo.dao.jbx.eth._

#### Definition

```
/** 
  @notice
  Mapping of project ID to an array of strings that make up an ENS name and its subdomains.

  @dev
  ["jbx", "dao", "foo"] represents foo.dao.jbx.eth.

  _projectId The ID of the project to get an ENS name for.
*/
mapping(uint256 => string[]) internal _ensNamePartsOf;
```

* Arguments:
  * `_projectId` is the ID of the project to get an ENS name for.
* The resulting function is internal to this contract and its inheriters. 
