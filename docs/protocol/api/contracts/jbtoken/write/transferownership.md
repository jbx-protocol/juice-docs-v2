# transferOwnership

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBToken`](/protocol/api/contracts/jbtoken/README.md)​‌

Interface: [`IJBToken`](/protocol/api/interfaces/ijbtoken.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Transfer ownership of this contract to another address.**

_Only the owner of this contract can transfer it._

#### Definition

```
 function transferOwnership(uint256, address _newOwner) public virtual override onlyOwner { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to which the token belongs. This is ignored.
  * `_newOwner` is the new owner.
* Through the [`onlyOwner`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--) modifier, this function can only be accessed by the address that owns this contract.
* The function overrides a function definition from the [`IJBToken`](/protocol/api/interfaces/ijbtoken.md) interface.
* The function returns nothing.

#### Body

1.  Forward the call to the inherited version from `Ownable`.

    ```
    return super.transferOwnership(_newOwner);
    ```

    _Inherited references:_

    * [`transferOwnership`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-transferOwnership-address-)

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice
  Transfer ownership of this contract to another address.

  @dev
  Only the owner of this contract can transfer it.

  ignore: _projectId The ID of the project to which the token belongs. This is ignored.
  @param _newOwner The new owner.
*/
function transferOwnership(uint256, address _newOwner) public virtual override onlyOwner {
  return super.transferOwnership(_newOwner);
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
