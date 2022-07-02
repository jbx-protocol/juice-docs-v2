# currentReclaimableOverflowOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBSingleTokenPaymentTerminalStore`](/dev/api/contracts/jbsingletokenpaymentterminalstore/README.md)​‌

Interface: [`IJBSingleTokenPaymentTerminalStore`](/dev/api/interfaces/ijbsingletokenpaymentterminalstore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**The current amount of overflowed tokens from a terminal that can be reclaimed by the specified number of tokens, using the total token supply and overflow in the ecosystem.**

_If the project has an active funding cycle reconfiguration ballot, the project's ballot redemption rate is used._

_The current reclaimable overflow is returned in terms of the specified terminal's currency._

_The reclaimable overflow is represented as a fixed point number with the same amount of decimals as the specified terminal._

#### Definition

```
function currentReclaimableOverflowOf(
  IJBSingleTokenPaymentTerminal _terminal,
  uint256 _projectId,
  uint256 _tokenCount,
  bool _useTotalOverflow
) external view override returns (uint256) { ... }
```

* Arguments:
  * `_terminal` is the terminal from which the reclaimable amount would come.
  * `_projectId` is the ID of the project to get the reclaimable overflow amount for.
  * `_tokenCount` is the number of tokens to make the calculation with, as a fixed point number with 18 decimals.
  * `_useTotalOverflow` is a flag indicating whether the overflow used in the calculation should be summed from all of the project's terminals. If false, overflow should be limited to the amount in the specified `_terminal`.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The resulting function overrides a function definition from the [`JBSingleTokenPaymentTerminalStore`](/dev/api/interfaces/ijbsingletokenpaymentterminalstore.md) interface.
* The function returns the amount of overflowed tokens that can be reclaimed, as a fixed point number with the same number of decimals as the provided `_terminal`.

#### Body

1.  Get a reference to the project's current funding cycle.
    
    ```
    // Get a reference to the project's current funding cycle.
    JBFundingCycle memory _fundingCycle = fundingCycleStore.currentOf(_projectId);
    ```

    _External references:_

    * [`currentOf`](/dev/api/contracts/jbfundingcyclestore/read/currentof.md)

2.  Get the amount of overflow to make the calculation with. Use the total overflow of all of the project's terminals if total overflow should be used, otherwise use the overflow of the provided terminal.

    ```
    // Get the amount of current overflow.
    // Use the project's total overflow across all of its terminals if the flag species specifies so. Otherwise, use the overflow local to the specified terminal.
    uint256 _currentOverflow = _useTotalOverflow
      ? _currentTotalOverflowOf(_projectId, _terminal.decimals(), _terminal.currency())
      : _overflowDuring(
        _terminal,
        _projectId,
        _fundingCycle,
        _terminal.currency()
      );
    ```

    _Internal references:_

    * [`_overflowDuring`](/dev/api/contracts/jbsingletokenpaymentterminalstore/read/-_overflowduring.md)
    * [`_currentTotalOverflowOf`](/dev/api/contracts/jbsingletokenpaymentterminalstore/read/-_currenttotaloverflowof.md)

    _External references:_

    * [`decimals`](/dev/api/contracts/or-payment-terminals/or-abstract/jbsingletokenpaymentterminal/properties/decimals.md)
    * [`currency`](/dev/api/contracts/or-payment-terminals/or-abstract/jbsingletokenpaymentterminal/properties/currency.md)

3.  If there's no overflow, there's nothing reclaimable.

    ```
    // If there's no overflow, there's no reclaimable overflow.
    if (_currentOverflow == 0) return 0;
    ```

4.  Get a reference to the total outstanding supply of project tokens that should be used in the calculation.

    ```
    // Get the number of outstanding tokens the project has.
    uint256 _totalSupply = IJBController(directory.controllerOf(_projectId))
      .totalOutstandingTokensOf(_projectId, _fundingCycle.reservedRate());
    ```

    _Library references:_

    * [`JBFundingCycleMetadataResolver`](/dev/api/libraries/jbfundingcyclemetadataresolver.md)
      * `.reservedRate(...)`

    _Internal references:_

    * [`directory`](/dev/api/contracts/jbsingletokenpaymentterminalstore/properties/directory.md)

    _External references:_

    * [`controllerOf`](/dev/api/contracts/jbdirectory/properties/controllerof.md)
    * [`totalOutstandingTokensOf`](/dev/api/contracts/or-controllers/jbcontroller/read/totaloutstandingtokensof.md)

5.  Make sure the provided token count is within the bounds of the total supply.

    ```
    // Can't redeem more tokens that is in the supply.
    if (_tokenCount > _totalSupply) return 0;
    ```

6.  Return the reclaimable overflow using the project's current funding cycle and the derived current overflow. 

    ```
    // Return the reclaimable overflow amount.
    return
      _reclaimableOverflowDuring(
        _projectId,
        _fundingCycle,
        _tokenCount,
        _totalSupply,
        _currentOverflow
      );
    ```

    _Internal references:_

    * [`_reclaimableOverflowDuring`](/dev/api/contracts/jbsingletokenpaymentterminalstore/read/-_reclaimableoverflowduring.md)


</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  The current amount of overflowed tokens from a terminal that can be reclaimed by the specified number of tokens, using the total token supply and overflow in the ecosystem.

  @dev 
  If the project has an active funding cycle reconfiguration ballot, the project's ballot redemption rate is used.

  @dev
  The current reclaimable overflow is returned in terms of the specified terminal's currency.

  @dev
  The reclaimable overflow is represented as a fixed point number with the same amount of decimals as the specified terminal.

  @param _terminal The terminal from which the reclaimable amount would come.
  @param _projectId The ID of the project to get the reclaimable overflow amount for.
  @param _tokenCount The number of tokens to make the calculation with, as a fixed point number with 18 decimals.
  @param _useTotalOverflow A flag indicating whether the overflow used in the calculation should be summed from all of the project's terminals. If false, overflow should be limited to the amount in the specified `_terminal`.

  @return The amount of overflowed tokens that can be reclaimed, as a fixed point number with the same number of decimals as the provided `_terminal`.
*/
function currentReclaimableOverflowOf(
  IJBSingleTokenPaymentTerminal _terminal,
  uint256 _projectId,
  uint256 _tokenCount,
  bool _useTotalOverflow
) external view override returns (uint256) {
  // Get a reference to the project's current funding cycle.
  JBFundingCycle memory _fundingCycle = fundingCycleStore.currentOf(_projectId);

  // Get the amount of current overflow.
  // Use the project's total overflow across all of its terminals if the flag species specifies so. Otherwise, use the overflow local to the specified terminal.
  uint256 _currentOverflow = _useTotalOverflow
    ? _currentTotalOverflowOf(_projectId, _terminal.decimals(), _terminal.currency())
    : _overflowDuring(
      _terminal,
      _projectId,
      _fundingCycle,
      _terminal.currency()
    );

  // If there's no overflow, there's no reclaimable overflow.
  if (_currentOverflow == 0) return 0;

  // Get the number of outstanding tokens the project has.
  uint256 _totalSupply = IJBController(directory.controllerOf(_projectId))
    .totalOutstandingTokensOf(_projectId, _fundingCycle.reservedRate());

  // Can't redeem more tokens that is in the supply.
  if (_tokenCount > _totalSupply) return 0;
  
  // Return the reclaimable overflow amount.
  return
    _reclaimableOverflowDuring(
      _projectId,
      _fundingCycle,
      _tokenCount,
      _totalSupply,
      _currentOverflow
    );
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
