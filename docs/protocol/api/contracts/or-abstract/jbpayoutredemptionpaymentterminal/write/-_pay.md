# _pay

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPayoutRedemptionPaymentTerminal`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Contribute tokens to a project.**

#### Definition

```
function _pay(
  uint256 _amount,
  address _payer,
  uint256 _projectId,
  address _beneficiary,
  uint256 _minReturnedTokens,
  bool _preferClaimedTokens,
  string memory _memo,
  bytes memory _metadata
) private returns (uint256 beneficiaryTokenCount) { ... }
```

* Arguments:
  * `_amount` is the amount of terminal tokens being received, as a fixed point number with the same amount of decimals as this terminal. If this terminal's token is ETH, this is ignored and msg.value is used in its place.
  * `_payer` is the address making the payment.
  * `_projectId` is the ID of the project being paid.
  * `_beneficiary` is the address to mint tokens for and pass along to the funding cycle's delegate.
  * `_minReturnedTokens` is the minimum number of project tokens expected in return, as a fixed point number with the same amount of decimals as this terminal.
  * `_preferClaimedTokens` is a flag indicating whether the request prefers to mint project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract. Leaving them unclaimed saves gas.
  * `_memo` is memo to pass along to the emitted event, and passed along the the funding cycle's data source and delegate. A data source can alter the memo before emitting in the event and forwarding to the delegate.
  * `_metadata` are bytes to send along to the data source, delegate, and emitted event, if provided.
* The function is private to this contract.
* The function doesn't return anything.

#### Body

1.  Make sure the provided beneficiary isn't the zero address.

    ```
    // Cant send tokens to the zero address.
    if (_beneficiary == address(0)) revert PAY_TO_ZERO_ADDRESS();
    ```

2.  The following scoped block is a bit of a hack to prevent a "Stack too deep" error. Define a few variables outside of the scope that'll be set within the scope but later referenced again outside.

    ```
    // Define variables that will be needed outside the scoped section below.
    // Keep a reference to the funding cycle during which the payment is being made.
    JBFundingCycle memory _fundingCycle;

    // Scoped section prevents stack too deep. `_delegate` and `_tokenCount` only used within scope.
    { ... }
    ```

    1.  Keep references to the delegate and token count that'll be returned from the subsequent function.

        ```
        IJBPayDelegate _delegate;
        uint256 _tokenCount;
        ```

    2.  Keep a reference to the [`JBTokenAmount`](/api/data-structures/jbtokenamount.md) structure with info about what's being paid.

        ```
        // Bundle the amount info into a JBTokenAmount struct.
        JBTokenAmount memory _bundledAmount = JBTokenAmount(token, _amount, decimals, currency);
        ```

    3.  Record the payment, and get a reference to the funding cycle during which the payment was made, the number of project tokens that should be minted as a result, a delegate to callback to, and an updated memo. 

        ```
        // Record the payment.
        (_fundingCycle, _tokenCount, _delegate, _memo) = store.recordPaymentFrom(
          _payer,
          _bundledAmount,
          _projectId,
          baseWeightCurrency,
          _memo,
          _metadata
        );
        ```

        _Internal references:_

        * [`store`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/store.md)

        _External references:_

        * [`recordPaymentFrom`](/api/contracts/jbsingletokenpaymentterminalstore/write/recordpaymentfrom.md)

    4.  Mint tokens if needed. Get a reference to the number of tokens sent to the specified beneificiary as opposed to reserved to be distributed to the project's reserved token splits.

        ```
        // Mint the tokens if needed.
        if (_tokenCount > 0)
          // Set token count to be the number of tokens minted for the beneficiary instead of the total amount.
          beneficiaryTokenCount = IJBController(directory.controllerOf(_projectId)).mintTokensOf(
            _projectId,
            _tokenCount,
            _beneficiary,
            '',
            _preferClaimedTokens,
            true
          );
        ```

        _Internal references:_

        * [`directory`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/directory.md)

        _External references:_

        * [`controllerOf`](/api/contracts/jbdirectory/properties/controllerof.md)
        * [`mintTokensOf`](/api/contracts/or-controllers/jbcontroller/write/minttokensof.md)

    5.  Make sure the beneficiary is receiving at least as much tokens as the minimum specied.

        ```
        // The token count for the beneficiary must be greater than or equal to the minimum expected.
        if (beneficiaryTokenCount < _minReturnedTokens) revert INADEQUATE_TOKEN_COUNT();
        ```

    6.  If a delegate was provided, callback to its `didPay` function, and emit an event with the relevant parameters..

        ```
        // If a delegate was returned by the data source, issue a callback to it.
        if (_delegate != IJBPayDelegate(address(0))) {
          JBDidPayData memory _data = JBDidPayData(
            _payer,
            _projectId,
            _bundledAmount,
            beneficiaryTokenCount,
            _beneficiary,
            _memo,
            _metadata
          );

          _delegate.didPay(_data);
          emit DelegateDidPay(_delegate, _data, msg.sender);
        }
        ```

        _External references:_

        * [`didPay`](/api/interfaces/ijbpaydelegate.md)

        _Event references:_

        * [`DelegateDidPay`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/delegatedidpay.md)

3.  Emit a `Pay` event with the relevant parameters.

    ```
    emit Pay(
      _fundingCycle.configuration,
      _fundingCycle.number,
      _projectId,
      _beneficiary,
      _amount,
      beneficiaryTokenCount,
      _memo,
      _metadata,
      msg.sender
    );
    ```

    _Event references:_

    * [`Pay`](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/pay.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Contribute tokens to a project.

  @param _amount The amount of terminal tokens being received, as a fixed point number with the same amount of decimals as this terminal. If this terminal's token is ETH, this is ignored and msg.value is used in its place.
  @param _payer The address making the payment.
  @param _projectId The ID of the project being paid.
  @param _beneficiary The address to mint tokens for and pass along to the funding cycle's delegate.
  @param _minReturnedTokens The minimum number of project tokens expected in return, as a fixed point number with the same amount of decimals as this terminal.
  @param _preferClaimedTokens A flag indicating whether the request prefers to mint project tokens into the beneficiaries wallet rather than leaving them unclaimed. This is only possible if the project has an attached token contract. Leaving them unclaimed saves gas.
  @param _memo A memo to pass along to the emitted event, and passed along the the funding cycle's data source and delegate.  A data source can alter the memo before emitting in the event and forwarding to the delegate.
  @param _metadata Bytes to send along to the data source, delegate, and emitted event, if provided.

  @return beneficiaryTokenCount The number of tokens minted for the beneficiary, as a fixed point number with 18 decimals.
*/
function _pay(
  uint256 _amount,
  address _payer,
  uint256 _projectId,
  address _beneficiary,
  uint256 _minReturnedTokens,
  bool _preferClaimedTokens,
  string memory _memo,
  bytes memory _metadata
) private returns (uint256 beneficiaryTokenCount)  {
  // Cant send tokens to the zero address.
  if (_beneficiary == address(0)) revert PAY_TO_ZERO_ADDRESS();

  // Define variables that will be needed outside the scoped section below.
  // Keep a reference to the funding cycle during which the payment is being made.
  JBFundingCycle memory _fundingCycle;

  // Scoped section prevents stack too deep. `_delegate` and `_tokenCount` only used within scope.
  {
    IJBPayDelegate _delegate;
    uint256 _tokenCount;

    // Bundle the amount info into a JBTokenAmount struct.
    JBTokenAmount memory _bundledAmount = JBTokenAmount(token, _amount, decimals, currency);

    // Record the payment.
    (_fundingCycle, _tokenCount, _delegate, _memo) = store.recordPaymentFrom(
      _payer,
      _bundledAmount,
      _projectId,
      baseWeightCurrency,
      _memo,
      _metadata
    );

    // Mint the tokens if needed.
    if (_tokenCount > 0)
      // Set token count to be the number of tokens minted for the beneficiary instead of the total amount.
      beneficiaryTokenCount = IJBController(directory.controllerOf(_projectId)).mintTokensOf(
        _projectId,
        _tokenCount,
        _beneficiary,
        '',
        _preferClaimedTokens,
        true
      );

    // The token count for the beneficiary must be greater than or equal to the minimum expected.
    if (beneficiaryTokenCount < _minReturnedTokens) revert INADEQUATE_TOKEN_COUNT();

    // If a delegate was returned by the data source, issue a callback to it.
    if (_delegate != IJBPayDelegate(address(0))) {
      JBDidPayData memory _data = JBDidPayData(
        _payer,
        _projectId,
        _bundledAmount,
        beneficiaryTokenCount,
        _beneficiary,
        _memo,
        _metadata
      );

      _delegate.didPay(_data);
      emit DelegateDidPay(_delegate, _data, msg.sender);
    }
  }

  emit Pay(
    _fundingCycle.configuration,
    _fundingCycle.number,
    _projectId,
    _payer,
    _beneficiary,
    _amount,
    beneficiaryTokenCount,
    _memo,
    _metadata,
    msg.sender
  );
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                    | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| **`PAY_TO_ZERO_ADDRESS`** | Thrown if the provided benificary is the zero address. |

</TabItem>

<TabItem value="Events" label="Events">

| Name                          | Data                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`Pay`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/pay.md)                                         | <ul><li><code>uint256 indexed fundingCycleConfiguration</code></li><li><code>uint256 indexed fundingCycleNumber</code></li><li><code>uint256 indexed projectId</code></li><li><code>address payer</code></li><li><code>address beneficiary</code></li><li><code>uint256 amount</code></li><li><code>uint256 beneficiaryTokenCount</code></li><li><code>string memo</code></li><li><code>address caller</code></li></ul>        |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
