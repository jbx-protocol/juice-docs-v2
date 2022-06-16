# setMetadataOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBProjects`](/dev/api/contracts/jbprojects/README.md)

Interface: [`IJBProjects`](/dev/api/interfaces/ijbprojects.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Allows a project owner to set the project's metadata content for a particular domain namespace.**

_Only a project's owner or operator can set its metadata._

_Applications can use the domain namespace as they wish._

#### Definition

```
function setMetadataOf(uint256 _projectId, JBProjectMetadata calldata _metadata)
  external
  override
  requirePermission(ownerOf(_projectId), _projectId, JBOperations.SET_METADATA) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project who's metadata is being changed.
  * `_metadata` is the struct containing metadata content, and domain within which the metadata applies.
* Through the [`requirePermission`](/dev/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md) modifier, the function is only accessible by the project's owner, or from an operator that has been given the [`JBOperations.SET_METADATA`](/dev/api/libraries/jboperations.md) permission by the project owner for the provided `_projectId`.
* The function overrides a function definition from the [`IJBProjects`](/dev/api/interfaces/ijbprojects.md) interface.
* The function doesn't return anything.

#### Body

1.  Store the project's new metadata content within the specified domain.

    ```
    // Set the project's new metadata content within the specified domain.
    metadataContentOf[_projectId][_metadata.domain] = _metadata.content;
    ```

    _Internal references:_

    * [`metadataContentOf`](/dev/api/contracts/jbprojects/properties/metadatacontentof.md)
2.  Emit a `SetMetadataCid` event with the relevant parameters.

    ```
    emit SetMetadata(_projectId, _metadata, msg.sender);
    ```

    _Event references:_

    * [`SetMetadata`](/dev/api/contracts/jbprojects/events/setmetadata.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice 
  Allows a project owner to set the project's metadata content for a particular domain namespace. 

  @dev 
  Only a project's owner or operator can set its metadata.

  @dev 
  Applications can use the domain namespace as they wish.

  @param _projectId The ID of the project who's metadata is being changed.
  @param _metadata A struct containing metadata content, and domain within which the metadata applies. 
*/
function setMetadataOf(uint256 _projectId, JBProjectMetadata calldata _metadata)
  external
  override
  requirePermission(ownerOf(_projectId), _projectId, JBOperations.SET_METADATA)
{
  // Set the project's new metadata content within the specified domain.
  metadataContentOf[_projectId][_metadata.domain] = _metadata.content;

  emit SetMetadata(_projectId, _metadata, msg.sender);
}
```

</TabItem>

<TabItem value="Events" label="Events">

| Name                                             | Data                                                                                                                                        |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`SetMetadata`**](/dev/api/contracts/jbprojects/events/setmetadata.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>[JBProjectMetadata](/dev/api/data-structures/jbprojectmetadata.md) metadata</code></li><li><code>address caller</code></li></ul>                                                                                                         |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
