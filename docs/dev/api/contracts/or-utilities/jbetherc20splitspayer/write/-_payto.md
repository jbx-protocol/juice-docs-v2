# _payTo

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBETHERC20SplitsPayer`](/dev/api/contracts/or-utilities/jbetherc20splitspayer/README.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Split an amount between all splits.**

#### Definition

```
function _payTo(
  JBSplit[] memory _splits,
  address _token,
  uint256 _amount,
  uint256 _decimals,
  address _defaultBeneficiary
) internal virtual returns (uint256 leftoverAmount) { ... }
```

* Arguments:
  * `_splits` are the splits.
  * `_token` is the token the amonut being split is in.
  * `_amount` is the amount of tokens being split, as a fixed point number. If the `_token` is ETH, this is ignored and msg.value is used in its place.
  * `_decimals` is the number of decimals in the `_amount` fixed point number. 
  * `_defaultBeneficiary` is the address that will benefit from any non-specified beneficiaries in splits.
* The function is private to this contract.
* The function returns the amount leftover after all splits were paid.

#### Body

1.  At first the leftover amount is the full amount. This will be decremented as the splits are iterated on.

    ```
    // Set the leftover amount to the initial balance.
    leftoverAmount = _amount;
    ```

2.  Distribute to each split. f there's at least some funds to send to the split, determine where they should go. If the split has an `allocator` set, send the funds to its `allocate` function, passing along any relevant params. Otherwise if a `projectId` is specified in the split, send the payout to that project. Add to the project's balance if the split has a preference to do so, otherwise send a payment and use the split's `beneficiary` as the address that should receive the project's tokens in return, or use the message sender if a beneficiary wasn't provided. If no project was specified, send the funds directly to the `beneficiary` address from the split if one was provided. If the split didn't give any routing information, send the amount to the messag sender. Decrement the `leftoverAmount` once the split is settled. Emit a `DistributeToSplit` event with the relevant parameters.

    ```
    // Settle between all splits.
    for (uint256 i = 0; i < _splits.length; i++) {
      // Get a reference to the split being iterated on.
      JBSplit memory _split = _splits[i];

      // The amount to send towards the split.
      uint256 _splitAmount = PRBMath.mulDiv(
        _amount,
        _split.percent,
        JBConstants.SPLITS_TOTAL_PERCENT
      );

      if (_splitAmount > 0) {
        // Transfer tokens to the split.
        // If there's an allocator set, transfer to its `allocate` function.
        if (_split.allocator != IJBSplitAllocator(address(0))) {
          // Create the data to send to the allocator.
          JBSplitAllocationData memory _data = JBSplitAllocationData(
            _token,
            _splitAmount,
            _decimals,
            defaultProjectId,
            0,
            _split
          );

          // Approve the `_amount` of tokens for the split allocator to transfer tokens from this contract.
          if (_token != JBTokens.ETH)
            IERC20(_token).approve(address(_split.allocator), _splitAmount);

          // If the token is ETH, send it in msg.value.
          uint256 _payableValue = _token == JBTokens.ETH ? _splitAmount : 0;

          // Trigger the allocator's `allocate` function.
          _split.allocator.allocate{value: _payableValue}(_data);

          // Otherwise, if a project is specified, make a payment to it.
        } else if (_split.projectId != 0) {
          if (_split.preferAddToBalance)
            _addToBalanceOf(
              _split.projectId,
              _token,
              _splitAmount,
              _decimals,
              defaultMemo,
              defaultMetadata
            );
          else
            _pay(
              _split.projectId,
              _token,
              _splitAmount,
              _decimals,
              _split.beneficiary != address(0) ? _split.beneficiary : _defaultBeneficiary,
              0,
              _split.preferClaimed,
              defaultMemo,
              defaultMetadata
            );
        } else {
          // Transfer the ETH.
          if (_token == JBTokens.ETH)
            Address.sendValue(
              // Get a reference to the address receiving the tokens. If there's a beneficiary, send the funds directly to the beneficiary. Otherwise send to the `_defaultBeneficiary`.
              _split.beneficiary != address(0) ? _split.beneficiary : payable(_defaultBeneficiary),
              _splitAmount
            );
            // Or, transfer the ERC20.
          else {
            IERC20(_token).transfer(
              // Get a reference to the address receiving the tokens. If there's a beneficiary, send the funds directly to the beneficiary. Otherwise send to the `_defaultBeneficiary`.
              _split.beneficiary != address(0) ? _split.beneficiary : _defaultBeneficiary,
              _splitAmount
            );
          }
        }

        // Subtract from the amount to be sent to the beneficiary.
        leftoverAmount = leftoverAmount - _splitAmount;
      }

      emit DistributeToSplit(
        _splitsProjectId,
        _splitsDomain,
        _splitsGroup,
        _split,
        _splitAmount,
        _defaultBeneficiary,
        msg.sender
      );
    }
    ```

    _Library references:_

    * [`JBTokens`](/dev/api/libraries/jbtokens.md)
      * `.ETH`
    * [`Address`](https://docs.openzeppelin.com/contracts/4.x/dev/api/utils#Address)
      * `.sendValue(...)`

    _Internal references:_

    * [`_pay`](/dev/api/contracts/or-utilities/jbetherc20projectpayer/write/-_pay.md)
    * [`_addToBalanceOf`](/dev/api/contracts/or-utilities/jbetherc20projectpayer/write/-_addtobalanceof.md)

    _External references:_

    * [`approve`](https://docs.openzeppelin.com/contracts/4.x/dev/api/token/erc20#IERC20-approve-address-uint256-)
    * [`transfer`](https://docs.openzeppelin.com/contracts/4.x/dev/api/token/erc20#IERC20-transfer-address-uint256-)
    * [`allocate`](/dev/api/interfaces/ijbsplitallocator.md)

    _Event references:_

    * [`DistributeToSplit`](/dev/api/contracts/or-utilities/jbetherc20splitspayer/events/distributetosplit.md)
    
</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  Split an amount between all splits.

  @param _splits The splits.
  @param _token The token the amonut being split is in.
  @param _amount The amount of tokens being split, as a fixed point number. If the `_token` is ETH, this is ignored and msg.value is used in its place.
  @param _decimals The number of decimals in the `_amount` fixed point number. 
  @param _defaultBeneficiary The address that will benefit from any non-specified beneficiaries in splits.

  @return leftoverAmount The amount leftover after all splits were paid.
*/
function _payTo(
  JBSplit[] memory _splits,
  address _token,
  uint256 _amount,
  uint256 _decimals,
  address _defaultBeneficiary
) internal virtual returns (uint256 leftoverAmount) {
  // Set the leftover amount to the initial balance.
  leftoverAmount = _amount;

  // Settle between all splits.
  for (uint256 i = 0; i < _splits.length; i++) {
    // Get a reference to the split being iterated on.
    JBSplit memory _split = _splits[i];

    // The amount to send towards the split.
    uint256 _splitAmount = PRBMath.mulDiv(
      _amount,
      _split.percent,
      JBConstants.SPLITS_TOTAL_PERCENT
    );

    if (_splitAmount > 0) {
      // Transfer tokens to the split.
      // If there's an allocator set, transfer to its `allocate` function.
      if (_split.allocator != IJBSplitAllocator(address(0))) {
        // Create the data to send to the allocator.
        JBSplitAllocationData memory _data = JBSplitAllocationData(
          _token,
          _splitAmount,
          _decimals,
          defaultProjectId,
          0,
          _split
        );

        // Approve the `_amount` of tokens for the split allocator to transfer tokens from this contract.
        if (_token != JBTokens.ETH)
          IERC20(_token).approve(address(_split.allocator), _splitAmount);

        // If the token is ETH, send it in msg.value.
        uint256 _payableValue = _token == JBTokens.ETH ? _splitAmount : 0;

        // Trigger the allocator's `allocate` function.
        _split.allocator.allocate{value: _payableValue}(_data);

        // Otherwise, if a project is specified, make a payment to it.
      } else if (_split.projectId != 0) {
        if (_split.preferAddToBalance)
          _addToBalanceOf(
            _split.projectId,
            _token,
            _splitAmount,
            _decimals,
            defaultMemo,
            defaultMetadata
          );
        else
          _pay(
            _split.projectId,
            _token,
            _splitAmount,
            _decimals,
            _split.beneficiary != address(0) ? _split.beneficiary : _defaultBeneficiary,
            0,
            _split.preferClaimed,
            defaultMemo,
            defaultMetadata
          );
      } else {
        // Transfer the ETH.
        if (_token == JBTokens.ETH)
          Address.sendValue(
            // Get a reference to the address receiving the tokens. If there's a beneficiary, send the funds directly to the beneficiary. Otherwise send to the `_defaultBeneficiary`.
            _split.beneficiary != address(0) ? _split.beneficiary : payable(_defaultBeneficiary),
            _splitAmount
          );
          // Or, transfer the ERC20.
        else {
          IERC20(_token).transfer(
            // Get a reference to the address receiving the tokens. If there's a beneficiary, send the funds directly to the beneficiary. Otherwise send to the `_defaultBeneficiary`.
            _split.beneficiary != address(0) ? _split.beneficiary : _defaultBeneficiary,
            _splitAmount
          );
        }
      }

      // Subtract from the amount to be sent to the beneficiary.
      leftoverAmount = leftoverAmount - _splitAmount;
    }

    emit DistributeToSplit(
      _splitsProjectId,
      _splitsDomain,
      _splitsGroup,
      _split,
      _splitAmount,
      _defaultBeneficiary,
      msg.sender
    );
  }
}
```
</TabItem>

<TabItem value="Events" label="Events">

| Name                                                                          | Data                                                                                          |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [**`DistributeToSplit`**](/dev/api/contracts/or-utilities/jbetherc20splitspayer/events/distributetosplit.md)                                                                          | <ul><li><code>[JBSplit](/dev/api/data-structures/jbsplit.md) split</code></li><li><code>uint256 amount</code></li><li><code>address caller</code></li></ul>                  |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
