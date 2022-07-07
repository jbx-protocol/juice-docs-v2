# tokenUriResolver

Contract: [`JBNFTRewardDataSource`](/dev/api/contracts/or-data-sources/or-abstract/jbnftrewarddatasource/README.md)​‌

Interface: [`IJBNFTRewardDataSource`](/dev/api/interfaces/ijbnftrewarddatasource.md)

**Custom token URI resolver, superceeds base URI.**

#### Definition

```
/**
  @notice
  Custom token URI resolver, superceeds base URI.
*/
IJBTokenUriResolver public override tokenUriResolver;
```

* Once set the value cannot be changed.
* The resulting view function can be accessed externally by anyone.
* The resulting function overrides a function definition from the [`IJBNFTRewardDataSource`](/dev/api/interfaces/ijbnftrewarddatasource.md) interface.
