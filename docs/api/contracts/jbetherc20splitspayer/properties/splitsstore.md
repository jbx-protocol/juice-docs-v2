# splitStore

Contract: [`JBETHERC20SplitsPayer`](/api/contracts/jbetherc20splitspayer/README.md)

Interface: [`IJBSplitsPayer`](/api/interfaces/ijbsplitspayer.md)

**The contract that stores splits for each project.**

# Definition

```
/**
  @notice
  The contract that stores splits for each project.
*/
IJBSplitsStore public immutable override splitsStore;
```

* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBSplitsPayer`](/api/interfaces/ijbsplitspayer.md) interface.
