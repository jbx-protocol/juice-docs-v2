# tokenUriResolver

Contract: [`JBNFTRewardDelegate`](/dev/api/contracts/or-delegates/or-abstract/jbnftrewarddelegate/README.md)​‌

Interface: [`IJBNFTRewardDelegate`](/dev/api/interfaces/ijbnftrewarddelegate.md)

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
* The resulting function overrides a function definition from the [`IJBNFTRewardDelegate`](/dev/api/interfaces/ijbnftrewarddelegate.md) interface.
