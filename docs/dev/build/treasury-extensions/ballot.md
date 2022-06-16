# Ballot

Before implementing, learn about ballots [here](/dev/learn/glossary/ballot.md).
#### Specs

A contract can become a funding cycle ballot by adhering to [`IJBFundingCycleBallot`](/dev/api/interfaces/ijbfundingcycleballot.md):

```
interface IJBFundingCycleBallot {
  function duration() external view returns (uint256);

  function stateOf(
    uint256 _projectId,
    uint256 _configuration,
    uint256 _start
  ) external view returns (JBBallotState);
}
```

There are two functions that must be implemented: `duration(...)` and `stateOf(...)`. The result of `duration(...)` is the number of seconds the ballot lasts for from the moment the reconfiguration is proposed. During this time, the protocol automatically interprets the ballot's state as [`JBBallotState.Active`](/dev/api/enums/jbballotstate.md). The result of `stateOf(...)` returns the [`JBBallotState`](/dev/api/enums/jbballotstate.md). If a configuration is approved and the duration has expired, the [`JBFundingCycleStore`](/dev/api/contracts/jbfundingcyclestore/README.md) will use it as the project's current funding cycle when it becomes active. Otherwise, it will make a copy of the latest approved cycle to use.

When extending the pay functionality with a delegate, the protocol will pass a `projectId`, a `configuration`, and a `start` to the `stateOf(...)` function. `configuration` is the identifier of the funding cycle being evaluated, and also the unix timestamp in seconds of when the reconfiguration was proposed. `start` is the unix timestamp the reconfiguration is scheduled to start at if that reconfiguration is approved.

Once the `duration(...)` has expired, the returned value of `stateOf(...)` should no longer change. 

#### Attaching

New ballot contracts should be deployed independently. Once deployed, its address can be configured into a project's funding cycle. The ballot will take effect while that funding cycle is active, and will be used for evaluating subsequent reconfigurations. 
