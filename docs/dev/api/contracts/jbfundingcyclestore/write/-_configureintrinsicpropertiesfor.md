# _configureIntrinsicPropertiesFor

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBFundingCycleStore`](/dev/api/contracts/jbfundingcyclestore/README.md)​

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Updates the configurable funding cycle for this project if it exists, otherwise creates one.**

#### Definition

```
function _configureIntrinsicPropertiesFor(
  uint256 _projectId,
  uint256 _configuration,
  uint256 _weight,
  uint256 _mustStartAtOrAfter
) private { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to find a configurable funding cycle for.
  * `_configuration` is the time at which the funding cycle was configured.
  * `_weight` is the weight to store in the configured funding cycle.
  * `_mustStartAtOrAfter` is the time before which the initialized funding cycle can't start.
* The function is private to this contract.
* The function doesn't return anything.

#### Body

1.  If the project does not yet have a funding cycle, initialize a new one.

    ```
    // If there's not yet a funding cycle for the project, initialize one.
    if (latestConfigurationOf[_projectId] == 0)
      // Use an empty funding cycle as the base.
      return
        _initFor(_projectId, _getStructFor(0, 0), _configuration, _mustStartAtOrAfter, _weight);
    ```

    _Internal references:_

    * [`latestConfigurationOf`](/dev/api/contracts/jbfundingcyclestore/properties/latestconfigurationof.md)
    * [`_initFor`](/dev/api/contracts/jbfundingcyclestore/write/-_initfor.md)
    * [`_getStructFor`](/dev/api/contracts/jbfundingcyclestore/read/-_getstructfor.md)
2.  If there's no standby funding cycle, get a reference to the project's eligible funding cycle. The configurable funding cycle will have to be initialized based on the eligible cycle.

    ```
    // Get the active funding cycle's configuration.
    uint256 _currentConfiguration = _eligibleOf(_projectId);
    ```

    _Internal references:_

    * [`_eligibleOf`](/dev/api/contracts/jbfundingcyclestore/read/-_eligibleof.md)
3.  If there is no eligible funding cycle for the project, get a reference instead to the project's latest funding cycle configuration, which may have been initialized long into the past.

    ```
    // If an eligible funding cycle does not exist, get a reference to the latest funding cycle configuration for the project.
    if (_currentConfiguration == 0)
      // Get the latest funding cycle's configuration.
      _currentConfiguration = latestConfigurationOf[_projectId];
    ```

    _Internal references:_

    * [`latestConfigurationOf`](/dev/api/contracts/jbfundingcyclestore/properties/latestconfigurationof.md)
4.  Resolve the funding cycle struct for the currently referenced configuration.

    ```
    // Get a reference to the funding cycle.
    JBFundingCycle memory _baseFundingCycle = _getStructFor(_projectId, _currentConfiguration);
    ```

    _Internal references:_

    * [`_getStructFor`](/dev/api/contracts/jbfundingcyclestore/read/-_getstructfor.md)
5.  If the configuration isn't approved, get a reference to the configuration it's based on which must be the latest approved configuration.

    ```
    if (!_isApproved(_projectId, _baseFundingCycle) || block.timestamp < _baseFundingCycle.start)
      // If it hasn't been approved or hasn't yet started, set the ID to be the funding cycle it's based on,
      // which carries the latest approved configuration.
      _baseFundingCycle = _getStructFor(_projectId, _baseFundingCycle.basedOn;
    ```

    _Internal references:_

    * [`_isApproved`](/dev/api/contracts/jbfundingcyclestore/read/-_isapproved.md)
    * [`_getStructFor`](/dev/api/contracts/jbfundingcyclestore/read/-_getstructfor.md)
6. Make sure the configuration isn't the same as the base configuration. Only one configuration can be made to a project's funding cycles per block. 

    ```
    // The configuration can't be the same as the base configuration.
    if (_baseFundingCycle.configuration == _configuration) revert NO_SAME_BLOCK_RECONFIGURATION();
    ```

7.  Get a reference to the time after which the base funding cycle's ballot will be resolved. The funding cycle that will be initialized can start any time after the base funding cycle's ballot's duration is up.

    ```
    // The time after the ballot of the provided funding cycle has expired.
    // If the provided funding cycle has no ballot, return the current timestamp.
    uint256 _timestampAfterBallot = _baseFundingCycle.ballot == IJBFundingCycleBallot(address(0))
      ? 0
      : _configuration + _baseFundingCycle.ballot.duration();
    ```

    _Internal references:_

    * [`duration`](/dev/api/interfaces/ijbfundingcycleballot.md)
8.  Initialize a funding cycle with the correct configuration. Make sure it can only start after the base cycle's ballot has resolved.

    ```
    _initFor(
      _projectId,
      _baseFundingCycle,
      _configuration,
      // Can only start after the ballot.
      _timestampAfterBallot > _mustStartAtOrAfter ? _timestampAfterBallot : _mustStartAtOrAfter,
      _weight
    );
    ```

    _Internal references:_

    * [`_initFor`](/dev/api/contracts/jbfundingcyclestore/write/-_initfor.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice 
  Updates the configurable funding cycle for this project if it exists, otherwise creates one.

  @param _projectId The ID of the project to find a configurable funding cycle for.
  @param _configuration The time at which the funding cycle was configured.
  @param _weight The weight to store in the configured funding cycle.
  @param _mustStartAtOrAfter The time before which the initialized funding cycle can't start.
*/
function _configureIntrinsicPropertiesFor(
  uint256 _projectId,
  uint256 _configuration,
  uint256 _weight,
  uint256 _mustStartAtOrAfter
) private {
  // If there's not yet a funding cycle for the project, initialize one.
  if (latestConfigurationOf[_projectId] == 0)
    // Use an empty funding cycle as the base.
    return
      _initFor(_projectId, _getStructFor(0, 0), _configuration, _mustStartAtOrAfter, _weight);

  // Get the active funding cycle's configuration.
  uint256 _currentConfiguration = _eligibleOf(_projectId);

  // If an eligible funding cycle does not exist, get a reference to the latest funding cycle configuration for the project.
  if (_currentConfiguration == 0)
    // Get the latest funding cycle's configuration.
    _currentConfiguration = latestConfigurationOf[_projectId];

  // Get a reference to the funding cycle.
  JBFundingCycle memory _baseFundingCycle = _getStructFor(_projectId, _currentConfiguration);

  if (!_isApproved(_projectId, _baseFundingCycle) || block.timestamp < _baseFundingCycle.start)
    // If it hasn't been approved or hasn't yet started, set the ID to be the funding cycle it's based on,
    // which carries the latest approved configuration.
    _baseFundingCycle = _getStructFor(_projectId, _baseFundingCycle.basedOn);

  // The configuration can't be the same as the base configuration.
  if (_baseFundingCycle.configuration == _configuration) revert NO_SAME_BLOCK_RECONFIGURATION();

  // The time after the ballot of the provided funding cycle has expired.
  // If the provided funding cycle has no ballot, return the current timestamp.
  uint256 _timestampAfterBallot = _baseFundingCycle.ballot == IJBFundingCycleBallot(address(0))
    ? 0
    : _configuration + _baseFundingCycle.ballot.duration();

  _initFor(
    _projectId,
    _baseFundingCycle,
    _configuration,
    // Can only start after the ballot.
    _timestampAfterBallot > _mustStartAtOrAfter ? _timestampAfterBallot : _mustStartAtOrAfter,
    _weight
  );
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                      | Description                                                                  |
| --------------------------- | ---------------------------------------------------------------------------- |
| **`NO_SAME_BLOCK_RECONFIGURATION`**        | Thrown if two configurations have been submitted in the same block.            |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
