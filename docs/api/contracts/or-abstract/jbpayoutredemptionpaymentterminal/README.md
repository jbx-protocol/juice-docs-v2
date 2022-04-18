# JBPayoutRedemptionPaymentTerminal

_Generic terminal managing all inflows and outflows of funds into the protocol ecosystem._

#### Traits

`abstract`

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/abstract/JBPayoutRedemptionPaymentTerminal.sol


#### Interfaces

| Name                                             | Description                                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBPayoutRedemptionPaymentTerminal`**](/api/interfaces/ijbpayoutredemptionpaymentterminal.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                                  | Description                                                                                                                              |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`JBSingleTokenPaymentTerminal`**](/api/contracts/or-abstract/jbsingletokenpaymentterminal/)               | Generic terminal managing all inflows of funds into the protocol ecosystem for one token. |
| [**`JBOperatable`**](/api/contracts/or-abstract/jboperatable/)               | Includes convenience functionality for checking a message sender's permissions before executing certain transactions. |
| [**`Ownable`**](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable) | Includes convenience functionality for checking a message sender's permissions before executing certain transactions. |
| [**`ReentrancyGuard`**](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard) | Contract module that helps prevent reentrant calls to a function. |


#### Constructor

```
/**
  @param _token The token that this terminal manages.
  @param _decimals The number of decimals the token fixed point amounts are expected to have.
  @param _currency The currency that this terminal's token adheres to for price feeds.
  @param _baseWeightCurrency The currency to base token issuance on.
  @param _payoutSplitsGroup The group that denotes payout splits from this terminal in the splits store.
  @param _operatorStore A contract storing operator assignments.
  @param _projects A contract which mints ERC-721's that represent project ownership and transfers.
  @param _directory A contract storing directories of terminals and controllers for each project.
  @param _splitsStore A contract that stores splits for each project.
  @param _prices A contract that exposes price feeds.
  @param _store A contract that stores the terminal's data.
  @param _owner The address that will own this contract.
*/
constructor(
  address _token,
  uint256 _decimals,
  uint256 _currency,
  uint256 _baseWeightCurrency,
  uint256 _payoutSplitsGroup,
  IJBOperatorStore _operatorStore,
  IJBProjects _projects,
  IJBDirectory _directory,
  IJBSplitsStore _splitsStore,
  IJBPrices _prices,
  IJBSingleTokenPaymentTerminalStore _store,
  address _owner
) JBSingleTokenPaymentTerminal(_token, _decimals, _currency) JBOperatable(_operatorStore) {
  baseWeightCurrency = _baseWeightCurrency;
  payoutSplitsGroup = _payoutSplitsGroup;
  projects = _projects;
  directory = _directory;
  splitsStore = _splitsStore;
  prices = _prices;
  store = _store;

  transferOwnership(_owner);
}
```

* `_token` is the token that this terminal manages.
* `_decimals` is the number of decimals the token fixed point amounts are expected to have.
* `_currency` is the currency that this terminal's token adheres to for price feeds. From [`JBCurrencies`](/api/libraries/jbcurrencies.md).
* `_baseWeightCurrency` is the currency to base token issuance on. From [`JBCurrencies`](/api/libraries/jbcurrencies.md).
* `_payoutSplitsGroup` is the group that denotes payout splits from this terminal in the splits store. From [`JBSplitGroups`](/api/libraries/jbsplitsgroups.md).
* `_operatorStore` is an [`IJBOperatorStore`](/api/interfaces/ijboperatorstore.md) contract storing operator assignments.
* `_projects` is an [`IJBProjects`](/api/interfaces/ijbprojects.md) contract which mints ERC-721's that represent project ownership and transfers.
* `_directory` is an [`IJBDirectory`](/api/interfaces/ijbdirectory.md) contract storing directories of terminals and controllers for each project.
* `_splitsStore` is an [`IJBSplitsStore`](/api/interfaces/ijbsplitsstore/) contract that stores splits for each project.
* `_prices` is an [`IJBPrices`](/api/interfaces/ijbprices.md) contract that exposes price feeds.
* `_store` is a contract that stores the terminal's data.
* `_owner` is the address that will own this contract.

#### Events

| Name                                                               | Data                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`AddToBalance`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/addtobalance.md)                       | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 amount</code></li><li><code>uint256 refundedFees</code></li><li><code>string memo</code></li><li><code>address caller</code></li></ul>                                                                                                                                                                                                                                                                                                                               |
| [**`Migrate`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/migrate.md)                                 | <ul><li><code>uint256 indexed projectId</code></li><li><code>[IJBPaymentTerminal](/api/interfaces/ijbpaymentterminal.md) indexed to</code></li><li><code>uint256 amount</code></li><li><code>address caller</code></li></ul>                                                                                                                                                                                                                                 |
| [**`DistributePayouts`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/distributepayouts.md)             | <ul><li><code>uint256 indexed fundingCycleConfiguration</code></li><li><code>uint256 indexed fundingCycleNumber</code></li><li><code>uint256 indexed projectId</code></li><li><code>address beneficiary</code></li><li><code>uint256 amount</code></li><li><code>uint256 distributedAmount</code></li><li><code>uint256 fee</code></li><li><code>uint256 beneficiaryDistributionAmount</code></li><li><code>string memo</code></li><li><code>address caller</code></li></ul>                                                                                       |
| [**`UseAllowance`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/useallowance.md)                       | <ul><li><code>uint256 indexed fundingCycleConfiguration</code></li><li><code>uint256 indexed fundingCycleNumber</code></li><li><code>uint256 indexed projectId</code></li><li><code>address beneficiary</code></li><li><code>uint256 amount</code></li><li><code>uint256 distributedAmount</code></li><li><code>uint256 netDistributedamount</code></li><li><code>string memo</code></li><li><code>address caller</code></li></ul>                                                                                                                            |
| [**`ProcessFees`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/processfees.md)                         | <ul><li><code>[JBFee](/api/data-structures/jbfee.md)[] fees</code></li><li><code>uint256 indexed projectId</code></li></ul>                                                                                                                                                                                                                                                                                                                         |
| [**`Pay`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/pay.md)                                         | <ul><li><code>uint256 indexed fundingCycleConfiguration</code></li><li><code>uint256 indexed fundingCycleNumber</code></li><li><code>uint256 indexed projectId</code></li><li><code>address beneficiary</code></li><li><code>uint256 amount</code></li><li><code>uint256 beneficiaryTokenCount</code></li><li><code>string memo</code></li><li><code>address payer</code></li><li><code>address caller</code></li></ul>        |
| [**`DelegateDidPay`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/delegatedidpay.md)                                         | <ul><li><code>[IJBPayDelegate](/api/interfaces/ijbpaydelegate.md) indexed delegate</code></li><li><code>[JBDidPayData](/api/data-structures/jbdidpaydata.md) data</code></li><li><code>address caller</code></li></ul>        |
| [**`RedeemTokens`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/redeemtokens.md)                       | <ul><li><code>uint256 indexed fundingCycleConfiguration</code></li><li><code>uint256 indexed fundingCycleNumber</code></li><li><code>uint256 indexed projectId</code></li><li><code>address holder</code></li><li><code>address beneficiary</code></li><li><code>uint256 tokenCount</code></li><li><code>uint256 reclaimedAmount</code></li><li><code>string memo</code></li><li><code>address caller</code></li></ul> |
| [**`DelegateDidRedeem`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/delegatedidredeem.md)                                         | <ul><li><code>[IJBRedemptionDelegate](/api/interfaces/ijbredemptiondelegate.md) indexed delegate</code></li><li><code>[JBDidRedeemData](/api/data-structures/jbdidredeemdata.md) data</code></li><li><code>address caller</code></li></ul>        |
| [**`DistributeToPayoutSplit`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/distributetopayoutsplit.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>uint256 indexed domain</code></li><li><code>uint256 indexed group</code></li><li><code>[JBSplit](/api/data-structures/jbsplit.md) split</code></li><li><code>uint256 amount</code></li><li><code>address caller</code></li></ul>                                                                                                                                                                                           |
| [**`SetFee`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/setfee.md)                                                 | <ul><li><code>uint256 fee</code></li><li><code>address caller</code></li></ul>                                                                                                                                                                                                                                            |
| [**`SetFeeGauge`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/setfeegauge.md) | <ul><li><code>[IJBFeeGauge](/api/interfaces/ijbfeegauge.md) indexed feeGauge</code></li><li><code>address caller</code></li></ul> |

| [**`SetFeelessTerminal`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/events/setfeelessterminal.md) | <ul><li><code>[IJBPaymentTerminal](/api/interfaces/ijbpaymentterminal.md) indexed terminal</code></li><li><code>bool indexed flag</code></li><li><code>address caller</code></li></ul> |

#### Properties

| Function                                                                  | Definition                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`projects`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/projects.md)                                  | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBProjects](/api/interfaces/ijbprojects.md) projects</code></li></ul>                                     |
| [**`directory`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/directory.md)                                | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBDirectory](/api/interfaces/ijbdirectory.md) directory</code></li></ul>                                  |
| [**`splitStore`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/splitstore.md) | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBSplitsStore](/api/interfaces/ijbsplitsstore.md) splitsStore</code></li></ul>                            |
| [**`prices`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/prices.md) | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBPrices](/api/interfaces/ijbprices.md) prices</code></li></ul>                            |
| [**`store`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/store.md)                                        | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBSingleTokenPaymentTerminalStore](/api/interfaces/ijbsingletokenpaymentterminalstore.md) store</code></li></ul> |
| [**`baseWeightCurrency`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/baseweightcurrency.md)                                        | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 baseWeightCurrency</code></li></ul> |
| [**`payoutSplitsGroup`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/payoutsplitsgroup.md)                                        | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 payoutSplitsGroup</code></li></ul> |
| [**`fee`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/fee.md)                                        | <p><strong>Returns</strong></p><ul><li><code>uint256 store</code></li></ul> |
| [**`feeGauge`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/feegauge.md)                                        | <p><strong>Params</strong></p><ul><li><code>[IJBPaymentTerminal](/api/interfaces/ijbpaymentterminal.md) terminal</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBFeeGauge](/api/interfaces/ijbfeegauge.md) feeGauge</code></li></ul> |
| [**`isFeelessTerminal`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/properties/isfeelessterminal.md)                                        | <p><strong>returns</strong></p><ul><li><code>bool</code></li></ul> |


#### Read

| Function                                   | Definition                                                                                                                                                                                                                            |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`currentEthOverflowOf`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/read/currentethoverflowof) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 ethOverflow</code></li></ul>                                                                        |
| [**`heldFeesOf`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/read/heldfeesof.md)     | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBFee](/api/data-structures/jbfee.md)[] fees</code></li></ul> |

#### Write

| Function                                                  | Definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`pay`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/pay.md)                                 | <p><strong>Traits</strong></p><ul><li><code>payable</code></li><li><code>virtual</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li><li><code>address _token</code></li><li><code>address _beneficiary</code></li><li><code>uint256 _minReturnedTokens</code></li><li><code>bool _preferClaimedTokens</code></li><li><code>string _memo</code></li><li><code>bytes _metadata</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 beneficiaryTokenCount</code></li></ul>                                                                                                                                                          |
| [**`distributePayoutsOf`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/distributepayoutsof.md) | <p><strong>Traits</strong></p><ul><li><code>virtual</code></li></ul> <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li><li><code>uint256 _currency</code></li><li><code>uint256 _minReturnedTokens</code></li><li><code>string _memo</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 netLeftoverDistributionAmount</code></li></ul>                                                                                                                                                                                                                  |
| [**`useAllowanceOf`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/useallowanceof.md)           | <p><strong>Traits</strong></p><ul><li><code>[requirePermission](/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md)</code></li><li><code>virtual</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li><li><code>uint256 _currency</code></li><li><code>uint256 _minReturnedTokens</code></li><li><code>address payable _beneficiary</code></li><li><code>string _memo</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 netDistributedAmount</code></li></ul>                                                                               |
| [**`redeemTokensOf`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/redeemtokensof.md)           | <p><strong>Traits</strong></p><ul><li><code>[requirePermission](/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md)</code></li><li><code>virtual</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _holder</code></li><li><code>uint256 _projectId</code></li><li><code>uint256 _tokenCount</code></li><li><code>uint256 _minReturnedTokens</code></li><li><code>address payable _beneficiary</code></li><li><code>string _memo</code></li><li><code>bytes _metadata</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 reclaimAmount</code></li></ul> |
| [**`migrate`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/migrate.md)                         | <p><strong>Traits</strong></p><ul><li><code>[requirePermission](/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md)</code></li><li><code>virtual</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>[IJBPaymentTerminal](/api/interfaces/ijbpaymentterminal.md) _to</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 balance</code></li></ul>                                                                                                                                                                                                                             |
| [**`addToBalanceOf`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/addtobalanceof.md)           | <p><strong>Traits</strong></p><ul><li><code>payable</code></li><li><code>virtual</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li><li><code>address _token</code></li><li><code>string _memo</code></li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [**`processFees`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/processfees.md)                 | <p><strong>Traits</strong></p><ul><li><code>[requirePermissionAllowingOverride](/api/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md)</code></li><li><code>virtual</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul>                                                                                                                                                                                                                                                                                                                                                |
| [**`setFee`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/setfee.md)                 | <p><strong>Traits</strong></p><ul><li><code>[onlyOwner](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--)</code></li><li><code>virtual</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _fee</code></li></ul>                                                                                                                                                                                                                                                                                                                                                |
| [**`setFeeGauge`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/setfeegauge.md)                 | <p><strong>Traits</strong></p><ul><li><code>[onlyOwner](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--)</code></li><li><code>virtual</code></li></ul><p><strong>Params</strong></p><ul><li><code>[IJBFeeGauge](/api/interfaces/ijbfeegauge.md) _feeGauge</code></li></ul>                                                                                                                                                                                                                                                                                                                                                |
| [**`setFeelessTerminal`**](/api/contracts/or-abstract/jbpayoutredemptionpaymentterminal/write/setfeelessterminal.md)                 | <p><strong>Traits</strong></p><ul><li><code>[onlyOwner](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--)</code></li><li><code>virtual</code></li></ul><p><strong>Params</strong></p><ul><li><code>[IJBPaymentTerminal](/api/interfaces/ijbpaymentterminal.md) _terminal</code></li><li><code>bool _flag</code></li></ul>                                                                                                                                                                                                                                                                                                                                                |
