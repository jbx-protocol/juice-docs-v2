# JBSingleTokenPaymentTerminalStore

_Manages all bookkeeping for inflows and outflows of funds from any [`IJBSingleTokenPaymentTerminal`](/protocol/api/interfaces/ijbsingletokenpaymentterminal.md)._

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBSingleTokenPaymentTerminalStore.sol

#### Addresses

Ethereum mainnet: [`0x96a594ABE6B910E05E486b63B32fFe29DA5d33f7`](https://etherscan.io/address/0x96a594ABE6B910E05E486b63B32fFe29DA5d33f7)

Ethereum rinkeby: [`0x5d4eb71749DD9984118EBdF96aaF3CF6EAE1A745`](https://rinkeby.etherscan.io/address/0x5d4eb71749DD9984118EBdF96aaF3CF6EAE1A745)

#### Interfaces

| Name                                             | Description                                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBSingleTokenPaymentTerminalStore`**](/protocol/api/interfaces/ijbsingletokenpaymentterminalstore.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Inheritance

| Contract                                                                  | Description                                                                                                                              |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`ReentrancyGuard`**](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard) | Contract module that helps prevent reentrant calls to a function. |

#### Constructor

```
/**
  @param _directory A contract storing directories of terminals and controllers for each project.
  @param _fundingCycleStore A contract storing all funding cycle configurations.
  @param _prices A contract that exposes price feeds.
*/
constructor(
  IJBDirectory _directory,
  IJBFundingCycleStore _fundingCycleStore,
  IJBPrices _prices
) {
  directory = _directory;
  fundingCycleStore = _fundingCycleStore;
  prices = _prices;
}
```

* `_directory` is an [`IJBDirectory`](/protocol/api/interfaces/ijbdirectory.md) contract storing directories of terminals and controllers for each project.
* `_fundingCycleStore` is an [`IJBFundingCycleStore`](/protocol/api/interfaces/ijbfundingcyclestore.md) contract storing all funding cycle configurations.
* `_prices` is an [`IJBPrices`](/protocol/api/interfaces/ijbprices.md) contract that exposes price feeds.

#### Properties

| Function                                                                 | Definition                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`directory`**](/protocol/api/contracts/jbsingletokenpaymentterminalstore/properties/directory.md)                               | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBDirectory](/protocol/api/interfaces/ijbdirectory.md) directory</code></li></ul>                         |
| [**`fundingCycleStore`**](/protocol/api/contracts/jbsingletokenpaymentterminalstore/properties/fundingcyclestore.md)               | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBFundingCycleStore](/protocol/api/interfaces/ijbfundingcyclestore.md) fundingCycleStore</code></li></ul> |
| [**`prices`**](/protocol/api/contracts/jbsingletokenpaymentterminalstore/properties/prices.md)                                     | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBPrices](/protocol/api/interfaces/ijbprices.md) prices</code></li></ul>                                  |
| [**`balanceOf`**](/protocol/api/contracts/jbsingletokenpaymentterminalstore/properties/balanceof.md)                               | <p><strong>Params</strong></p><ul><li><code>[IJBSingleTokenPaymentTerminal](/protocol/api/interfaces/ijbpaymentterminal.md) _terminal</code></li><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 balance</code></li></ul>                                                                                     |
| [**`usedOverflowAllowanceOf`**](/protocol/api/contracts/jbsingletokenpaymentterminalstore/properties/usedoverflowallowanceof.md)   | <p><strong>Params</strong></p><ul><li><code>[IJBSingleTokenPaymentTerminal](/protocol/api/interfaces/ijbpaymentterminal.md) _terminal</code></li><li><code>uint256 _projectId</code></li><li><code>uint256 _configuration</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 usedOverflowAllowance</code></li></ul>                           |
| [**`usedDistributionLimitOf`**](/protocol/api/contracts/jbsingletokenpaymentterminalstore/properties/useddistributionlimitof.md) | <p><strong>Params</strong></p><ul><li><code>[IJBSingleTokenPaymentTerminal](/protocol/api/interfaces/ijbpaymentterminal.md) _terminal</code></li><li><code>uint256 _projectId</code></li><li><code>uint256 _fundingCycleId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 usedDistributionLimitOf</code></li></ul>                       |

#### Read

| Function                                                       | Definition                                                                                                                                                                                                      |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`currentOverflowOf`**](/protocol/api/contracts/jbsingletokenpaymentterminalstore/read/currentoverflowof.md)           | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 currentOverflow</code></li></ul>                                            |
| [**`currentTotalOverflowOf`**](/protocol/api/contracts/jbsingletokenpaymentterminalstore/read/currenttotaloverflowof.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 currentTotalOverflow</code></li></ul>                                       |
| [**`currentReclaimableOverflowOf`**](/protocol/api/contracts/jbsingletokenpaymentterminalstore/read/currentreclaimableoverflowof1.md)       | <p><strong>Params</strong></p><ul><li><code>[IJBSingleTokenPaymentTerminal](/protocol/api/interfaces/ijbpaymentterminal.md) _terminal</code></li><li><code>uint256 _projectId</code></li><li><code>uint256 _tokenCount</code></li><li><code>bool _useTotalOverflow</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 reclaimableOverflow</code></li></ul> |
| [**`currentReclaimableOverflowOf`**](/protocol/api/contracts/jbsingletokenpaymentterminalstore/read/currentreclaimableoverflowof2.md)       | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _tokenCount</code></li><li><code>uint256 _totalSupply</code></li><li><code>uint256 _overflow</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 reclaimableOverflow</code></li></ul> |

#### Write

| Function                                                      | Definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`recordPaymentFrom`**](/protocol/api/contracts/jbsingletokenpaymentterminalstore/write/recordpaymentfrom.md)         | <p><strong>Traits</strong></p><ul><li><code>[nonReentrant](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard-nonReentrant--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _payer</code></li><li><code>[JBTokenAmount](/protocol/api/data-structures/jbtokenamount.md) _amount</code></li><li><code>uint256 _projectId</code></li><li><code>address _beneficiary</code></li><li><code>uint256 _baseWeightCurrency</code></li><li><code>address _beneficiary</code></li><li><code>string _memo</code></li><li><code>bytes _metadata</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBFundingCycle](/protocol/api/data-structures/jbfundingcycle.md) fundingCycle</code></li><li><code>uint256 tokenCount</code></li><li><code>[IJBPayDelegate](/protocol/api/interfaces/ijbpaydelegate.md) delegate</code></li><li><code>string memo</code></li></ul> |
| [**`recordDistributionFor`**](/protocol/api/contracts/jbsingletokenpaymentterminalstore/write/recorddistributionfor.md) | <p><strong>Traits</strong></p><ul><li><code>[nonReentrant](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard-nonReentrant--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li><li><code>uint256 _currency</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBFundingCycle](/protocol/api/data-structures/jbfundingcycle.md) fundingCycle</code></li><li><code>uint256 distributedAmount</code></li></ul>                                                                                                                                                                                                                |
| [**`recordUsedAllowanceOf`**](/protocol/api/contracts/jbsingletokenpaymentterminalstore/write/recordusedallowanceof.md) | <p><strong>Traits</strong></p><ul><li><code>[nonReentrant](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard-nonReentrant--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li><li><code>uint256 _currency</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBFundingCycle](/protocol/api/data-structures/jbfundingcycle.md) fundingCycle</code></li><li><code>uint256 usedAmount</code></li></ul>                                                                                                                                                                                                                |
| [**`recordRedemptionFor`**](/protocol/api/contracts/jbsingletokenpaymentterminalstore/write/recordredemptionfor.md)     | <p><strong>Traits</strong></p><ul><li><code>[nonReentrant](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard-nonReentrant--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _holder</code></li><li><code>uint256 _projectId</code></li><li><code>uint256 _tokenCount</code></li><li><code>address payable _beneficiary</code></li><li><code>string _memo</code></li><li><code>bytes _metadata</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[JBFundingCycle](/protocol/api/data-structures/jbfundingcycle.md) fundingCycle</code></li><li><code>uint256 reclaimAmount</code></li><li><code>[IJBRedemptionDelegate](/protocol/api/interfaces/ijbredemptiondelegate.md) delegate</code></li><li><code>string memo</code></li></ul>                                                |
| [**`recordAddedBalanceFor`**](/protocol/api/contracts/jbsingletokenpaymentterminalstore/write/recordaddedbalancefor.md) | <p><strong>Traits</strong></p><ul><li><code>[nonReentrant](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard-nonReentrant--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li></ul>                                                                                                                                                                                                                                                                                                                                                 |
| [**`recordMigration`**](/protocol/api/contracts/jbsingletokenpaymentterminalstore/write/recordmigration.md)             | <p><strong>Traits</strong></p><ul><li><code>[nonReentrant](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard-nonReentrant--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 balance</code></li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
