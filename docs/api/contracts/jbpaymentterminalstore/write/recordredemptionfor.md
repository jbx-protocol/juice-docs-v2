# recordRedemptionFor

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBPaymentTerminalStore`](/api/contracts/jbpaymentterminalstore/README.md)​‌

Interface: [`JBPaymentTerminalStore`](/api/interfaces/ijbpaymentterminalstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Records newly redeemed tokens of a project.**

_Redeems the project's tokens according to values provided by a configured data source. If no data source is configured, redeems tokens along a redemption bonding curve that is a function of the number of tokens being burned._

_The msg.sender must be an [`IJBSingleTokenPaymentTerminal`](/api/interfaces/ijbpaymentterminal.md)._

#### Definition

```
function recordRedemptionFor(
  address _holder,
  uint256 _projectId,
  uint256 _tokenCount,
  uint256 _balanceDecimals,
  uint256 _balanceCurrency,
  string memory _memo,
  bytes memory _metadata
)
  external
  override
  nonReentrant
  returns (
    JBFundingCycle memory fundingCycle,
    uint256 reclaimAmount,
    IJBRedemptionDelegate delegate,
    string memory memo
  ) { ... }
```

* Arguments:
  * `_holder` is the account that is having its tokens redeemed.
  * `_projectId` is the ID of the project to which the tokens being redeemed belong.
  * `_tokenCount` is the number of project tokens to redeem, as a fixed point number with 18 decimals.
  * `_balanceDecimals` is the amount of decimals expected in the returned `reclaimAmount`.
  * `_balanceCurrency` is the currency that the returned `reclaimAmount` is expected to be in terms of.
  * `_memo` is a memo to pass along to the emitted event.
  * `_metadata` are bytes to send along to the data source, if one is provided.
* The resulting function overrides a function definition from the [`JBPaymentTerminalStore`](/api/interfaces/ijbpaymentterminalstore.md) interface.
* The function returns:
  * `fundingCycle` is the funding cycle during which the redemption was made.
  * `reclaimAmount` is the amount of terminal tokens reclaimed, as a fixed point number with 18 decimals.
  * `delegate` is a delegate contract to use for subsequent calls.
  * `memo` is a memo that should be passed along to the emitted event.

#### Body

1.  Get a reference to the project's current funding cycle.

    ```
    // Get a reference to the project's current funding cycle.
    fundingCycle = fundingCycleStore.currentOf(_projectId);
    ```

    _External references:_

    * [`currentOf`](/api/contracts/jbfundingcyclestore/read/currentof.md)
2.  Make sure the project's funding cycle isn't configured to pause redemptions.

    ```
    // The current funding cycle must not be paused.
    if (fundingCycle.redeemPaused()) revert FUNDING_CYCLE_REDEEM_PAUSED();
    ```

    _Libraries used:_

    * [`JBFundingCycleMetadataResolver`](/api/libraries/jbfundingcyclemetadataresolver.md)\
      `.redeemPaused(...)`
3.  The following scoped block is a bit of a hack to prevent a "Stack too deep" error. 

    ```
    // Scoped section prevents stack too deep. `_currentOverflow`, `_totalSupply`, and `_data` only used within scope.
    { ... }
    ```

    1.  Get a reference to the amount of overflow the project has. Either the project's total overflow or the overflow local to the msg.sender's balance will be used depending on how the project's funding cycle is configured. 

        ```
        // Get the amount of current overflow.
        // Use the local overflow if the funding cycle specifies that it should be used. Otherwise, use the project's total overflow across all of its terminals.
        uint256 _currentOverflow = fundingCycle.useTotalOverflowForRedemptions()
          ? _currentTotalOverflowOf(_projectId, _balanceDecimals, _balanceCurrency)
          : _overflowDuring(
            IJBSingleTokenPaymentTerminal(msg.sender),
            _projectId,
            fundingCycle,
            _balanceCurrency
          );
        ```

        _Libraries used:_

        * [`JBFundingCycleMetadataResolver`](/api/libraries/jbfundingcyclemetadataresolver.md)\
          `.useTotalOverflowForRedemptions(...)`\

        _Internal references:_

        * [`_currentTotalOverflowOf`](/api/contracts/jbpaymentterminalstore/read/-_currenttotaloverflowof.md)
        * [`_overflowDuring`](/api/contracts/jbpaymentterminalstore/read/-_overflowduring.md)

    2.  Get a reference to the total outstanding supply of project tokens.

        ```
        // Get the number of outstanding tokens the project has.
        uint256 _totalSupply = directory.controllerOf(_projectId).totalOutstandingTokensOf(
          _projectId,
          fundingCycle.reservedRate()
        );
        ```

        _Libraries used:_

        * [`JBFundingCycleMetadataResolver`](/api/libraries/jbfundingcyclemetadataresolver.md)
          * `.reservedRate(...)`

        _Internal references:_

        * [`directory`](/api/contracts/jbpaymentterminalstore/properties/directory.md)

        _External references:_

        * [`controllerOf`](/api/contracts/jbdirectory/properties/controllerof.md)
        * [`totalOutstandingTokensOf`](/api/contracts/or-controllers/jbcontroller/read/totaloutstandingtokensof.md)

    3.  Make sure the provided token count is within the bounds of the total supply.

        ```
        // Can't redeem more tokens that is in the supply.
        if (_tokenCount > _totalSupply) revert INSUFFICIENT_TOKENS();
        ```

    4.  Get a reference to the reclaimable overflow if there is overflow. 

        ```
        if (_currentOverflow > 0)
          // Calculate reclaim amount using the current overflow amount.
          reclaimAmount = _reclaimableOverflowDuring(
            _projectId,
            fundingCycle,
            _tokenCount,
            _totalSupply,
            _currentOverflow
          );
        ```

        _Internal references:_

        * [`_reclaimableOverflowDuring`](/api/contracts/jbpaymentterminalstore/read/-_reclaimableoverflowduring.md)

    5.  If the project's current funding cycle is configured to use a data source when making redemptions, ask the data source for the parameters that should be used throughout the rest of the function given provided contextual values in a [`JBRedeemParamsData`](/api/data-structures/jbredeemparamsdata.md) structure. Otherwise default parameters are used.

        ```
        // If the funding cycle has configured a data source, use it to derive a claim amount and memo.
        if (fundingCycle.useDataSourceForRedeem()) {
          // Create the params that'll be sent to the data source.
          JBRedeemParamsData memory _data = JBRedeemParamsData(
            IJBSingleTokenPaymentTerminal(msg.sender),
            _holder,
            _projectId,
            _tokenCount,
            _totalSupply,
            _currentOverflow,
            _balanceDecimals,
            _balanceCurrency,
            reclaimAmount,
            fundingCycle.useTotalOverflowForRedemptions(),
            fundingCycle.redemptionRate(),
            fundingCycle.ballotRedemptionRate(),
            _memo,
            _metadata
          );
          (reclaimAmount, memo, delegate) = fundingCycle.dataSource().redeemParams(_data);
        } else {
          memo = _memo;
        }
        ```

        _Libraries used:_

        * [`JBFundingCycleMetadataResolver`](/api/libraries/jbfundingcyclemetadataresolver.md)\
          `.useDataSourceForRedeem(...)`\
          `.dataSource(...)`\
          `.redemptionRate(...)`\
          `.ballotRedemptionRate(...)`\
          `.useTotalOverflowForRedemptions(...)`

4.  Make sure the amount being claimed is within the bounds of the project's balance.

    ```
    // The amount being reclaimed must be within the project's balance.
    if (reclaimAmount > balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId])
      revert INADEQUATE_PAYMENT_TERMINAL_STORE_BALANCE();
    ```

    _Internal references:_

    * [`balanceOf`](/api/contracts/jbpaymentterminalstore/properties/balanceof.md)
5.  Decrement any claimed funds from the project's balance if needed.

    ```
    // Remove the reclaimed funds from the project's balance.
    if (reclaimAmount > 0)
      balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId] =
        balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId] -
        reclaimAmount;
    ```

    _Internal references:_

    * [`balanceOf`](/api/contracts/jbpaymentterminalstore/properties/balanceof.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Records newly redeemed tokens of a project.

  @dev
  Redeems the project's tokens according to values provided by a configured data source. If no data source is configured, redeems tokens along a redemption bonding curve that is a function of the number of tokens being burned.

  @dev
  The msg.sender must be an IJBSingleTokenPaymentTerminal. 

  @param _holder The account that is having its tokens redeemed.
  @param _projectId The ID of the project to which the tokens being redeemed belong.
  @param _tokenCount The number of project tokens to redeem, as a fixed point number with 18 decimals.
  @param _balanceDecimals The amount of decimals expected in the returned `reclaimAmount`.
  @param _balanceCurrency The currency that the returned `reclaimAmount` is expected to be in terms of.
  @param _memo A memo to pass along to the emitted event.
  @param _metadata Bytes to send along to the data source, if one is provided.

  @return fundingCycle The funding cycle during which the redemption was made.
  @return reclaimAmount The amount of terminal tokens reclaimed, as a fixed point number with 18 decimals.
  @return delegate A delegate contract to use for subsequent calls.
  @return memo A memo that should be passed along to the emitted event.
*/
function recordRedemptionFor(
  address _holder,
  uint256 _projectId,
  uint256 _tokenCount,
  uint256 _balanceDecimals,
  uint256 _balanceCurrency,
  string memory _memo,
  bytes memory _metadata
)
  external
  override
  nonReentrant
  returns (
    JBFundingCycle memory fundingCycle,
    uint256 reclaimAmount,
    IJBRedemptionDelegate delegate,
    string memory memo
  )
{
  // Get a reference to the project's current funding cycle.
  fundingCycle = fundingCycleStore.currentOf(_projectId);

  // The current funding cycle must not be paused.
  if (fundingCycle.redeemPaused()) revert FUNDING_CYCLE_REDEEM_PAUSED();

  // Scoped section prevents stack too deep. `_currentOverflow`, `_totalSupply`, and `_data` only used within scope.
  {
    // Get the amount of current overflow.
    // Use the local overflow if the funding cycle specifies that it should be used. Otherwise, use the project's total overflow across all of its terminals.
    uint256 _currentOverflow = fundingCycle.useTotalOverflowForRedemptions()
      ? _currentTotalOverflowOf(_projectId, _balanceDecimals, _balanceCurrency)
      : _overflowDuring(
        IJBSingleTokenPaymentTerminal(msg.sender),
        _projectId,
        fundingCycle,
        _balanceCurrency
      );

    // Get the number of outstanding tokens the project has.
    uint256 _totalSupply = directory.controllerOf(_projectId).totalOutstandingTokensOf(
      _projectId,
      fundingCycle.reservedRate()
    );

    // Can't redeem more tokens that is in the supply.
    if (_tokenCount > _totalSupply) revert INSUFFICIENT_TOKENS();

    if (_currentOverflow > 0)
      // Calculate reclaim amount using the current overflow amount.
      reclaimAmount = _reclaimableOverflowDuring(
        _projectId,
        fundingCycle,
        _tokenCount,
        _totalSupply,
        _currentOverflow
      );

    // If the funding cycle has configured a data source, use it to derive a claim amount and memo.
    if (fundingCycle.useDataSourceForRedeem()) {
      // Create the params that'll be sent to the data source.
      JBRedeemParamsData memory _data = JBRedeemParamsData(
        IJBSingleTokenPaymentTerminal(msg.sender),
        _holder,
        _projectId,
        _tokenCount,
        _totalSupply,
        _currentOverflow,
        _balanceDecimals,
        _balanceCurrency,
        reclaimAmount,
        fundingCycle.useTotalOverflowForRedemptions(),
        fundingCycle.redemptionRate(),
        fundingCycle.ballotRedemptionRate(),
        _memo,
        _metadata
      );
      (reclaimAmount, memo, delegate) = fundingCycle.dataSource().redeemParams(_data);
    } else {
      memo = _memo;
    }
  }

  // The amount being reclaimed must be within the project's balance.
  if (reclaimAmount > balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId])
    revert INADEQUATE_PAYMENT_TERMINAL_STORE_BALANCE();

  // Remove the reclaimed funds from the project's balance.
  if (reclaimAmount > 0)
    balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId] =
      balanceOf[IJBSingleTokenPaymentTerminal(msg.sender)][_projectId] -
      reclaimAmount;
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                                          | Description                                                                                  |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **`FUNDING_CYCLE_REDEEM_PAUSED`**               | Thrown if the project has configured its current funding cycle to pause redemptions.         |
| **`INADEQUATE_PAYMENT_TERMINAL_STORE_BALANCE`** | Thrown if the project's balance isn't sufficient to fulfill the desired claim.               |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
