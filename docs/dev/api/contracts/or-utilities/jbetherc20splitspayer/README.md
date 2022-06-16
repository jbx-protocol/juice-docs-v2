# JBETHERC20SplitsPayer

_Sends ETH or ERC20's to a group of splits as it receives direct payments or has its functions called._

_Inherit from this contract or borrow from its logic to forward ETH or ERC20's to a group of splits from within other contracts._

#### Code 

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBETHERC20SplitsPayer.sol

#### Addresses

_There can be several instances of this contract deployed._

#### Interfaces

| Name                                                 | Description                                                                                                                              |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBSplitsPayer`**](/api/interfaces/ijbsplitspayer.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                                     | Description                                                                                                           |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [**`JBETHERC20ProjectPayer`**](/api/contracts/or-utilities/jbetherc20projectpayer) | Sends ETH or ERC20's to a project treasury as it receives direct payments or has it's functions called. |
| [**`ReentrancyGuard`**](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard) | Contract module that helps prevent reentrant calls to a function. |
| [**`ERC165`**](https://docs.openzeppelin.com/contracts/2.x/api/introspection#ERC165)                            |  Introspection on interface adherance.                      |

#### Constructor

```
/** 
  @param _defaultSplitsProjectId The ID of project for which the default splits are stored.
  @param _defaultSplitsDomain The splits domain to payout when this contract receives direct payments.
  @param _defaultSplitsGroup The splits group to payout when this contract receives direct payments.
  @param _splitsStore A contract that stores splits for each project.
  @param _defaultProjectId The ID of the project whose treasury should be forwarded the splits payer contract's received payment leftovers after distributing to the default splits group.
  @param _defaultBeneficiary The address that'll receive the project's tokens. 
  @param _defaultPreferClaimedTokens A flag indicating whether issued tokens should be automatically claimed into the beneficiary's wallet. 
  @param _defaultMemo A memo to pass along to the emitted event, and passed along the the funding cycle's data source and delegate.  A data source can alter the memo before emitting in the event and forwarding to the delegate.
  @param _defaultMetadata Bytes to send along to the project's data source and delegate, if provided.
  @param _preferAddToBalance  A flag indicating if received payments should call the `pay` function or the `addToBalance` function of a project.
  @param _owner The address that will own the contract.
*/
constructor(
  uint256 _defaultSplitsProjectId,
  uint256 _defaultSplitsDomain,
  uint256 _defaultSplitsGroup,
  IJBSplitsStore _splitsStore,
  uint256 _defaultProjectId,
  address payable _defaultBeneficiary,
  bool _defaultPreferClaimedTokens,
  string memory _defaultMemo,
  bytes memory _defaultMetadata,
  bool _preferAddToBalance,
  address _owner
)
  JBETHERC20ProjectPayer(
    _defaultProjectId,
    _defaultBeneficiary,
    _defaultPreferClaimedTokens,
    _defaultMemo,
    _defaultMetadata,
    _preferAddToBalance,
    _splitsStore.directory(),
    _owner
  )
{
  defaultSplitsProjectId = _defaultSplitsProjectId;
  defaultSplitsDomain = _defaultSplitsDomain;
  defaultSplitsGroup = _defaultSplitsGroup;
  splitsStore = _splitsStore;
}
```

* `_defaultSplitsProjectId` is the ID of project for which the default splits are stored.
* `_defaultSplitsDomain` is the splits domain to payout when this contract receives direct payments.
* `_defaultSplitsGroup` is the splits group to payout when this contract receives direct payments.
* `_splitsStore` is a contract that stores splits for each project.
* `_defaultProjectId` is the ID of the project whose treasury should be forwarded the splits payer contract's received payment leftovers after distributing to the default splits group.
* `_defaultBeneficiary` is the address that'll receive the project's tokens. 
* `_defaultPreferClaimedTokens` is a flag indicating whether issued tokens should be automatically claimed into the beneficiary's wallet. 
* `_defaultMemo` is a memo to pass along to the emitted event, and passed along the the funding cycle's data source and delegate.  A data source can alter the memo before emitting in the event and forwarding to the delegate.
* `_defaultMetadata` are bytes to send along to the project's data source and delegate, if provided.
* `_defaultPreferAddToBalance` is a flag indicating if received payments should call the `pay` function or the `addToBalance` function of a project.
* `_owner` is the address that will own the contract.

#### Events

| Name                                                                                                      | Data                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`SetDefaultSplits`**](/api/contracts/or-utilities/jbetherc20splitspayer/events/setdefaultsplits.md)                                                                          | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed domain</code></li><li><code>uint256 indexed group</code></li><li><code>address caller</code></li></ul>                  |
| [**`Pay`**](/api/contracts/or-utilities/jbetherc20splitspayer/events/pay.md)                                                                          | <ul><li><code>uint256 indexed projectId</code></li><li><code>address beneficiary</code></li><li><code>address token</code></li><li><code>uint256 amount</code></li><li><code>uint256 decimals</code></li><li><code>uint256 leftoverAmount</code></li><li><code>uint256 minReturnedTokens</code></li><li><code>bool preferClaimedTokens</code></li><li><code>string memo</code></li><li><code>bytes metadata</code></li><li><code>address caller</code></li></ul>                  |
| [**`AddToBalance`**](/api/contracts/or-utilities/jbetherc20splitspayer/events/addtobalance.md)                                                                          | <ul><li><code>uint256 indexed projectId</code></li><li><code>address beneficiary</code></li><li><code>address token</code></li><li><code>uint256 amount</code></li><li><code>uint256 decimals</code></li><li><code>uint256 leftoverAmount</code></li><li><code>string memo</code></li><li><code>bytes metadata</code></li><li><code>address caller</code></li></ul>                  |
| [**`DistributeToSplit`**](/api/contracts/or-utilities/jbetherc20splitspayer/events/distributetosplit.md)                                                                          | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed domain</code></li><li><code>uint256 indexed group</code></li><li><code>[JBSplit](/api/data-structures/jbsplit.md) split</code></li><li><code>uint256 amount</code></li><li><code>address caller</code></li></ul>                  |

#### Properties

| Name                                                                                                        | Definition                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`splitsStore`**](/api/contracts/or-utilities/jbetherc20splitspayer/properties/splitsstore.md)                                                                          | <p><strong>Returns</strong></p><ul><li><code>[JBSplitsStore](/api/contracts/jbsplitsstore) splitsStore</code></li></ul>                                                                                                |
| [**`defaultSplitsProjectId`**](/api/contracts/or-utilities/jbetherc20splitspayer/properties/defaultsplitsprojectid.md)                                                                          | <p><strong>Returns</strong></p><ul><li><code>uint256 defaultSplitsProjectId</code></li></ul>                                                                                                |
| [**`defaultSplitsDomain`**](/api/contracts/or-utilities/jbetherc20splitspayer/properties/defaultsplitsdomain.md)                                                                          | <p><strong>Returns</strong></p><ul><li><code>uint256 defaultSplitsDomain</code></li></ul>                                                                                                |
| [**`defaultSplitsGroup`**](/api/contracts/or-utilities/jbetherc20splitspayer/properties/defaultsplitsgroup.md)                                                                          | <p><strong>Returns</strong></p><ul><li><code>uint256 defaultSplitsGroup</code></li></ul>                                                                                                |

#### Read

| Function                                                       | Definition                                                                                                                                                                                                             |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`supportsInterface`**](/api/contracts/or-utilities/jbetherc20splitspayer/read/supportsinterface.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _interfaceId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool</code></li></ul> |

#### Write

| Function                                                                                                     | Definition                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`receive`**](/api/contracts/or-utilities/jbetherc20splitspayer/write/pay.md)                                                                        | <p><strong>Traits</strong></p><ul><li><code>payable</code></li><li><code>virtual</code></li></ul>                                             |
| [**`setDefaultSplits`**](/api/contracts/or-utilities/jbetherc20splitspayer/write/setdefaultsplits.md)                                                                        | <p><strong>Traits</strong></p><ul><li><code>[onlyOwner](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--)</code></li><li><code>virtual</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _domain</code></li><li><code>uint256 _group</code></li></ul>                                             |
| [**`pay`**](/api/contracts/or-utilities/jbetherc20splitspayer/write/pay.md)                                                                        | <p><strong>Traits</strong></p><ul><li><code>payable</code></li><li><code>virtual</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _token</code></li><li><code>uint256 _amount</code></li><li><code>uint256 _decimals</code></li><li><code>address _beneficiary</code></li><li><code>uint256 _minReturnedTokens</code></li><li><code>bool _preferClaimedTokens</code></li><li><code>string _memo</code></li><li><code>bytes _metadata</code></li></ul>                                             |
| [**`addToBalanceOf`**](/api/contracts/or-utilities/jbetherc20splitspayer/write/addtobalanceof.md)                                                                        | <p><strong>Traits</strong></p><ul><li><code>payable</code></li><li><code>virtual</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _token</code></li><li><code>uint256 _amount</code></li><li><code>uint256 _decimals</code></li><li><code>string _memo</code></li><li><code>bytes _metadata</code></li></ul>                                             |
| [**`_payToSplits`**](/api/contracts/or-utilities/jbetherc20splitspayer/write/-_paytosplits.md)                                                                        | <p><strong>Traits</strong></p><ul><li><code>internal</code></li><li><code>virtual</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _splitsProjectId</code></li><li><code>uint256 _splitsDomain</code></li><li><code>uint256 _splitsGroup</code></li><li><code>address _token</code></li><li><code>uint256 _amount</code></li><li><code>uint256 _decimals</code></li></ul>                                            |
