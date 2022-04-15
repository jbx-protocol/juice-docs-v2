# _distributeToPayoutSplitsOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Pays out splits for a project's funding cycle configuration.**

#### Definition

```
function _distributeToPayoutSplitsOf(
  uint256 _projectId,
  uint256 _domain,
  uint256 _group,
  uint256 _amount,
  uint256 _feeDiscount
) private returns (uint256 leftoverAmount, uint256 feeEligibleDistributionAmount) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project for which payout splits are being distributed.
  * `_domain` is the domain of the splits to distribute the payout between.
  * `_group` is the group of the splits to distribute the payout between.
  * `_amount` is the total amount being distributed.
  * `_feeDiscount` is the amount of discount to apply to the fee, out of the MAX_FEE.
* The function is private to this contract.
* The function returns: the leftover amount if the splits don't add up to 100%
* The function returns:
  * `leftoverAmount` is leftover amount if the splits don't add up to 100%.
  * `feeEligibleDistributionAmount` is the amount distributed to splits from which fees can be taken.

#### Body

1.  Save the passed in amount as the leftover amount that will be returned. The subsequent routine will decrement the leftover amount as splits are settled.

    ```
    // Set the leftover amount to the initial amount.
    leftoverAmount = _amount;
    ```

2.  Get a reference to payout splits for the current funding cycle configuration of the project.

    ```
    // Get a reference to the project's payout splits.
    JBSplit[] memory _splits = splitsStore.splitsOf(_projectId, _domain, _group);
    ```

    _External references:_

    * [`splitsOf`](/api/contracts/jbsplitsstore/read/splitsof.md)
3.  Loop through each split.

    ```
    // Transfer between all splits.
    for (uint256 _i = 0; _i < _splits.length; _i++) { ... }
    ```

    1.  Get a reference to the current split being iterated on.

        ```
        // Get a reference to the mod being iterated on.
        JBSplit memory _split = _splits[_i];
        ```
    2.  Get a reference to the payout amount that should be sent to the current split. This amount is the total amount multiplied by the percentage of the split, which is a number out of 10000000.

        ```
        // The amount to send towards mods.
        uint256 _payoutAmount = PRBMath.mulDiv(
          _amount,
          _split.percent,
          JBConstants.SPLITS_TOTAL_PERCENT
        );
        ```

        _Libraries used:_

        * [`PRBMath`](https://github.com/hifi-finance/prb-math/blob/main/contracts/PRBMath.sol)
          * `.mulDiv(...)`
        * [`JBConstants`](/api/libraries/jbconstants.md)
          * `.SPLITS_TOTAL_PERCENT`
    3.  If there's at least some funds to send to the payout, determine where they should go, making sure to only debit a fee if the funds are leaving this contract and not going to a feeless terminal. If the split has an `allocator` set, send the funds to its `allocate` function, passing along any relevant params. Otherwise if a `projectId` is specified in the split, send the payout to that project. Add to the project's balance if the split has a preference to do so, otherwise send a payment and use the split's `beneficiary` as the address that should receive the project's tokens in return, or use the message sender if a beneficiary wasn't provided. If no project was specified, send the funds directly to the `beneficiary` address from the split if one was provided. If the split didn't give any routing information, send the amount to the messag sender. Decrement the `leftoverAmount` once the split is settled.

        ```
        if (_payoutAmount > 0) {
          // Transfer tokens to the split.
          // If there's an allocator set, transfer to its `allocate` function.
          if (_split.allocator != IJBSplitAllocator(address(0))) {
            _netPayoutAmount = _feeDiscount == JBConstants.MAX_FEE_DISCOUNT
              ? _payoutAmount
              : _payoutAmount - _feeAmount(_payoutAmount, _feeDiscount);

            // This distribution is eligible for a fee since the funds are leaving the ecosystem.
            feeEligibleDistributionAmount += _payoutAmount;

            // Trigger any inherited pre-transfer logic.
            _beforeTransferTo(address(_split.allocator), _netPayoutAmount);

            // If this terminal's token is ETH, send it in msg.value.
            uint256 _payableValue = token == JBTokens.ETH ? _netPayoutAmount : 0;

            // Create the data to send to the allocator.
            JBSplitAllocationData memory _data = JBSplitAllocationData(
              token,
              _netPayoutAmount,
              decimals,
              _projectId,
              _group,
              _split
            );

            // Trigger the allocator's `allocate` function.
            _split.allocator.allocate{value: _payableValue}(_data);

            // Otherwise, if a project is specified, make a payment to it.
          } else if (_split.projectId != 0) {
            // Get a reference to the Juicebox terminal being used.
            IJBPaymentTerminal _terminal = directory.primaryTerminalOf(_split.projectId, token);

            // The project must have a terminal to send funds to.
            if (_terminal == IJBPaymentTerminal(address(0))) revert TERMINAL_IN_SPLIT_ZERO_ADDRESS();

            // Save gas if this contract is being used as the terminal.
            if (_terminal == this) {
              // This distribution does not incur a fee.
              _netPayoutAmount = _payoutAmount;

              // Add to balance if prefered.
              if (_split.preferAddToBalance) _addToBalanceOf(_split.projectId, _netPayoutAmount, '');
              else
                _pay(
                  _netPayoutAmount,
                  address(this),
                  _split.projectId,
                  (_split.beneficiary != address(0)) ? _split.beneficiary : msg.sender,
                  0,
                  _split.preferClaimed,
                  '',
                  bytes('')
                );
            } else {
              // If the terminal is set as feeless, this distribution is not eligible for a fee.
              if (isFeelessTerminal[_terminal])
                _netPayoutAmount = _payoutAmount;
                // This distribution is eligible for a fee since the funds are leaving this contract and the terminal isn't listed as feeless.
              else {
                _netPayoutAmount = _feeDiscount == JBConstants.MAX_FEE_DISCOUNT
                  ? _payoutAmount
                  : _payoutAmount - _feeAmount(_payoutAmount, _feeDiscount);

                feeEligibleDistributionAmount += _payoutAmount;
              }

              // Trigger any inherited pre-transfer logic.
              _beforeTransferTo(address(_terminal), _netPayoutAmount);

              // If this terminal's token is ETH, send it in msg.value.
              uint256 _payableValue = token == JBTokens.ETH ? _netPayoutAmount : 0;

              // Add to balance if prefered.
              if (_split.preferAddToBalance)
                _terminal.addToBalanceOf{value: _payableValue}(
                  _split.projectId,
                  _netPayoutAmount,
                  token,
                  ''
                );
              else
                _terminal.pay{value: _payableValue}(
                  _split.projectId,
                  _netPayoutAmount,
                  token,
                  _split.beneficiary != address(0) ? _split.beneficiary : msg.sender,
                  0,
                  _split.preferClaimed,
                  '',
                  bytes('')
                );
            }
          } else {
            _netPayoutAmount = _feeDiscount == JBConstants.MAX_FEE_DISCOUNT
              ? _payoutAmount
              : _payoutAmount - _feeAmount(_payoutAmount, _feeDiscount);

            // This distribution is eligible for a fee since the funds are leaving the ecosystem.
            feeEligibleDistributionAmount += _payoutAmount;

            // If there's a beneficiary, send the funds directly to the beneficiary. Otherwise send to the msg.sender.
            _transferFrom(
              address(this),
              _split.beneficiary != address(0) ? _split.beneficiary : payable(msg.sender),
              _netPayoutAmount
            );
          }

          // Subtract from the amount to be sent to the beneficiary.
          leftoverAmount = leftoverAmount - _payoutAmount;
        }
        ```

        _Libraries used:_

        * [`JBConstants`](/api/libraries/jbconstants.md)
          * `.MAX_FEE_DISCOUNT(...)`
        * [`JBTokens`](/api/libraries/jbtokens.md)
          * `.ETH`

        _Internal references:_

        * [`decimals`](/api/contracts/or-abstract/jbsingletokenpaymentterminal/properties/decimals.md)
        * [`isFeelessTerminal`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/isfeelessterminal.md)
        * [`pay`]/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/(pay.md)
        * [`_pay`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/-_pay.md)
        * [`_feeAmount`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/read/-_feeamount.md)
        * [`_transferFrom`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/-_transferfrom.md)

        _External references:_

        * [`allocate`](/api/interfaces/ijbsplitallocator.md)
        * [`primaryTerminalOf`](/api/contracts/jbdirectory/read/primaryterminalof.md)
    3.  Emit a `DistributeToPayoutSplit` event for the split being iterated on with the relevant parameters.

        ```
        emit DistributeToPayoutSplit(
          _projectId,
          _domain,
          _group,
          _split,
          _netPayoutAmount,
          msg.sender
        );
        ```

        _Event references:_

        * [`DistributeToPayoutSplit`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/distributetopayoutsplit.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Pays out splits for a project's funding cycle configuration.

  @param _projectId The ID of the project for which payout splits are being distributed.
  @param _domain The domain of the splits to distribute the payout between.
  @param _group The group of the splits to distribute the payout between.
  @param _amount The total amount being distributed, as a fixed point number with the same number of decimals as this terminal.
  @param _feeDiscount The amount of discount to apply to the fee, out of the MAX_FEE.

  @return leftoverAmount If the leftover amount if the splits don't add up to 100%.
  @return feeEligibleDistributionAmount The total amount of distributions that are eligible to have fees taken from.
*/
function _distributeToPayoutSplitsOf(
  uint256 _projectId,
  JBFundingCycle memory _fundingCycle,
  uint256 _amount,
  uint256 _feeDiscount
) private returns (uint256 leftoverAmount, uint256 feeEligibleDistributionAmount) {
  // Set the leftover amount to the initial amount.
  leftoverAmount = _amount;

  // Get a reference to the project's payout splits.
  JBSplit[] memory _splits = splitsStore.splitsOf(_projectId, _domain, _group);

  // Transfer between all splits.
  for (uint256 _i = 0; _i < _splits.length; _i++) {
    // Get a reference to the split being iterated on.
    JBSplit memory _split = _splits[_i];

    // The amount to send towards the split.
    uint256 _payoutAmount = PRBMath.mulDiv(
      _amount,
      _split.percent,
      JBConstants.SPLITS_TOTAL_PERCENT
    );

    // The payout amount substracting any applicable incurred fees.
    uint256 _netPayoutAmount;

    if (_payoutAmount > 0) {
      // Transfer tokens to the split.
      // If there's an allocator set, transfer to its `allocate` function.
      if (_split.allocator != IJBSplitAllocator(address(0))) {
        _netPayoutAmount = _feeDiscount == JBConstants.MAX_FEE_DISCOUNT
          ? _payoutAmount
          : _payoutAmount - _feeAmount(_payoutAmount, _feeDiscount);

        // This distribution is eligible for a fee since the funds are leaving the ecosystem.
        feeEligibleDistributionAmount += _payoutAmount;

        _beforeTransferTo(address(_split.allocator), _netPayoutAmount);

        // If this terminal's token is ETH, send it in msg.value.
        uint256 _payableValue = token == JBTokens.ETH ? _netPayoutAmount : 0;

        // Create the data to send to the allocator.
        JBSplitAllocationData memory _data = JBSplitAllocationData(
          token,
          _netPayoutAmount,
          decimals,
          _projectId,
          _group,
          _split
        );

        // Trigger the allocator's `allocate` function.
        _split.allocator.allocate{value: _payableValue}(_data);

        // Otherwise, if a project is specified, make a payment to it.
      } else if (_split.projectId != 0) {
        // Get a reference to the Juicebox terminal being used.
        IJBPaymentTerminal _terminal = directory.primaryTerminalOf(_split.projectId, token);

        // The project must have a terminal to send funds to.
        if (_terminal == IJBPaymentTerminal(address(0))) revert TERMINAL_IN_SPLIT_ZERO_ADDRESS();

        // Save gas if this contract is being used as the terminal.
        if (_terminal == this) {
          // This distribution does not incur a fee.
          _netPayoutAmount = _payoutAmount;

          // Add to balance if prefered.
          if (_split.preferAddToBalance) _addToBalanceOf(_split.projectId, _netPayoutAmount, '');
          else
            _pay(
              _netPayoutAmount,
              address(this),
              _split.projectId,
              (_split.beneficiary != address(0)) ? _split.beneficiary : msg.sender,
              0,
              _split.preferClaimed,
              '',
              bytes('')
            );
        } else {
          // If the terminal is set as feeless, this distribution is not eligible for a fee.
          if (isFeelessTerminal[_terminal])
            _netPayoutAmount = _payoutAmount;
            // This distribution is eligible for a fee since the funds are leaving this contract and the terminal isn't listed as feeless.
          else {
            _netPayoutAmount = _feeDiscount == JBConstants.MAX_FEE_DISCOUNT
              ? _payoutAmount
              : _payoutAmount - _feeAmount(_payoutAmount, _feeDiscount);

            feeEligibleDistributionAmount += _payoutAmount;
          }

          // Trigger any inherited pre-transfer logic.
          _beforeTransferTo(address(_terminal), _netPayoutAmount);

          // If this terminal's token is ETH, send it in msg.value.
          uint256 _payableValue = token == JBTokens.ETH ? _netPayoutAmount : 0;

          // Add to balance if prefered.
          if (_split.preferAddToBalance)
            _terminal.addToBalanceOf{value: _payableValue}(
              _split.projectId,
              _netPayoutAmount,
              token,
              ''
            );
          else
            _terminal.pay{value: _payableValue}(
              _split.projectId,
              _netPayoutAmount,
              token,
              _split.beneficiary != address(0) ? _split.beneficiary : msg.sender,
              0,
              _split.preferClaimed,
              '',
              bytes('')
            );
        }
      } else {
        _netPayoutAmount = _feeDiscount == JBConstants.MAX_FEE_DISCOUNT
          ? _payoutAmount
          : _payoutAmount - _feeAmount(_payoutAmount, _feeDiscount);

        // This distribution is eligible for a fee since the funds are leaving the ecosystem.
        feeEligibleDistributionAmount += _payoutAmount;

        // If there's a beneficiary, send the funds directly to the beneficiary. Otherwise send to the msg.sender.
        _transferFrom(
          address(this),
          _split.beneficiary != address(0) ? _split.beneficiary : payable(msg.sender),
          _netPayoutAmount
        );
      }

      // Subtract from the amount to be sent to the beneficiary.
      leftoverAmount = leftoverAmount - _payoutAmount;
    }

    emit DistributeToPayoutSplit(
      _projectId,
      _domain,
      _group,
      _split,
      _netPayoutAmount,
      msg.sender
    );
  }
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                | Description                                                                |
| --------------------- | -------------------------------------------------------------------------- |
| **`0x4d: BAD_SPLIT`** | Thrown if the split specifies a project that doesn't have an ETH terminal. |

</TabItem>

<TabItem value="Events" label="Events">

| Name                                                                  | Data                                                                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`DistributeToPayoutSplit`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/distributetopayoutsplit.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed domain</code></li><li><code>uint256 indexed group</code></li><li><code>[JBSplit](/api/data-structures/jbsplit.md)split</code></li><li><code>uint256 amount</code></li><li><code>address caller</code></li></ul>                                                                                                                                                                                           |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
