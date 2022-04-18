# stateOf

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBReconfigurationBufferBallot`](/api/contracts/or-ballots/jbreconfigurationbufferballot)

Interface: [`IJBFundingCycleBallot`](/api/contracts/interfaces/ijbreconfigurationbufferballot)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**The approval state of a particular funding cycle.**

### Definition

```
function stateOf(
  uint256 _projectId,
  uint256 _configured,
  uint256 _start
) public view override returns (JBBallotState)  { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to which the funding cycle being checked belongs.
  * `_configured` is the configuration of the funding cycle to check the state of.
  * `_start` is the start timestamp of the funding cycle to check the state of.
* The view function can be accessed externally by anyone.
* The view function does not alter state on the blockchain.
* The function overrides a function definition from the [`IJBFundingCycleBallot`](/api/interfaces/ijbfundingcycleballot.md) interface.
* The function returns the state of the provided ballot.

#### Body

1.  Return the final state if there is one. 

    ```
    // If there is a finalized state, return it.
    if (finalState[_projectId][_configured] != JBBallotState.Active)
      return finalState[_projectId][_configured];
    ```

    _Internal references:_

    * [`finalState`](/api/contracts/or-ballots/jbreconfigurationbufferballot/properties/finalstate.md)

2.  If the ballot's duration has not yet passed since the reconfiguration was proposed, the state is failed if the funding cycle is supposed to have already started. Otherwise it is still active.  

    ```
    // If the delay hasn't yet passed, the ballot is either failed or active.
    if (block.timestamp < _configured + duration)
      // If the current timestamp is past the start, the ballot is failed.
      return (block.timestamp >= _start) ? JBBallotState.Failed : JBBallotState.Active;
    ```

3. The ballot is otherwise approved. 

    ```
    // The ballot is otherwise approved.
    return JBBallotState.Approved;
    ```

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice 
  The approval state of a particular funding cycle.

  @param _projectId The ID of the project to which the funding cycle being checked belongs.
  @param _configured The configuration of the funding cycle to check the state of.
  @param _start The start timestamp of the funding cycle to check the state of.

  @return The state of the provided ballot.
*/
function stateOf(
  uint256 _projectId,
  uint256 _configured,
  uint256 _start
) public view override returns (JBBallotState) {
  // If there is a finalized state, return it.
  if (finalState[_projectId][_configured] != JBBallotState.Active)
    return finalState[_projectId][_configured];

  // If the delay hasn't yet passed, the ballot is either failed or active.
  if (block.timestamp < _configured + duration)
    // If the current timestamp is past the start, the ballot is failed.
    return (block.timestamp >= _start) ? JBBallotState.Failed : JBBallotState.Active;

  // The ballot is otherwise approved.
  return JBBallotState.Approved;
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
