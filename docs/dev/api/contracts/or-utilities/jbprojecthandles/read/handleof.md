# handleOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBProjectHandles`](/dev/api/contracts/or-utilities/jbprojecthandles/README.md)​‌

Interface: [`IJBProjectHandles`](/dev/api/interfaces/ijbprojecthandles.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Returns the handle for a project.**

_Requires a TXT record for the `TEXT_KEY` that matches the `_projectId`._

### Definition

```
function handleOf(uint256 _projectId) external view override returns (string memory) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to get the handle of.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IJBProjectHandles`](/dev/api/interfaces/ijbprojecthandles.md) interface.
* The function returns the project's handle.

#### Body

1.  Get the project's ENS name parts.

    ```
    // Get a reference to the project's ENS name parts.
    string[] memory _ensNameParts = _ensNamePartsOf[_projectId];
    ```

    _Internal references:_

    * [`_ensNamePartsOf`](/dev/api/contracts/or-utilities/jbprojecthandles/properties/-_ensnamepartsof.md)

2.  If there are no name parts, there's no handle.

    ```
    // Return empty string if ENS isn't set.
    if (_ensNameParts.length == 0) return '';
    ```

3.  Get the projectId stored in the TEXT record of the ENS node of the stored ENS name.

    ```
    // Find the projectId that the text record of the ENS name is mapped to.
    string memory textRecordProjectId = textResolver.text(_namehash(_ensNameParts), TEXT_KEY);
    ```

    _Internal references:_

    * [`textResolver`](/dev/api/contracts/or-utilities/jbprojecthandles/properties/textresolver.md)
    * [`TEXT_KEY`](/dev/api/contracts/or-utilities/jbprojecthandles/properties/textkey.md)
    * [`_namehash`](/dev/api/contracts/or-utilities/jbprojecthandles/read/-_namehash.md)

    _External references:_

    * [`text`](https://docs.ens.domains/contract-api-reference/publicresolver#get-text-data)

4.  If the project's ID doesn't match the text record, the project has no handle.

    ```
    // Return empty string if text record from ENS name doesn't match projectId.
    if (keccak256(bytes(textRecordProjectId)) != keccak256(bytes(Strings.toString(_projectId))))
      return '';
    ```

    _Library references:_

    * [`Strings`](https://docs.openzeppelin.com/contracts/4.x/api/utils#Strings)<br/>
      * `.toString(...)`

5.  Return a handle formatted from the stored ENS name parts.

    ```
    // Format the handle from the name parts.
    return _formatHandle(_ensNameParts);
    ```

    _Internal references:_

    * [`_formatHandle`](/dev/api/contracts/or-utilities/jbprojecthandles/read/-_formathandle.md)
      
</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  Returns the handle for a project.

  @dev 
  Requires a TXT record for the `TEXT_KEY` that matches the `_projectId`.

  @param _projectId The ID of the project to get the handle of.

  @return The project's handle.
*/
function handleOf(uint256 _projectId) external view override returns (string memory) {
  // Get a reference to the project's ENS name parts.
  string[] memory _ensNameParts = _ensNamePartsOf[_projectId];

  // Return empty string if ENS isn't set.
  if (_ensNameParts.length == 0) return '';

  // Find the projectId that the text record of the ENS name is mapped to.
  string memory textRecordProjectId = textResolver.text(_namehash(_ensNameParts), TEXT_KEY);

  // Return empty string if text record from ENS name doesn't match projectId.
  if (keccak256(bytes(textRecordProjectId)) != keccak256(bytes(Strings.toString(_projectId))))
    return '';

  // Format the handle from the name parts.
  return _formatHandle(_ensNameParts);
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
