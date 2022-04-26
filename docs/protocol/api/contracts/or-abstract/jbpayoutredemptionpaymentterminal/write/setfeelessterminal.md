# setFeelessTerminal

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPayoutRedemptionPaymentTerminal`](/api/interfaces/ijbpayoutredemptionpaymentterminal.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Sets whether projects operating on this terminal can pay projects operating on the specified terminal without incurring a fee.**

_Only the owner of this contract can set terminal's as feeless._

#### Definition

```
function setFeelessTerminal(IJBPaymentTerminal _terminal, bool _flag)
  external
  virtual
  override
  onlyOwner { ... }
```

* Arguments:
  * `_terminal` is the [`IJBPaymentTerminal`](/api/interfaces/ijbpaymentterminal.md) that can be paid towards while still bypassing fees.
  * `_flag` is a flag indicating whether the terminal should be feeless or not.
* Through the [`onlyOwner`](https://docs.openzeppelin.com/contracts/4.x/api/ownership#Ownable-onlyOwner--) modifier, the function can only be accessed by the owner of this contract.
* The function can be overriden by inheriting contracts.
* The function doesn't return anything.

#### Body

1.  Store the flag for the terminal.

    ```
    // Set the flag value.
    isFeelessTerminal[_terminal] = _flag;
    ```

    _Internal references:_

    * [`isFeelessTerminal`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/isfeelessterminal.md)
2.  Emit a `SetFeelessTerminal` event with the relevant parameters.

    ```
    emit SetFeelessTerminal(_terminal, _flag, msg.sender);
    ```

    _Event references:_

    * [`SetFeelessTerminal`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/setfeelessterminal.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Sets whether projects operating on this terminal can pay projects operating on the specified terminal without incurring a fee.

  @dev
  Only the owner of this contract can set terminal's as feeless.

  @param _terminal The terminal that can be paid towards while still bypassing fees.
  @param _flag A flag indicating whether the terminal should be feeless or not.
*/
function setFeelessTerminal(IJBPaymentTerminal _terminal, bool _flag)
  external
  virtual
  override
  onlyOwner
{
  // Set the flag value.
  isFeelessTerminal[_terminal] = _flag;

  emit SetFeelessTerminal(_terminal, _flag, msg.sender);
}
```

</TabItem>

<TabItem value="Events" label="Events">

| Name                                          | Data                                                                                                                                                    |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`SetFeelessTerminal`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/setfeelessterminal.md) | <ul><li><code>[IJBPaymentTerminal](/api/interfaces/ijbpaymentterminal.md) indexed terminal</code></li><li><code>bool indexed flag</code></li><li><code>address caller</code></li></ul> |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
