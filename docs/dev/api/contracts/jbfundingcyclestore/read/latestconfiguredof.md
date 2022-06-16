# currentBallotStateOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBFundingCycleStore`](/dev/api/contracts/jbfundingcyclestore/README.md)​‌

Interface: [`IJBFundingCycleStore`](/dev/api/interfaces/ijbfundingcyclestore.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**The latest funding cycle to be configured for the specified project, and its current ballot state.**

#### Definition

```
function latestConfiguredOf(uint256 _projectId)
  external
  view
  override
  returns (JBFundingCycle memory fundingCycle, JBBallotState ballotState) { ... } 
```

* Arguments:
  * `_projectId` is the ID of the project to get the latest configured funding cycle of.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IJBFundingCycleStore`](/dev/api/interfaces/ijbfundingcyclestore.md) interface.
* The function returns:
  * `fundingCycle` is the latest configured funding cycle.
  * `ballotState` is the [`JBBallotState`](/dev/api/enums/jbballotstate.md) of the ballot for the reconfiguration.

#### Body

1.  Get a reference to the latest funding cycle for the project.

    ```
    // Get a reference to the latest funding cycle configuration.
    uint256 _fundingCycleConfiguration = latestConfigurationOf[_projectId];
    ```

    _Internal references:_

    * [`latestConfigurationOf`](/dev/api/contracts/jbfundingcyclestore/properties/latestconfigurationof.md)
2.  Get a reference to the funding cycle for the latest configuration.

    ```
    // Resolve the funding cycle for the for the latest configuration.
    fundingCycle = _getStructFor(_projectId, _fundingCycleConfiguration);
    ```

    _Internal references:_

    * [`_getStructFor`](/dev/api/contracts/jbfundingcyclestore/read/-_getstructfor.md)
3.  Return the ballot state of the latest funding cycle configuration as is determined by the current configuration and the funding cycle it's based on.

    ```
    // Resolve the ballot state.
    ballotState = _ballotStateOf(
      _projectId,
      fundingCycle.configuration,
      fundingCycle.start,
      fundingCycle.basedOn
    );
    ```

    _Internal references:_

    * [`_ballotStateOf`](/dev/api/contracts/jbfundingcyclestore/read/-_ballotstateof.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice 
  The latest funding cycle to be configured for the specified project, and its current ballot state.

  @param _projectId The ID of the project to get the latest configured funding cycle of.

  @return fundingCycle The project's queued funding cycle.
  @return ballotState The state of the ballot for the reconfiguration.
*/
function latestConfiguredOf(uint256 _projectId)
  external
  view
  override
  returns (JBFundingCycle memory fundingCycle, JBBallotState ballotState)
{
  // Get a reference to the latest funding cycle configuration.
  uint256 _fundingCycleConfiguration = latestConfigurationOf[_projectId];

  // Resolve the funding cycle for the latest configuration.
  fundingCycle = _getStructFor(_projectId, _fundingCycleConfiguration);

  // Resolve the ballot state.
  ballotState = _ballotStateOf(
    _projectId,
    fundingCycle.configuration,
    fundingCycle.start,
    fundingCycle.basedOn
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
