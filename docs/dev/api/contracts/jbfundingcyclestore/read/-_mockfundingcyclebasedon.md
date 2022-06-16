# _mockFundingCycleBasedOn

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBFundingCycleStore`](/dev/api/contracts/jbfundingcyclestore/README.md)​

<Tabs>
<TabItem value="Step by step" label="Step by step">

**A view of the funding cycle that would be created based on the provided one if the project doesn't make a reconfiguration.**

_Returns an empty funding cycle if there can't be a mock funding cycle based on the provided one._

_Assumes a funding cycle with a duration of 0 will never be asked to be the base of a mock._

#### Definition

```
function _mockFundingCycleBasedOn(JBFundingCycle memory _baseFundingCycle, bool _allowMidCycle)
  private
  view
  returns (JBFundingCycle memory) { ... }
```

* Arguments:
  * `_baseFundingCycle` is the [`JBFundingCycle`](/dev/api/data-structures/jbfundingcycle.md) that the resulting funding cycle should follow.
  * `_allowMidCycle` is a flag indicating if the mocked funding cycle is allowed to already be mid cycle.
* The view function is private to this contract.
* The view function does not alter state on the blockchain.
* The function returns a mock [`JBFundingCycle`](/dev/api/data-structures/jbfundingcycle.md) of what the next funding cycle will be.

#### Body

1.  Save a reference to time at or after which the mock must have started. There are a few possibilities.

    1. If the call to the function does not allow mid cycle, the start date must be now or in the future. This is also the case if the base funding cycle doesn't have a duration because the next funding cycle can start immediately.
    2. If neither of these cases apply, moving back one full duration period of the base funding cycle will find the most recent possible start time for the mock cycle to start.

    ```
    // Get the distance of the current time to the start of the next possible funding cycle.
    // If the returned mock cycle must not yet have started, the start time of the mock must be in the future.
    uint256 _mustStartAtOrAfter = !_allowMidCycle
      ? block.timestamp + 1
      : block.timestamp - _baseFundingCycle.duration + 1;
    ```
2.  Find the correct start time for the mock funding cycle.

    ```
    // Derive what the start time should be.
    uint256 _start = _deriveStartFrom(_baseFundingCycle, _mustStartAtOrAfter);
    ```

    _Internal references:_

    * [`_deriveStartFrom`](/dev/api/contracts/jbfundingcyclestore/read/-_derivestartfrom.md)
3.  Find the correct number for the mock funding cycle.

    ```
    // Derive what the number should be.
    uint256 _number = _deriveNumberFrom(_baseFundingCycle, _start);
    ```

    _Internal references:_

    * [`_deriveNumberFrom`](/dev/api/contracts/jbfundingcyclestore/read/-_derivenumberfrom.md)
4.  Return a [`JBFundingCycle`](/dev/api/data-structures/jbfundingcycle.md) with the aggregated configuration.

    ```
    return
      JBFundingCycle(
        _number,
        _baseFundingCycle.configuration,
        _baseFundingCycle.basedOn,
        _start,
        _baseFundingCycle.duration,
        _deriveWeightFrom(_baseFundingCycle, _start),
        _baseFundingCycle.discountRate,
        _baseFundingCycle.ballot,
        _baseFundingCycle.metadata
      );
    ```

    _Internal references:_

    * [`_deriveWeightFrom`](/dev/api/contracts/jbfundingcyclestore/read/-_deriveweightfrom.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  A view of the funding cycle that would be created based on the provided one if the project doesn't make a reconfiguration.

  @dev
  Returns an empty funding cycle if there can't be a mock funding cycle based on the provided one.

  @dev
  Assumes a funding cycle with a duration of 0 will never be asked to be the base of a mock.

  @param _baseFundingCycle The funding cycle that the resulting funding cycle should follow.
  @param _allowMidCycle A flag indicating if the mocked funding cycle is allowed to already be mid cycle.

  @return A mock of what the next funding cycle will be.
*/
function _mockFundingCycleBasedOn(JBFundingCycle memory _baseFundingCycle, bool _allowMidCycle)
  private
  view
  returns (JBFundingCycle memory)
{
  // Get the distance of the current time to the start of the next possible funding cycle.
  // If the returned mock cycle must not yet have started, the start time of the mock must be in the future.
  uint256 _mustStartAtOrAfter = !_allowMidCycle
    ? block.timestamp + 1
    : block.timestamp - _baseFundingCycle.duration + 1;

  // Derive what the start time should be.
  uint256 _start = _deriveStartFrom(_baseFundingCycle, _mustStartAtOrAfter);

  // Derive what the number should be.
  uint256 _number = _deriveNumberFrom(_baseFundingCycle, _start);

  return
    JBFundingCycle(
      _number,
      _baseFundingCycle.configuration,
      _baseFundingCycle.basedOn,
      _start,
      _baseFundingCycle.duration,
      _deriveWeightFrom(_baseFundingCycle, _start),
      _baseFundingCycle.discountRate,
      _baseFundingCycle.ballot,
      _baseFundingCycle.metadata
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
