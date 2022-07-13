# decimals

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBToken`](/dev/api/contracts/jbtoken/README.md)​‌

Interface: [`IJBToken`](/dev/api/interfaces/ijbtoken.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**The number of decimals included in the fixed point accounting of this token.**

#### Definition

```
function decimals() public view override(ERC20, IJBToken) returns (uint8) { ... }
```

* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IJBToken`](/dev/api/interfaces/ijbtoken.md) interface.
* The function returns the number of decimals.

#### Body

1.  Forward the call to the ERC20 implementation.

    ```
    return super.decimals();
    ```

    _Inherited references:_

    * [`decimals`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20Detailed-decimals--)

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice
  The number of decimals included in the fixed point accounting of this token.

  @return The number of decimals.
*/
function decimals() public view override(ERC20, IJBToken) returns (uint8) {
  return super.decimals();
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
