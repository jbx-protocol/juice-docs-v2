# baseUri

Contract: [`JBNFTRewardDataSource`](/dev/api/contracts/or-delegates/or-abstract/jbnftrewarddatasource/README.md)​‌

Interface: [`IJBNFTRewardDataSource`](/dev/api/interfaces/ijbnftrewarddatasource.md)

**The base URI to use for tokens if a URI resolver isn't provided.**

_The token ID will be concatenated onto the base URI to form the token URI._

#### Definition

```
/**
  @notice
  The base URI to use for tokens if a URI resolver isn't provided. 

  @dev 
  The token ID will be concatenated onto the base URI to form the token URI.
*/
string public override baseUri;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBNFTRewardDataSource`](/dev/api/interfaces/ijbnftrewarddatasource.md) interface.
