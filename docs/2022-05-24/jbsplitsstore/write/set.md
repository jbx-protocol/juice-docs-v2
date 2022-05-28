# set

:::caution
This page describes v2 contracts used before [a bug was identified](/docs/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBSplitsStore`](/protocol/api/contracts/jbsplitsstore/README.md)​‌

Interface: [`IJBSplitsStore`](/protocol/api/interfaces/ijbsplitsstore.md)

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
  uint256 _group,
  JBSplit[] memory _splits
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
  * `_group` is an identifier between of splits being set. All splits within this `_group` must add up to within 100%.
  * `_splits` are the [`JBSplit`](/protocol/api/data-structures/jbsplit.md)s to set.
* Through the [`requirePermissionAllowingOverride`](/protocol/api/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md) modifier, the function is only accessible by the project's owner, from an operator that has been given the [`JBOperations.SET_SPLITS`](/protocol/api/libraries/jboperations.md) permission by the project owner for the provided `_projectId` , or from the current controller of the `_projectId` of the specified.
* The function overrides a function definition from the [`IJBSplitsStore`](/protocol/api/interfaces/ijbsplitsstore.md) interface.
* The function doesn't return anything.

#### Body

1.  Get a reference to the current splits set for the specified project's domain, within the specified group.

    ```
    // Get a reference to the project's current splits.
    JBSplit[] memory _currentSplits = _getStructsFor(_projectId, _domain, _group);
    ```

    _Internal references:_

    * [`_getStructsFor`](/protocol/api/contracts/jbsplitsstore/read/-_getstructsfor.md)
2.  Loop through each current split to make sure the new splits being set respect any current split bound by a lock constraint.

    ```
    // Check to see if all locked splits are included.
    for (uint256 _i = 0; _i < _currentSplits.length; _i++) { ... }
    ```

    1.  If the current split isn't locked, move on to the next one.

        ```
        // If not locked, continue.
        if (block.timestamp >= _currentSplits[_i].lockedUntil) continue;
        ```
    2.  If the current split is locked, check to make sure the new splits includes it. The only property of a locked split that can have changed is its locked deadline, which can be extended.

        ```
        // Keep a reference to whether or not the locked split being iterated on is included.
        bool _includesLocked = false;

        for (uint256 _j = 0; _j < _splits.length; _j++) {
          // Check for sameness.
          if (
            _splits[_j].percent == _currentSplits[_i].percent &&
            _splits[_j].beneficiary == _currentSplits[_i].beneficiary &&
            _splits[_j].allocator == _currentSplits[_i].allocator &&
            _splits[_j].projectId == _currentSplits[_i].projectId &&
            // Allow lock extention.
            _splits[_j].lockedUntil >= _currentSplits[_i].lockedUntil
          ) _includesLocked = true;
        }
        ```
    3.  Check to make sure the provided splits includes any locked current splits.

        ```
        if (!_includesLocked) revert PREVIOUS_LOCKED_SPLITS_NOT_INCLUDED();
        ```
4.  Store a local variable to keep track of all the percents from the splits.

    ```
    // Add up all the percents to make sure they cumulative are under 100%.
    uint256 _percentTotal = 0;
    ```
5.  Loop through each newly provided splits to validate the provided properties.

    ```
    for (uint256 _i = 0; _i < _splits.length; _i++) { ... }
    ```

    1.  Check that the percent for the current split is not zero.

        ```
        // The percent should be greater than 0.
        if (_splits[_i].percent == 0) revert INVALID_SPLIT_PERCENT();
        ```
    2.  Check that the ID of the project for the current split is within the max value that can be packed.

        ```
        // ProjectId should be within a uint56
        if (_splits[_i].projectId > type(uint56).max) revert INVALID_PROJECT_ID();
        ```
    3.  Increment the total percents that have been accumulated so far.

        ```
        // Add to the total percents.
        _percentTotal = _percentTotal + _splits[_i].percent;
        ```
    4.  Make sure the accumulated percents are under 100%.

        ```
        // Validate the total does not exceed the expected value.
        if (_percentTotal > JBConstants.SPLITS_TOTAL_PERCENT) revert INVALID_TOTAL_PERCENT();
        ```

        _Library references:_

        * [`JBConstants`](/protocol/api/libraries/jbconstants.md)
          * `.SPLITS_TOTAL_PERCENT`
    5.  Pack common split properties into a storage slot.

        ```
        // Pack the first split part properties.
        uint256 _packedSplitParts1;
        
        // prefer claimed in bit 0.
        if (_splits[_i].preferClaimed) _packedSplitParts1 = 1;
        // prefer add to balance in bit 1.
        if (_splits[_i].preferAddToBalance) _packedSplitParts1 |= 1 << 1;
        // percent in bits 2-33.
        _packedSplitParts1 |= _splits[_i].percent << 2;
        // projectId in bits 32-89.
        _packedSplitParts1 |= _splits[_i].projectId << 34;
        // beneficiary in bits 90-249.
        _packedSplitParts1 |= uint256(uint160(address(_splits[_i].beneficiary))) << 90;

        // Store the first split part.
        _packedSplitParts1Of[_projectId][_domain][_group][_i] = _packedSplitParts1;
        ```

        _Internal references:_

        * [`_packedSplitParts1Of`](/protocol/api/contracts/jbsplitsstore/properties/-_packedsplitparts1of.md)
    6.  Pack less common split properties into another storage slot if needed. Otherwise, delete any content in storage at the index being iterated on.

       ```
       // If there's data to store in the second packed split part, pack and store.
       if (_splits[_i].lockedUntil > 0 || _splits[_i].allocator != IJBSplitAllocator(address(0))) {
         // Locked until should be within a uint48
         if (_splits[_i].lockedUntil > type(uint48).max) revert INVALID_LOCKED_UNTIL();

          // lockedUntil in bits 0-47.
          uint256 _packedSplitParts2 = uint48(_splits[_i].lockedUntil);
          // allocator in bits 48-207.
          _packedSplitParts2 |= uint256(uint160(address(_splits[_i].allocator))) << 48;

          // Store the second split part.
         _packedSplitParts2Of[_projectId][_domain][_group][_i] = _packedSplitParts2;

         // Otherwise if there's a value stored in the indexed position, delete it.
       } else if (_packedSplitParts2Of[_projectId][_domain][_group][_i] > 0)
         delete _packedSplitParts2Of[_projectId][_domain][_group][_i];
       ```

       _Internal references:_

       * [`_packedSplitParts2Of`](/protocol/api/contracts/jbsplitsstore/properties/-_packedsplitparts2of.md)
    7.  For each added split, emit a `SetSplit` event with all relevant parameters.

        ```
        emit SetSplit(_projectId, _domain, _group, _splits[_i], msg.sender);
        ```

        _Event references:_

        * [`SetSplit`](/protocol/api/contracts/jbsplitsstore/events/setsplit.md)
6.  Store the new array length.

    ```
    // Set the new length of the splits.
    _splitCountOf[_projectId][_domain][_group] = _splits.length;
    ```

    _Internal references:_

    * [`_splitCountOf`](/protocol/api/contracts/jbsplitsstore/properties/-_splitcountof.md)

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
  @param _group An identifier between of splits being set. All splits within this _group must add up to within 100%.
  @param _splits The splits to set.
*/
function set(
  uint256 _projectId,
  uint256 _domain,
  uint256 _group,
  JBSplit[] memory _splits
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
  // Get a reference to the project's current splits.
  JBSplit[] memory _currentSplits = _getStructsFor(_projectId, _domain, _group);

  // Check to see if all locked splits are included.
  for (uint256 _i = 0; _i < _currentSplits.length; _i++) {
    // If not locked, continue.
    if (block.timestamp >= _currentSplits[_i].lockedUntil) continue;

    // Keep a reference to whether or not the locked split being iterated on is included.
    bool _includesLocked = false;

    for (uint256 _j = 0; _j < _splits.length; _j++) {
      // Check for sameness.
      if (
        _splits[_j].percent == _currentSplits[_i].percent &&
        _splits[_j].beneficiary == _currentSplits[_i].beneficiary &&
        _splits[_j].allocator == _currentSplits[_i].allocator &&
        _splits[_j].projectId == _currentSplits[_i].projectId &&
        // Allow lock extention.
        _splits[_j].lockedUntil >= _currentSplits[_i].lockedUntil
      ) _includesLocked = true;
    }

    if (!_includesLocked) revert PREVIOUS_LOCKED_SPLITS_NOT_INCLUDED();
  }

  // Add up all the percents to make sure they cumulative are under 100%.
  uint256 _percentTotal = 0;

  for (uint256 _i = 0; _i < _splits.length; _i++) {
    // The percent should be greater than 0.
    if (_splits[_i].percent == 0) revert INVALID_SPLIT_PERCENT();

    // ProjectId should be within a uint56
    if (_splits[_i].projectId > type(uint56).max) revert INVALID_PROJECT_ID();

    // Add to the total percents.
    _percentTotal = _percentTotal + _splits[_i].percent;

    // Validate the total does not exceed the expected value.
    if (_percentTotal > JBConstants.SPLITS_TOTAL_PERCENT) revert INVALID_TOTAL_PERCENT();

    // Pack the first split part properties.
    uint256 _packedSplitParts1;
    
    // prefer claimed in bit 0.
    if (_splits[_i].preferClaimed) _packedSplitParts1 = 1;
    // prefer add to balance in bit 1.
    if (_splits[_i].preferAddToBalance) _packedSplitParts1 |= 1 << 1;
    // percent in bits 2-33.
    _packedSplitParts1 |= _splits[_i].percent << 2;
    // projectId in bits 32-89.
    _packedSplitParts1 |= _splits[_i].projectId << 34;
    // beneficiary in bits 90-249.
    _packedSplitParts1 |= uint256(uint160(address(_splits[_i].beneficiary))) << 90;

    // Store the first split part.
    _packedSplitParts1Of[_projectId][_domain][_group][_i] = _packedSplitParts1;

    // If there's data to store in the second packed split part, pack and store.
    if (_splits[_i].lockedUntil > 0 || _splits[_i].allocator != IJBSplitAllocator(address(0))) {
      // Locked until should be within a uint48
      if (_splits[_i].lockedUntil > type(uint48).max) revert INVALID_LOCKED_UNTIL();

      // lockedUntil in bits 0-47.
      uint256 _packedSplitParts2 = uint48(_splits[_i].lockedUntil);
      // allocator in bits 48-207.
      _packedSplitParts2 |= uint256(uint160(address(_splits[_i].allocator))) << 48;

      // Store the second split part.
      _packedSplitParts2Of[_projectId][_domain][_group][_i] = _packedSplitParts2;

      // Otherwise if there's a value stored in the indexed position, delete it.
    } else if (_packedSplitParts2Of[_projectId][_domain][_group][_i] > 0)
      delete _packedSplitParts2Of[_projectId][_domain][_group][_i];

    emit SetSplit(_projectId, _domain, _group, _splits[_i], msg.sender);
  }

  // Set the new length of the splits.
  _splitCountOf[_projectId][_domain][_group] = _splits.length;
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                                       | Description                                                                     |
| -------------------------------------------- | ------------------------------------------------------------------------------- |
| **`PREVIOUS_LOCKED_SPLITS_NOT_INCLUDED`**    | Thrown if the splits that are being set override some splits that are locked.   |
| **`INVALID_PROJECT_ID`**                     | Thrown if the split has a project ID that wont fit in its packed storage slot.  |
| **`INVALID_SPLIT_PERCENT`**                  | Thrown if the split has specified a percent of 0.                               |
| **`INVALID_TOTAL_PERCENT`**                  | Thrown if the split percents add up more than 100%.                             |
| **`INVALID_LOCKED_UNTIL`**                   | Thrown if the split has a lockedUntil that wont fit in its packed storage slot. |

</TabItem>

<TabItem value="Events" label="Events">

| Name                                    | Data                                                                                                                                                                                                                 |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`SetSplit`**](/protocol/api/contracts/jbsplitsstore/events/setsplit.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed domain</code></li><li><code>uint256 indexed group</code></li><li><code>[JBSplit](/protocol/api/data-structures/jbsplit.md) split</code></li><li><code>address caller</code></li></ul> |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
