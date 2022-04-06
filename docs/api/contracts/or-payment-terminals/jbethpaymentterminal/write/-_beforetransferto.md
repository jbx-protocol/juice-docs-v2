# _beforeTransferTo

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/api/contracts/or-payment-terminals/jbethpaymentterminal/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Logic to be triggered before transferring tokens from this terminal.**

# Definition

```solidity
function _beforeTransferTo(address, uint256) internal override { ...}
```

* Arguments:
  * `_to` is the address to which the transfer is going. This is ignored.
  * `_amount` is the amount of the transfer, as a fixed point number with the same number of decimals as this terminal. This is ignored.
* The resulting function is internal to this contract and its inheriters.
* The resulting function overrides a function definition from the [`IJBPayoutRedemptionPaymentTerminal`](/api/interfaces/ijbpayoutredemptionpaymentterminal.md) interface.

#### Body

_Empty_


</TabItem>

<TabItem value="Code" label="Code">

```solidity
/** 
  @notice
  Logic to be triggered before transferring tokens from this terminal.

  ignored: _to The address to which the transfer is going.
  ignored: _amount The amount of the transfer, as a fixed point number with the same number of decimals as this terminal.
*/
function _beforeTransferTo(address, uint256) internal override {}
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
