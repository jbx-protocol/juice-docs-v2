# createFor

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBProjects`](/api/contracts/jbprojects/README.md)

Interface: [`IJBProjects`](/api/interfaces/ijbprojects.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Create a new project for the specified owner, which mints an NFT (ERC-721) into their wallet.**

_Anyone can create a project on an owner's behalf._

#### Definition

```solidity
function createFor(address _owner, JBProjectMetadata calldata _metadata)
  external
  override
  returns (uint256 projectId) { ... }
```

* Arguments:
  * `_owner` is the address that will be the owner of the project.
  * `_metadata` is a struct containing metadata content about the project, and domain within which the metadata applies.
* The function can be accessed externally by anyone.
* The function overrides a function definition from the [`IJBProjects`](/api/interfaces/ijbprojects.md) interface.
* The function returns the token ID of the newly created project.

#### Body

1.  Increment the count. Set it as the project's ID which is the returned value.

    ```solidity
    // Increment the count, which will be used as the ID.
    projectId = ++count;
    ```

    _Internal references:_

    * [`count`](/api/contracts/jbprojects/properties/count.md)
2.  Mint a new NFT token belonging to the owner using the projectId as the tokenId.

    ```solidity
    // Mint the project.
    _safeMint(projectId, count);
    ```

    _Internal references:_

    * [`_safeMint`](https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#ERC721-_safeMint-address-uint256-bytes-)
3.  If metadata was provided (meaning its content is not an empty string), store it for newly created project under the provided domain.

    ```solidity
    // Set the metadata if one was provided.
    if (bytes(_metadata.content).length > 0)
      metadataContentOf[projectId][_metadata.domain] = _metadata.content;
    ```

    _Internal references:_

    * [`metadataContentOf`](/api/contracts/jbprojects/properties/metadatacontentof.md)
4.  Emit a `Create` event with all relevant parameters.

    ```
    emit Create(projectId, _owner, _metadata, msg.sender);
    ```

    _Event references:_

    * [`Create`](/api/contracts/jbprojects/events/create.md)

</TabItem>

<TabItem value="Code" label="Code">

```solidity
/**
  @notice 
  Create a new project for the specified owner, which mints an NFT (ERC-721) into their wallet.

  @dev 
  Anyone can create a project on an owner's behalf.

  @param _owner The address that will be the owner of the project.
  @param _metadata A struct containing metadata content about the project, and domain within which the metadata applies.

  @return projectId The token ID of the newly created project.
*/
function createFor(address _owner, JBProjectMetadata calldata _metadata)
  external
  override
  returns (uint256 projectId)
{
  // Increment the count, which will be used as the ID.
  projectId = ++count;

  // Mint the project.
  _safeMint(_owner, projectId);

  // Set the metadata if one was provided.
  if (bytes(_metadata.content).length > 0)
    metadataContentOf[projectId][_metadata.domain] = _metadata.content;

  emit Create(projectId, _owner, _metadata, msg.sender);
}
```

</TabItem>

<TabItem value="Events" label="Events">

| Name                                | Data                                                                                                                                                                                                                                                  |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
