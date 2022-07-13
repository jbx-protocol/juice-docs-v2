# setDefaultSplits

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBETHERC20SplitsPayer`](/dev/api/contracts/or-utilities/jbetherc20splitspayer/README.md)

Interface: [`IJBSplitsPayer`](/dev/api/interfaces/ijbsplitspayer.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Sets the location of the splits that payments this contract receives will be split between.**

#### Definition

```
function setDefaultSplits(
  uint256 _projectId,
  uint256 _domain,
  uint256 _group
) external virtual override onlyOwner { ... }
```

* Arguments:
  * `_projectId` is the ID of project for which the default splits are stored. 
  * `_domain` is the domain within which the default splits are stored. 
  * `_group` is the group within which the default splits are stored. 
* Through the [`onlyOwner`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--) modifier, this function can only be accessed by the address that owns this contract.
* The function can be overriden by inheriting contracts.
* The function overrides a function definition from the [`IJBSplitsPayer`](/dev/api/interfaces/ijbsplitspayer.md) interface.
* The function doesn't return anything.

#### Body

1.  Set the default splits project ID if it has changed.

    ```
    // Set the default splits project ID if it's changing.
    if (_projectId != defaultSplitsProjectId) defaultSplitsProjectId = _projectId;
    ```

    _Internal references:_

    * [`defaultSplitsProjectId`](/dev/api/contracts/or-utilities/jbetherc20splitspayer/properties/defaultsplitsprojectid.md)
2.  Set the default splits domain if it has changed.

    ```
    // Set the default splits domain if it's changing.
    if (_domain != defaultSplitsDomain) defaultSplitsDomain = _domain;
    ```

    _Internal references:_

    * [`defaultSplitsDomain`](/dev/api/contracts/or-utilities/jbetherc20splitspayer/properties/defaultsplitsdomain.md)
3.  Set the default splits group if it has changed.

    ```
    // Set the default splits group if it's changing.
    if (_group != defaultSplitsGroup) defaultSplitsGroup = _group;
    ```

    _Internal references:_

    * [`defaultSplitsGroup`](/dev/api/contracts/or-utilities/jbetherc20splitspayer/properties/defaultsplitsgroup.md)
6.  Emit a `SetDefaultSplits` event with all relevant parameters.

    ```
    emit SetDefaultSplits(_projectId, _domain, _group, msg.sender);
    ```

    _Event references:_

    * [`SetDefaultSplits`](/dev/api/contracts/or-utilities/jbetherc20splitspayer/events/setdefaultsplits.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice
  Sets the location of the splits that payments this contract receives will be split between.

  @param _projectId The ID of project for which the default splits are stored. 
  @param _domain The domain within which the default splits are stored. 
  @param _group The group within which the default splits are stored. 
*/
function setDefaultSplits(
  uint256 _projectId,
  uint256 _domain,
  uint256 _group
) external virtual override onlyOwner {
  // Set the default splits project ID if it's changing.
  if (_projectId != defaultSplitsProjectId) defaultSplitsProjectId = _projectId;

  // Set the default splits domain if it's changing.
  if (_domain != defaultSplitsDomain) defaultSplitsDomain = _domain;

  // Set the default splits group if it's changing.
  if (_group != defaultSplitsGroup) defaultSplitsGroup = _group;

  emit SetDefaultSplits(_projectId, _domain, _group, msg.sender);
}
```

</TabItem>

<TabItem value="Events" label="Events">

| Name                                | Data                                                                                                                                                                                                                                                  |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`SetDefaultSplits`**](/dev/api/contracts/or-utilities/jbetherc20splitspayer/events/setdefaultsplits.md)                                                                          | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed domain</code></li><li><code>uint256 indexed group</code></li><li><code>address caller</code></li></ul>                  |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
