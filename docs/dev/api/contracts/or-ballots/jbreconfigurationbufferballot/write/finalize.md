# finalize

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBReconfigurationBufferBallot`](/dev/api/contracts/or-ballots/jbreconfigurationbufferballot)

Interface: [`IJBReconfigurationBufferBallot`](/dev/api/contracts/interfaces/ijbreconfigurationbufferballot)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Finalizes a configuration state if the current state has settled.**

### Definition

```
function finalize(uint256 _projectId, uint256 _configured)
  external
  override
  returns (JBBallotState ballotState) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to which the funding cycle being checked belongs.
  * `_configured` is the configuration of the funding cycle to check the state of.
* The function overrides a function definition from the [`IJBReconfigurationBufferBallot`](/dev/api/contracts/interfaces/ijbreconfigurationbufferballot) interface.
* The function returns the state of the finalized ballot. If `Active`, the ballot can still later be finalized when it's state resolves.

#### Body

1.  Get a reference to the project's currency funding cycle.

    ```
    // Get the funding cycle for the configuration.
    JBFundingCycle memory _fundingCycle = fundingCycleStore.get(_projectId, _configured);
    ```

    _Internal references:_

    * [`fundingCycleStore`](/dev/api/contracts/or-ballots/jbreconfigurationbufferballot/properties/fundingcyclestore.md)

    _External references:_

    * [`get`](/dev/api/contracts/jbfundingcyclestore/read/get.md)

2.  Get a reference to the current finalized ballot state.

    ```
    // Get the current ballot state.
    ballotState = finalState[_projectId][_configured];
    ```

    _Internal references:_

    * [`finalState`](/dev/api/contracts/or-ballots/jbreconfigurationbufferballot/properties/finalstate.md)

3.  If the currency final state is still unresolved, store the updated value it if it has now resolved and emit a `Finalize` event with the relevant parameters.

    ```
    // If the final ballot skate is still `Active`.
    if (ballotState == JBBallotState.Active) {
      ballotState = stateOf(_projectId, _configured, _fundingCycle.start);
      // If the ballot is active after the cycle has started, it should be finalized as failed.
      if (ballotState != JBBallotState.Active) {
        // Store the updated value.
        finalState[_projectId][_configured] = ballotState;

        emit Finalize(_projectId, _configured, ballotState, msg.sender);
      }
    }
    ```

    _Enums used:_

    * [`JBBallotState`](/dev/api/enums/jbballotstate.md)
      * `.Active`

    _Internal references:_

    * [`stateOf`](/dev/api/contracts/or-ballots/jbreconfigurationbufferballot/read/stateof.md)
    * [`finalState`](/dev/api/contracts/or-ballots/jbreconfigurationbufferballot/properties/finalstate.md)

    _Event references:_

    * [`Finalize`](/dev/api/contracts/or-ballots/jbreconfigurationbufferballot/events/finalize.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice 
  Finalizes a configuration state if the current state has settled.

  @param _projectId The ID of the project to which the funding cycle being checked belongs.
  @param _configured The configuration of the funding cycle to check the state of.

  @return ballotState The state of the finalized ballot. If `Active`, the ballot can still later be finalized when it's state resolves.
*/
function finalize(uint256 _projectId, uint256 _configured)
  external
  override
  returns (JBBallotState ballotState)
{
  // Get the funding cycle for the configuration in question.
  JBFundingCycle memory _fundingCycle = fundingCycleStore.get(_projectId, _configured);

  // Get the current ballot state.
  ballotState = finalState[_projectId][_configured];

  // If the final ballot skate is still `Active`.
  if (ballotState == JBBallotState.Active) {
    ballotState = stateOf(_projectId, _configured, _fundingCycle.start);
    // If the ballot is active after the cycle has started, it should be finalized as failed.
    if (ballotState != JBBallotState.Active) {
      // Store the updated value.
      finalState[_projectId][_configured] = ballotState;

      emit Finalize(_projectId, _configured, ballotState, msg.sender);
    }
  }
}
```

</TabItem>

<TabItem value="Events" label="Events">

| Name                                  | Data                                                                                                                                                                                                                                                                                           |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`Finalize`**](/dev/api/contracts/or-ballots/jbreconfigurationbufferballot/events/finalize.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed configuration</code></li><li><code>[JBBallotState](/dev/api/enums/jbballotstate.md) indexed ballotState</code></li><li><code>address caller</code></li></ul> |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
