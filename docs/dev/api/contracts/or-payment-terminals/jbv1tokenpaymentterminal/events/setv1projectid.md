# SetV1ProjectId

Emitted from:

* [`setV1ProjectIdOf`](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/write/setv1projectidof.md)

#### Definition

```
event SetV1ProjectId(uint256 indexed projectId, uint256 indexed v1ProjectId, address caller);
```

* `projectId` is the ID of the project that is having its v1 project ID set.
* `v1ProjectId` is the ID of the v1 project that is being set.
* `caller` is the address that issued the transaction within which the event was emitted.
