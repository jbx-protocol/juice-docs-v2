# balanceOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBToken`](/api/contracts/jbtoken/README.md)​‌

Interface: [`IJBToken`](/api/interfaces/ijbtoken.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**An account's balance of this ERC20.**

#### Definition

```
function balanceOf(address _account, uint256) external view override returns (uint256) { ... }
```

* Arguments:
  * `_account` is the account to get a balance of.
  * The `_projectId` parameter is ignored.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IJBToken`](/api/interfaces/ijbtoken.md) interface.
* The function returns the balance of the `_account` of this ERC20, as a fixed point number with 18 decimals.

#### Body

1.  Forward the call to the ERC20 implementation.

    ```
    return super.balanceOf(_account);
    ```

    _Inherited references:_

    * [`balanceOf`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-balanceOf-address-)

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice
  An account's balance of this ERC20.

  @param _account The account to get a balance of.

  @return The balance of the `_account` of this ERC20, as a fixed point number with 18 decimals.
*/
function balanceOf(address _account, uint256) external view override returns (uint256) {
  return super.balanceOf(_account);
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
