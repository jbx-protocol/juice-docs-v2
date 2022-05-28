# JBETHPaymentTerminal

:::caution
This page describes v2 contracts used before [a bug was identified](/docs/2022-05-24/). View the latest updates [here](https://juicebox.money/#/v2-bug-updates/).
:::

_Manages all inflows and outflows of ETH into the protocol ecosystem._

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBETHPaymentTerminal.sol

#### Addresses

Ethereum mainnet: [`0x2109e1CaF001980C318Ad7efdE8Fc204a844273b`](https://etherscan.io/address/0x2109e1CaF001980C318Ad7efdE8Fc204a844273b)

Ethereum rinkeby: [`0x53A92F883903a4C80bC47Cfed788c1a477dadc5c`](https://rinkeby.etherscan.io/address/0x53A92F883903a4C80bC47Cfed788c1a477dadc5c)

#### Inheritance

| Contract                                             | Description                                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBPayoutRedemptionPaymentTerminal`**](/protocol/api/interfaces/ijbpayoutredemptionpaymentterminal.md) | Generic terminal managing all inflows and outflows of funds into the protocol ecosystem. |

#### Constructor

```
/**
  @param _baseWeightCurrency The currency to base token issuance on.
  @param _operatorStore A contract storing operator assignments.
  @param _projects A contract which mints ERC-721's that represent project ownership and transfers.
  @param _directory A contract storing directories of terminals and controllers for each project.
  @param _splitsStore A contract that stores splits for each project.
  @param _prices A contract that exposes price feeds.
  @param _store A contract that stores the terminal's data.
  @param _owner The address that will own this contract.
*/
constructor(
  uint256 _baseWeightCurrency,
  IJBOperatorStore _operatorStore,
  IJBProjects _projects,
  IJBDirectory _directory,
  IJBSplitsStore _splitsStore,
  IJBPrices _prices,
  IJBSingleTokenPaymentTerminalStore _store,
  address _owner
)
  JBPayoutRedemptionPaymentTerminal(
    JBTokens.ETH,
    18, // 18 decimals.
    JBCurrencies.ETH,
    _baseWeightCurrency,
    JBSplitsGroups.ETH_PAYOUT,
    _operatorStore,
    _projects,
    _directory,
    _splitsStore,
    _prices,
    _store,
    _owner
  )
{}
```

* `_baseWeightCurrency` is the currency to base token issuance on. From [`JBCurrencies`](/protocol/api/libraries/jbcurrencies.md).
* `_operatorStore` is an [`IJBOperatorStore`](/protocol/api/interfaces/ijboperatorstore.md) contract storing operator assignments.
* `_projects` is an [`IJBProjects`](/protocol/api/interfaces/ijbprojects.md) contract which mints ERC-721's that represent project ownership and transfers.
* `_directory` is an [`IJBDirectory`](/protocol/api/interfaces/ijbdirectory.md) contract storing directories of terminals and controllers for each project.
* `_splitsStore` is an [`IJBSplitsStore`](/protocol/api/interfaces/ijbsplitsstore/) contract that stores splits for each project.
* `_prices` is an [`IJBPrices`](/protocol/api/interfaces/ijbprices.md) contract that exposes price feeds.
* `_store` is a contract that stores the terminal's data.
* `_owner` is the address that will own this contract.

#### Write

| Function                                                  | Definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`_transferFrom`**](/protocol/api/contracts/or-payment-terminals/jbethpaymentterminal/write/-_transferfrom.md) | <p><strong>Traits</strong></p><ul><li><code>internal</code></li></ul> <p><strong>Params</strong></p><ul><li><code>address _from</code></li><li><code>address payable _to</code></li><li><code>uint256 _amount</code></li></ul>                                                                                                                                                                                                                  |
| [**`_beforeTransferTo`**](/protocol/api/contracts/or-payment-terminals/jbethpaymentterminal/write/-_beforetransferto.md) | <p><strong>Traits</strong></p><ul><li><code>internal</code></li><li><code>virtual</code></li></ul> <p><strong>Params</strong></p><ul><li><code>address _to</code></li><li><code>uint256 _amount</code></li></ul>                                                                                                                                                                                                                  |
