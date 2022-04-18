# Finalize

Emitted from:

* [`finalize`](/api/contracts/or-ballots/jbreconfigurationbufferballot/write/finalize.md)

#### Definition

```
event Finalize(
  uint256 indexed projectId,
  uint256 indexed configuration,
  JBBallotState indexed ballotState,
  address caller
);
```

* `projectId` is the ID of the project whose ballot state was finalized.
* `configuration` is the configuration that was finalized.
* `ballotState` is the final ballot state.
* `caller` is the address that issued the transaction within which the event was emitted.