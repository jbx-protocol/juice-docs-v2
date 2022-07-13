# totalSupply

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBToken`](/dev/api/contracts/jbtoken/README.md)​‌

Interface: [`IJBToken`](/dev/api/interfaces/ijbtoken.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**The total supply of this ERC20.**

#### Definition

```
function totalSupply(uint256) external view override returns (uint256) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to which the token belongs. This is ignored.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IJBToken`](/dev/api/interfaces/ijbtoken.md) interface.
* The function returns the total supply of this ERC20, as a fixed point number with 18 decimals.

#### Body

1.  Forward the call to the ERC20 implementation.

    ```
    return super.totalSupply();
    ```

    _Inherited references:_

    * [`totalSupply`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-totalSupply--)

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice
  The total supply of this ERC20.
  
  @param _projectId the ID of the project to which the token belongs. This is ignored.

  @return The total supply of this ERC20, as a fixed point number with 18 decimals.
*/
function totalSupply(uint256 _projectId) external view override returns (uint256) {
  _projectId; // Prevents unused var compiler and natspec complaints.

  return super.totalSupply();
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
