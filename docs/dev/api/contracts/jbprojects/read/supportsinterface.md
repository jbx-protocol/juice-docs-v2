# supportsInterface

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBETHERC20SplitsPayer`](/dev/api/contracts/or-utilities/jbetherc20splitspayer/README.md)

Interface: [`IERC165`](https://docs.openzeppelin.com/contracts/4.x/api/utils#IERC165)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Indicates if this contract adheres to the specified interface.**

_See {IERC165-supportsInterface}._

### Definition

```
function supportsInterface(bytes4 _interfaceId)
  public
  view
  virtual
  override(IERC165, ERC721)
  returns (bool) { ... }
```

* Arguments:
  * `_interfaceId` is the ID of the interface to check for adherance to.
* The view function can be accessed externally by anyone, and internally within this contract.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IERC165`](https://docs.openzeppelin.com/contracts/4.x/api/utils#IERC165) interface.
* The function returns a flag indicating if this contract adheres to the specified interface.

#### Body

1.  Return true if the provided interface ID is in the list of interfaces this contract adheres to.

    ```
    return
      _interfaceId == type(IJBProjects).interfaceId ||
      _interfaceId == type(IJBOperatable).interfaceId ||
      super.supportsInterface(_interfaceId);
    ```

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Indicates if this contract adheres to the specified interface.

  @dev 
  See {IERC165-supportsInterface}.

  @param _interfaceId The ID of the interface to check for adherance to.
*/
function supportsInterface(bytes4 _interfaceId)
  public
  view
  virtual
  override(IERC165, ERC721)
  returns (bool)
{
  return
    _interfaceId == type(IJBProjects).interfaceId ||
    _interfaceId == type(IJBOperatable).interfaceId ||
    super.supportsInterface(_interfaceId);
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
