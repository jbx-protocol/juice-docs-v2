# distributePayoutsOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBSingleTokenPaymentTerminalStore`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

Interface: [`IJBPayoutRedemptionPaymentTerminal`](/dev/api/interfaces/ijbpayoutredemptionpaymentterminal.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Distributes payouts for a project with the distribution limit of its current funding cycle.**

_Payouts are sent to the preprogrammed splits. Any leftover is sent to the project's owner._

_Anyone can distribute payouts on a project's behalf. The project can preconfigure a wildcard split that is used to send funds to msg.sender. This can be used to incentivize calling this function._

_All funds distributed outside of this contract or any feeless terminals incure the protocol fee._ 

#### Definition

```
function distributePayoutsOf(
  uint256 _projectId,
  uint256 _amount,
  uint256 _currency,
  address _token,
  uint256 _minReturnedTokens,
  string calldata _memo
) external virtual override returns (uint256 netLeftoverDistributionAmount) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project having its payouts distributed.
  * `_amount` is the amount of terminal tokens to distribute, as a fixed point number with same number of decimals as this terminal.
  * `_currency` is the expected currency of the amount being distributed. Must match the project's current funding cycle's distribution limit currency.
  * `_token` is the token being distributed. This terminal ignores this property since it only manages one token.
  * `_minReturnedTokens` is the minimum number of terminal tokens that the `_amount` should be valued at in terms of this terminal's currency, as a fixed point number with the same number of decimals as this terminal.
  * `_memo` is a memo to pass along to the emitted event.
* The function can be accessed externally by anyone.
* The function can be overriden by inheriting contracts.
* The resulting function overrides a function definition from the [`IJBPayoutRedemptionPaymentTerminal`](/dev/api/interfaces/ijbpayoutredemptionpaymentterminal.md) interface.
* The function returns the amount that was sent to the project owner, as a fixed point number with the same amount of decimals as this terminal.

#### Body

1.  Forward to the internal function.

    ```
    return _distributePayoutsOf(_projectId, _amount, _currency, _minReturnedTokens, _memo);
    ```

    _Internal references:_

    * [`_distributePayoutsOf`](/dev/api/contracts/or-payment-terminals/or-abstract/jbpayoutredemptionpaymentterminal/write/-_distributepayoutsof.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Distributes payouts for a project with the distribution limit of its current funding cycle.

  @dev
  Payouts are sent to the preprogrammed splits. Any leftover is sent to the project's owner.

  @dev
  Anyone can distribute payouts on a project's behalf. The project can preconfigure a wildcard split that is used to send funds to msg.sender. This can be used to incentivize calling this function.

  @dev
  All funds distributed outside of this contract or any feeless terminals incure the protocol fee.

  @param _projectId The ID of the project having its payouts distributed.
  @param _amount The amount of terminal tokens to distribute, as a fixed point number with same number of decimals as this terminal.
  @param _currency The expected currency of the amount being distributed. Must match the project's current funding cycle's distribution limit currency.
  @param _token The token being distributed. This terminal ignores this property since it only manages one token.
  @param _minReturnedTokens The minimum number of terminal tokens that the `_amount` should be valued at in terms of this terminal's currency, as a fixed point number with the same number of decimals as this terminal.
  @param _memo A memo to pass along to the emitted event.

  @return netLeftoverDistributionAmount The amount that was sent to the project owner, as a fixed point number with the same amount of decimals as this terminal.
*/
function distributePayoutsOf(
  uint256 _projectId,
  uint256 _amount,
  uint256 _currency,
  address _token,
  uint256 _minReturnedTokens,
  string calldata _memo
) external virtual override returns (uint256 netLeftoverDistributionAmount) {
  _token; // Prevents unused var compiler and natspec complaints.
  return _distributePayoutsOf(_projectId, _amount, _currency, _minReturnedTokens, _memo);
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
