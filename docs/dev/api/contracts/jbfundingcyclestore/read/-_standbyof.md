# _standbyOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBFundingCycleStore`](/dev/api/contracts/jbfundingcyclestore/README.md)​

<Tabs>
<TabItem value="Step by step" label="Step by step">

**The project's stored funding cycle that hasn't yet started and should be used next, if one exists.**

_A value of 0 is returned if no funding cycle was found._

_Assumes the project has a latest configuration._

#### Definition

```
function _standbyOf(uint256 _projectId) private view returns (uint256 configuration) { ... }
```

* Arguments:
  * `_projectId` is the ID of a project to look through for a standby cycle.
* The view function is private to this contract.
* The view function does not alter state on the blockchain.
* The function returns the configuration of the standby funding cycle if one exists, or 0 if one doesn't exist.

#### Body

1.  Get a reference to the latest funding cycle for the project.

    ```
    // Get a reference to the project's latest funding cycle.
    configuration = latestConfigurationOf[_projectId];
    ```

    _Internal references:_

    * [`latestConfigurationOf`](/dev/api/contracts/jbfundingcyclestore/properties/latestconfigurationof.md)
2.  Get the struct for the latest funding cycle.

    ```
    // Get the necessary properties for the latest funding cycle.
    JBFundingCycle memory _fundingCycle = _getStructFor(_projectId, configuration);
    ```

    _Internal references:_

    * [`_getStructFor`](/dev/api/contracts/jbfundingcyclestore/read/-_getstructfor.md)
3.  If the cycle has started, return 0 since there is not a stored funding cycle in standby.

    ```
    // There is no upcoming funding cycle if the latest funding cycle has already started.
    if (block.timestamp >= _fundingCycle.start) return 0;
    ```
4.  If this is the first funding cycle, it must be queued since it doesn't require a ballot's approval.

    ```
    // If this is the first funding cycle, it is queued.
    if (_fundingCycle.number == 1) return configuration;
    ```
5.  Get a reference to the cycle that the latest is based on.

    ```
    // Get the necessary properties for the base funding cycle.
    JBFundingCycle memory _baseFundingCycle = _getStructFor(_projectId, _fundingCycle.basedOn);
    ```

    _Internal references:_

    * [`_getStructFor`](/dev/api/contracts/jbfundingcyclestore/read/-_getstructfor.md)
6.  It's possible that the latest cycle was configured to start at or after a date in the future that comes after another iteration of the currently active funding cycle. If this is the case, there is no immediately queued funding cycle.

    ```
    // If the latest configuration doesn't start until after another base cycle, return 0.
    if (
      _baseFundingCycle.duration > 0 &&
      block.timestamp < _fundingCycle.start - _baseFundingCycle.duration
    ) return 0;
    ```

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice 
  The project's stored funding cycle that hasn't yet started and should be used next, if one exists.

  @dev
  A value of 0 is returned if no funding cycle was found.

  @dev
  Assumes the project has a latest configuration.
  
  @param _projectId The ID of a project to look through for a standby cycle.

  @return configuration The configuration of the standby funding cycle if one exists, or 0 if one doesn't exist.
*/
function _standbyOf(uint256 _projectId) private view returns (uint256 configuration) {
  // Get a reference to the project's latest funding cycle.
  configuration = latestConfigurationOf[_projectId];

  // Get the necessary properties for the latest funding cycle.
  JBFundingCycle memory _fundingCycle = _getStructFor(_projectId, configuration);

  // There is no upcoming funding cycle if the latest funding cycle has already started.
  if (block.timestamp >= _fundingCycle.start) return 0;

  // If this is the first funding cycle, it is queued.
  if (_fundingCycle.number == 1) return configuration;

  // Get the necessary properties for the base funding cycle.
  JBFundingCycle memory _baseFundingCycle = _getStructFor(_projectId, _fundingCycle.basedOn);

  // If the latest configuration doesn't start until after another base cycle, return 0.
  if (
    _baseFundingCycle.duration > 0 &&
    block.timestamp < _fundingCycle.start - _baseFundingCycle.duration
  ) return 0;
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
