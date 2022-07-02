# _addToBalanceOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Receives funds belonging to the specified project.**

#### Definition

```
function _addToBalanceOf(
  uint256 _projectId,
  uint256 _amount,
  bool _shouldRefundHeldFees,
  string memory _memo,
  bytes memory _metadata
) private { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to which the funds received belong.
  * `_amount` is the amount of tokens to add, as a fixed point number with the same number of decimals as this terminal. If this is an ETH terminal, this is ignored and msg.value is used instead.
  * `_shouldRefundHeldFees` is a flag indicating if held fees should be refunded based on the amount being added.
  * `_memo` is a memo to pass along to the emitted event.
  * `_metadata` is extra data to pass along to the emitted event.
* The function is private to this contract.
* The function doesn't return anything.

#### Body

1.  Refund any held fees. This is useful to allow a project to distribute funds from the protocol and subsequently add them back without paying eventually having to pay double fees.

    ```
    // Refund any held fees to make sure the project doesn't pay double for funds going in and out of the protocol.
    uint256 _refundedFees = _shouldRefundHeldFees ? _refundHeldFees(_projectId, _amount) : 0;
    ```

    _Internal references:_

    * [`_refundHeldFees`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/-_refundheldfees.md)
2.  Record the added funds.

    ```
    // Record the added funds with any refunded fees.
    store.recordAddedBalanceFor(_projectId, _amount + _refundedFees);
    ```

    _Internal references:_

    * [`store`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/properties/store.md)

    _External references:_

    * [`recordAddedBalanceFor`](/dev/api/contracts/jbsingletokenpaymentterminalstore/write/recordaddedbalancefor.md)
3.  Emit a `AddToBalance` event with the relevant parameters.

    ```
    emit AddToBalance(_projectId, _amount, _refundedFees, _memo, _metadata, msg.sender);
    ```

    _Event references:_

    * [`AddToBalance`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/events/addtobalance.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Receives funds belonging to the specified project.

  @param _projectId The ID of the project to which the funds received belong.
  @param _amount The amount of tokens to add, as a fixed point number with the same number of decimals as this terminal. If this is an ETH terminal, this is ignored and msg.value is used instead.
  @param _shouldRefundHeldFees A flag indicating if held fees should be refunded based on the amount being added.
  @param _memo A memo to pass along to the emitted event.
  @param _metadata Extra data to pass along to the emitted event.
*/
function _addToBalanceOf(
  uint256 _projectId,
  uint256 _amount,
  bool _shouldRefundHeldFees,
  string memory _memo,
  bytes memory _metadata
) private {
  // Refund any held fees to make sure the project doesn't pay double for funds going in and out of the protocol.
  uint256 _refundedFees = _shouldRefundHeldFees ? _refundHeldFees(_projectId, _amount) : 0;

  // Record the added funds with any refunded fees.
  store.recordAddedBalanceFor(_projectId, _amount + _refundedFees);

  emit AddToBalance(_projectId, _amount, _refundedFees, _memo, _metadata, msg.sender);
}
```

</TabItem>

<TabItem value="Events" label="Events">

| Name                          | Data                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`AddToBalance`**](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/events/addtobalance.md)                       | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 amount</code></li><li><code>uint256 refundedFees</code></li><li><code>string memo</code></li><li><code>address caller</code></li></ul>                                                                                                                                                                                                                                                                                                                               |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
