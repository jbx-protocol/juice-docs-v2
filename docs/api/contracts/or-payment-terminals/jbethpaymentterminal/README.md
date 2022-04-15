---
description: Manages all inflows and outflows of ETH into the protocol ecosystem.
---

# JBETHPaymentTerminal

## Overview

### [Code](https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBETHPaymentTerminal.sol)

### **Addresses**

Ethereum mainnet: _Not yet deployed_

### **Inheritance**

| Contract                                             | Description                                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBPayoutRedemptionPaymentTerminal`**](/api/interfaces/ijbpayoutredemptionpaymentterminal.md) | Generic terminal managing all inflows and outflows of funds into the protocol ecosystem. |

## Constructor

```
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

* **Arguments:**
  * `_baseWeightCurrency` is the currency to base token issuance on. From [`JBCurrencies`](/api/libraries/jbcurrencies.md).
  * `_operatorStore` is an [`IJBOperatorStore`](/api/interfaces/ijboperatorstore.md) contract storing operator assignments.
  * `_projects` is an [`IJBProjects`](/api/interfaces/ijbprojects.md) contract which mints ERC-721's that represent project ownership and transfers.
  * `_directory` is an [`IJBDirectory`](/api/interfaces/ijbdirectory.md) contract storing directories of terminals and controllers for each project.
  * `_splitsStore` is an [`IJBSplitsStore`](/api/interfaces/ijbsplitsstore/) contract that stores splits for each project.
  * `_prices` is an [`IJBPrices`](/api/interfaces/ijbprices.md) contract that exposes price feeds.
  * `_store` is a contract that stores the terminal's data.
  * `_owner` is the address that will own this contract.
