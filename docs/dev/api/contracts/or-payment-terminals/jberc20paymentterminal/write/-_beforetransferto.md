# _beforeTransferTo

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/dev/api/contracts/or-payment-terminals/jberc20paymentterminal/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Logic to be triggered before transferring tokens from this terminal.**

#### Definition

```
function _beforeTransferTo(address, uint256) internal override { ...}
```

* Arguments:
  * `_to` is the address to which the transfer is going.
  * `_amount` is the amount of the transfer, as a fixed point number with the same number of decimals as this terminal.
* The resulting function is internal to this contract and its inheriters.
* The resulting function overrides a function definition from the [`IJBPayoutRedemptionPaymentTerminal`](/dev/api/interfaces/ijbpayoutredemptionpaymentterminal.md) interface.

#### Body

1.  Before transferring tokens to another address, approve that address to pull the specified amount of tokens from this contract.

    ```
    IERC20(token).approve(_to, _amount);
    ```

    _External references:_

    * [`approve`](https://docs.openzeppelin.com/contracts/4.x/dev/api/token/erc20#IERC20-approve-address-uint256-)


</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice
  Logic to be triggered before transferring tokens from this terminal.

  @param _to The address to which the transfer is going.
  @param _amount The amount of the transfer, as a fixed point number with the same number of decimals as this terminal.
*/
function _beforeTransferTo(address _to, uint256 _amount) internal override {
  IERC20(token).approve(_to, _amount);
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
