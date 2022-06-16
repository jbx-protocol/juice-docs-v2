# SetTerminal

Emitted from:

* [`setTerminalsOf`](/dev/api/contracts/jbdirectory/write/setterminalsof.md)

Definition:

```
event SetTerminals(
    uint256 indexed projectId,
    IJBPaymentTerminal[] indexed terminals,
    address caller
  );
```

* `projectId` is the ID of the project that set terminals.
* `terminals` are the terminals that were set.
* `caller` is the address that issued the transaction within which the event was emitted.
