# _transferFrom

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/api/contracts/or-payment-terminals/jberc20paymentterminal/)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Transfers tokens.**

# Definition

```
function _transferFrom(
  address,
  address payable _to,
  uint256 _amount
) internal override { ...}
```

* Arguments:
  * `_from` is the address from which the transfer should originate.
  * `_to` is the address to which the transfer should go.
  * `_amount` is the amount of the transfer, as a fixed point number with the same number of decimals as this terminal.
* The resulting function is internal to this contract and its inheriters.
* The resulting function overrides a function definition from the [`IJBPayoutRedemptionPaymentTerminal`](/api/interfaces/ijbpayoutredemptionpaymentterminal.md) interface.

#### Body

1.  Send the ERC20. If the specified sender is this contract, use the transfer transaction that doesn't require pre-approval. Otherwise, transfer from the specified address.

    ```
     _from == address(this)
      ? IERC20(token).transfer(_to, _amount)
      : IERC20(token).transferFrom(_from, _to, _amount);
    ```

    _External references:_

    * [`transfer`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-Transfer-address-address-uint256-)
    * [`transferFrom`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-transferFrom-address-address-uint256-)


</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice
  Transfers tokens.

  @param _from The address from which the transfer should originate.
  @param _to The address to which the transfer should go.
  @param _amount The amount of the transfer, as a fixed point number with the same number of decimals as this terminal.
*/
function _transferFrom(
  address _from,
  address payable _to,
  uint256 _amount
) internal override {
  _from == address(this)
    ? IERC20(token).transfer(_to, _amount)
    : IERC20(token).transferFrom(_from, _to, _amount);
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
