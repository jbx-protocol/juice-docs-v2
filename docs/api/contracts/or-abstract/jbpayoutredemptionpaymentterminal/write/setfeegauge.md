# setFeeGauge

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPayoutRedemptionPaymentTerminal`](/api/interfaces/ijbpayoutredemptionpaymentterminal.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Allows the fee gauge to be updated.**

_Only the owner of this contract can change the fee gauge._

_If the fee gauge reverts when called upon while a project is attempting to distribute its funds, a project's funds will be locked. This is a known risk._

#### Definition

```
function setFeeGauge(IJBFeeGauge _feeGauge) external virtual override onlyOwner { ... }
```

* Arguments:
  * `_feeGauge` is the new fee gauge.
* Through the [`onlyOwner`](https://docs.openzeppelin.com/contracts/4.x/api/ownership#Ownable-onlyOwner--) modifier, the function can only be accessed by the owner of this contract.
* The function can be overriden by inheriting contracts.
* The function doesn't return anything.

#### Body

1.  Store the new fee gauge.

    ```
    // Store the new fee gauge.
    feeGauge = _feeGauge;
    ```
2.  Emit a `SetFeeGauge` event with the relevant parameters.

    ```
    emit SetFeeGauge(_feeGauge, msg.sender);
    ```

    _Event references:_

    * [`SetFeeGauge`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/setfeegauge.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Allows the fee gauge to be updated.

  @dev
  Only the owner of this contract can change the fee gauge.

  @dev
  If the fee gauge reverts when called upon while a project is attempting to distribute its funds, a project's funds will be locked. This is a known risk.

  @param _feeGauge The new fee gauge.
*/
function setFeeGauge(IJBFeeGauge _feeGauge) external virtual override onlyOwner {
  // Store the new fee gauge.
  feeGauge = _feeGauge;

  emit SetFeeGauge(_feeGauge, msg.sender);
}
```

</TabItem>

<TabItem value="Events" label="Events">

| Name                                          | Data                                                                                                                                                    |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`SetFeeGauge`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/setfeegauge.md) | <ul><li><code>[IJBFeeGauge](/api/interfaces/ijbfeegauge.md)indexed feeGauge</code></li><li><code>address caller</code></li></ul> |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
