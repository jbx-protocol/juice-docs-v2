# projectOf

Contract: [`JBTokenStore`](/protocol/api/contracts/jbtokenstore/README.md)​‌

Interface: [`IJBTokenStore`](/protocol/api/interfaces/ijbtokenstore.md)

**The ID of the project that each token belongs to.**

# Definition

```solidity
/**
  @notice
  The ID of the project that each token belongs to.

  _token The token to check the project association of.
*/
mapping(IJBToken => uint256) public override projectOf;
```

* Arguments:
  * `_token` is token to check the project association of.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBTokenStore`](/protocol/api/interfaces/ijbtokenstore.md) interface.
