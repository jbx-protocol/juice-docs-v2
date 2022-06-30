# _formatHandle

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBProjectHandles`](/dev/api/contracts/or-utilities/jbprojecthandles/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Formats ENS name parts into a handle.**

_Requires a TXT record for the `TEXT_KEY` that matches the `_projectId`._

### Definition

```
function _formatHandle(string[] memory _ensNameParts)
  internal
  pure
  returns (string memory _handle) { ... }
```

* Arguments:
  * `_ensNameParts` is the ENS name parts to format into a handle.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function returns the formatted ENS handle.

#### Body

1.  Get the number of parts there are to iterate over.

    ```
    // Get a reference to the number of parts are in the ENS name.
    uint256 _partsLength = _ensNameParts.length;
    ```

2.  Loop through each part, adding the the part first so subdomains show up in order. Add a dot to seperate each subdomain.

    ```
    // Concatenate each name part.
    for (uint256 _i = 1; _i <= _partsLength; ) {
      _handle = string(abi.encodePacked(_handle, _ensNameParts[_partsLength - _i]));

      // Add a dot if this part isn't the last.
      if (_i < _partsLength) _handle = string(abi.encodePacked(_handle, '.'));

      unchecked {
        ++_i;
      }
    }
    ```

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  Formats ENS name parts into a handle.

  @param _ensNameParts The ENS name parts to format into a handle.

  @return _handle The formatted ENS handle.
*/
function _formatHandle(string[] memory _ensNameParts)
  internal
  pure
  returns (string memory _handle)
{
  // Get a reference to the number of parts are in the ENS name.
  uint256 _partsLength = _ensNameParts.length;

  // Concatenate each name part.
  for (uint256 _i = 1; _i <= _partsLength; ) {
    _handle = string(abi.encodePacked(_handle, _ensNameParts[_partsLength - _i]));

    // Add a dot if this part isn't the last.
    if (_i < _partsLength) _handle = string(abi.encodePacked(_handle, '.'));

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
