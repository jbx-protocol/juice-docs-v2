# mint

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBToken`](/api/contracts/jbtoken/README.md)​‌

Interface: [`IJBToken`](/api/interfaces/ijbtoken.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Mints more of the token.**

_Only the owner of this contract cant mint more of it._

#### Definition

```
function mint(
  uint256,
  address _account,
  uint256 _amount
) external override onlyOwner { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to which the token belongs. This is ignored.
  * `_account` is the account to mint the tokens for.
  * `_amount` is the amount of tokens to mint, as a fixed point number with 18 decimals.
* Through the [`onlyOwner`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--) modifier, this function can only be accessed by the address that owns this contract.
* The function overrides a function definition from the [`IJBToken`](/api/interfaces/ijbtoken.md) interface.
* The function doesn't return anything.

#### Body

1.  Forward the call to the ERC20 implementation.

    ```
    return _mint(_account, _amount);
    ```

    _Inherited references:_

    * [`_mint`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20-_mint-address-uint256-)

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice
  Mints more of the token.

  @dev
  Only the owner of this contract cant mint more of it.

  _projectId The ID of the project to which the token belongs. This is ignored.
  @param _account The account to mint the tokens for.
  @param _amount The amount of tokens to mint, as a fixed point number with 18 decimals.
*/
function mint(
  uint256,
  address _account,
  uint256 _amount
) external override onlyOwner {
  return _mint(_account, _amount);
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
