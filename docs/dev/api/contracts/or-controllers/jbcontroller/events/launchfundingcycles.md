# LaunchFundingCycles

Emitted from:

* [`launchProjectFor`](/dev/api/contracts/or-controllers/jbcontroller/write/launchfundingcyclesfor.md)

#### Definition

```
event LaunchFundingCycles(uint256 configuration, uint256 projectId, string memo, address caller);
```

* `configuration` is the configuration of the first funding cycle.
* `projectId` is the ID of the project that launched its first funding cycle.
* `memo` is a note that was attached.
* `caller` is the address that issued the transaction within which the event was emitted.
