# set

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBSplitsStore`](/api/contracts/jbsplitsstore/README.md)​‌

Interface: [`IJBSplitsStore`](/api/interfaces/ijbsplitsstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Sets a project's splits.**

_Only the owner or operator of a project, or the current controller contract of the project, can set its splits._

_The new splits must include any currently set splits that are locked._

#### Definition

```
function set(
  uint256 _projectId,
  uint256 _domain,
  JBGroupedSplits[] calldata _groupedSplits
)
  external
  override
  requirePermissionAllowingOverride(
      projects.ownerOf(_projectId),
      _projectId,
      JBOperations.SET_SPLITS,
      address(directory.controllerOf(_projectId)) == msg.sender
  ) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project for which splits are being added.
  * `_domain` is an identifier within which the splits should be considered active.
  * `_groupedSplits` An array of splits to set for any number of groups. 
* Through the [`requirePermissionAllowingOverride`](/api/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md) modifier, the function is only accessible by the project's owner, from an operator that has been given the [`JBOperations.SET_SPLITS`](/api/libraries/jboperations.md) permission by the project owner for the provided `_projectId` , or from the current controller of the `_projectId` of the specified.
* The function overrides a function definition from the [`IJBSplitsStore`](/api/interfaces/ijbsplitsstore.md) interface.
* The function doesn't return anything.

#### Body

1.  Loop through each grouped split and set it.

    ```
    // Push array length in stack
    uint256 _groupedSplitsLength = _groupedSplits.length;

    // Set each grouped splits.
    for (uint256 _i = 0; _i < _groupedSplitsLength; ) {
      // Get a reference to the grouped split being iterated on.
      JBGroupedSplits memory _groupedSplit = _groupedSplits[_i];

      // Set the splits for the group.
      _set(_projectId, _domain, _groupedSplit.group, _groupedSplit.splits);

      unchecked {
        ++_i;
      }
    }
    ```

    _Internal references:_

    * [`_set`](/api/contracts/jbsplitsstore/write/-_set.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  Sets a project's splits.

  @dev
  Only the owner or operator of a project, or the current controller contract of the project, can set its splits.

  @dev
  The new splits must include any currently set splits that are locked.

  @param _projectId The ID of the project for which splits are being added.
  @param _domain An identifier within which the splits should be considered active.
  @param _groupedSplits An array of splits to set for any number of groups. 
*/
function set(
  uint256 _projectId,
  uint256 _domain,
  JBGroupedSplits[] calldata _groupedSplits
)
  external
  override
  requirePermissionAllowingOverride(
    projects.ownerOf(_projectId),
    _projectId,
    JBOperations.SET_SPLITS,
    address(directory.controllerOf(_projectId)) == msg.sender
  )
{
  // Push array length in stack
  uint256 _groupedSplitsLength = _groupedSplits.length;

  // Set each grouped splits.
  for (uint256 _i = 0; _i < _groupedSplitsLength; ) {
    // Get a reference to the grouped split being iterated on.
    JBGroupedSplits memory _groupedSplit = _groupedSplits[_i];

    // Set the splits for the group.
    _set(_projectId, _domain, _groupedSplit.group, _groupedSplit.splits);

    unchecked {
      ++_i;
    }
  }
}
```

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
