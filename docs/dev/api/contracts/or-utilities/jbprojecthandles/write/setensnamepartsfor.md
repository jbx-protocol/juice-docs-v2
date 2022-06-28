# setEnsNamePartsFor

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBProjectHandles`](/dev/api/contracts/or-utilities/jbprojecthandles/README.md)​‌

Interface: [`IJBProjectHandles`](/dev/api/interfaces/ijbprojecthandles.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Associate an ENS name with a project.**

_["jbx", "dao", "foo"] represents foo.dao.jbx.eth._

_Only a project's owner or a designated operator can set its ENS name parts._

#### Definition

```
function setEnsNamePartsFor(uint256 _projectId, string[] memory _parts)
  external
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations2.SET_ENS_NAME_FOR) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to set an ENS handle for.
  * `_parts` is t
* The function can be accessed externally by anyone.
* Through the [`requirePermission`](/dev/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md) modifier, the function is only accessible by the token holder, or from an operator that has been given the [`JBOperations2.SET_ENS_NAME_FOR`](/dev/api/libraries/jboperations2.md) permission by the token holder.
* The resulting function overrides a function definition from the [`IJBProjectHandles`](/dev/api/interfaces/ijbprojecthandles.md) interface.
* The function doesn't return anything.

#### Body

1.  Get a reference to the number of parts there are in the name.

    ```
    // Get a reference to the number of parts are in the ENS name.
    uint256 _partsLength = _parts.length;
    ```

2.  Make sure there are at least some parts that make up the ENS name. 

    ```
    // Make sure there are ens name parts.
    if (_parts.length == 0) revert NO_PARTS();
    ```

3.  Make sure there aren't any empty name parts by looping through each and checking if any of them is an empty string.

    ```
    // Make sure no provided parts are empty.
    for (uint256 _i = 0; _i < _partsLength; ) {
      if (bytes(_parts[_i]).length == 0) revert EMPTY_NAME_PART();
      unchecked {
        ++_i;
      }
    }
    ```

4.  Store the name parts.

    ```
    // Store the parts.
    _ensNamePartsOf[_projectId] = _parts;
    ```

    _Internal references:_

    * [`_ensNamePartsOf`](/dev/api/contracts/or-utilities/jbprojecthandles/properties/-_ensnamepartsof.md)
    
3.  Emit a `SetEnsNameParts` event with the relevant parameters.

    ```
    emit SetEnsNameParts(_projectId, _formatHandle(_parts), _parts, msg.sender);
    ```

    _Event references:_

    * [`SetEnsNameParts`](/dev/api/contracts/or-utilities/jbprojecthandles/events/setensnameparts.md)


</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  Associate an ENS name with a project.

  @dev
  ["jbx", "dao", "foo"] represents foo.dao.jbx.eth.

  @dev
  Only a project's owner or a designated operator can set its ENS name parts.

  @param _projectId The ID of the project to set an ENS handle for.
  @param _parts The parts of the ENS domain to use as the project handle, excluding the trailing .eth.
*/
function setEnsNamePartsFor(uint256 _projectId, string[] memory _parts)
  external
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations2.SET_ENS_NAME_FOR)
{
  // Get a reference to the number of parts are in the ENS name.
  uint256 _partsLength = _parts.length;

  // Make sure there are ens name parts.
  if (_parts.length == 0) revert NO_PARTS();

  // Make sure no provided parts are empty.
  for (uint256 _i = 0; _i < _partsLength; ) {
    if (bytes(_parts[_i]).length == 0) revert EMPTY_NAME_PART();
    unchecked {
      ++_i;
    }
  }

  // Store the parts.
  _ensNamePartsOf[_projectId] = _parts;

  emit SetEnsNameParts(_projectId, _formatHandle(_parts), _parts, msg.sender);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                       | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| **`NO_PARTS`** | Thrown if there are no name parts being set. |
| **`EMPTY_NAME_PART`** | Thrown if at least one of the specified parts is empty. |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
