# _namehash

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBProjectHandles`](/dev/api/contracts/or-utilities/jbprojecthandles/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Returns a namehash for an ENS name.**

_See https://eips.ethereum.org/EIPS/eip-137._

### Definition

```
function _namehash(string[] memory _ensNameParts) internal pure returns (bytes32 namehash) { ... }
```

* Arguments:
  * `_ensNameParts` is the parts of an ENS name to hash.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function returns the namehash for an ENS name parts.

#### Body

1.  Encode the trailing "eth" into the hash.

    ```
    // Hash the trailing "eth" suffix.
    namehash = keccak256(abi.encodePacked(namehash, keccak256(abi.encodePacked('eth'))));
    ```

2.  Get the number of parts there are to iterate over.

    ```
    // Get a reference to the number of parts are in the ENS name.
    uint256 _nameLength = _ensNameParts.length;
    ```

3.  Loop through each part, encoding them each into the hash in sequential order from the base name through each subdomain.

    ```
    // Hash each part.
    for (uint256 _i = 0; _i < _nameLength; ) {
      namehash = keccak256(
        abi.encodePacked(namehash, keccak256(abi.encodePacked(_ensNameParts[_i])))
      );
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
  Returns a namehash for an ENS name.

  @dev 
  See https://eips.ethereum.org/EIPS/eip-137.

  @param _ensNameParts The parts of an ENS name to hash.

  @return namehash The namehash for an ENS name parts.
*/
function _namehash(string[] memory _ensNameParts) internal pure returns (bytes32 namehash) {
  // Hash the trailing "eth" suffix.
  namehash = keccak256(abi.encodePacked(namehash, keccak256(abi.encodePacked('eth'))));

  // Get a reference to the number of parts are in the ENS name.
  uint256 _nameLength = _ensNameParts.length;

  // Hash each part.
  for (uint256 _i = 0; _i < _nameLength; ) {
    namehash = keccak256(
      abi.encodePacked(namehash, keccak256(abi.encodePacked(_ensNameParts[_i])))
    );
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
