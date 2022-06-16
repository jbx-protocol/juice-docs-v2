# tokenURI

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBProjects`](/dev/api/contracts/jbprojects/README.md)​‌

Interface: [`IERC721Metadata`](https://docs.openzeppelin.com/contracts/3.x/dev/api/token/erc721#IERC721Metadata)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Returns the URI where the ERC-721 standard JSON of a project is hosted.**

#### Definition

```
function tokenURI(uint256 _projectId) public view override returns (string memory) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to get a URI of.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IERC721Metadata`](https://docs.openzeppelin.com/contracts/3.x/dev/api/token/erc721#IERC721Metadata) interface.
* The function returns the token URI to use for the provided `_projectId`.

#### Body

1.  Return an empty string if there is no URI resolver set.

    ```
    // If there's no resolver, there's no URI.
    if (tokenUriResolver == IJBTokenUriResolver(address(0))) return '';
    ```

    _Internal references:_

    * [`tokenUriResolver`](/dev/api/contracts/jbprojects/properties/tokenuriresolver.md)
2.  Resolve the URI for the project.

    ```
    // Return the resolved URI.
    return tokenUriResolver.getUri(_projectId);
    ```

    _External references:_

    * [`getUri`](/dev/api/interfaces/ijbtokenuriresolver.md)


</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice 
  Returns the URI where the ERC-721 standard JSON of a project is hosted.

  @param _projectId The ID of the project to get a URI of.

  @return The token URI to use for the provided `_projectId`.
*/
function tokenURI(uint256 _projectId) public view override returns (string memory) {
  // If there's no resolver, there's no URI.
  if (tokenUriResolver == IJBTokenUriResolver(address(0))) return '';

  // Return the resolved URI.
  return tokenUriResolver.getUri(_projectId);
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
