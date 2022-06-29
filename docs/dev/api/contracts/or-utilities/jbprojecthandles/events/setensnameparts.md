# SetEnsNameParts

Emitted from:

* [`setEnsNamePartsFor`](/dev/api/contracts/or-utilities/jbprojecthandles/write/setensnamepartsfor.md)

#### Definition

```
event SetEnsNameParts(
  uint256 indexed projectId,
  string indexed handle,
  string[] parts,
  address caller
);
```

* `projectId` is the ID of the project for which the ENS name parts were set. 
* `handle` is the handle that the set ENS name parts resolves to. 
* `parts` are the set ENS name parts. 
* `caller` is the address that issued the transaction within which the event was emitted.
