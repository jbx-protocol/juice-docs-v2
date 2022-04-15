---
description: >-
 Sends ETH or ERC20's to a project treasury as it receives direct payments or has it's functions called.
---

# JBETHERC20ProjectPayer

_Inherit from this contract or borrow from its logic to forward ETH or ERC20's to project treasuries from within other contracts._

## Overview

### [Code](https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBETHERC20ProjectPayer.sol)

### **Addresses**

Ethereum mainnet: _Not yet deployed_

### **Interfaces**

| Name                                                 | Description                                                                                                                              |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBProjectPayer`**](/api/interfaces/ijbprojectpayer.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

### **Inheritance**

| Contract                                                                     | Description                                                                                                           |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [**`Ownable`**](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable) | Includes convenience functionality for specifying an address that owns the contract, with modifiers that only allow access by the owner. |

## Constructor

```
constructor(
  uint256 _defaultProjectId,
  address payable _defaultBeneficiary,
  bool _defaultPreferClaimedTokens,
  string memory _defaultMemo,
  bytes memory _defaultMetadata,
  bool _defaultPreferAddToBalance,
  IJBDirectory _directory,
  address _owner
) {
  defaultProjectId = _defaultProjectId;
  defaultBeneficiary = _defaultBeneficiary;
  defaultPreferClaimedTokens = _defaultPreferClaimedTokens;
  defaultMemo = _defaultMemo;
  defaultMetadata = _defaultMetadata;
  defaultPreferAddToBalance = _defaultPreferAddToBalance;
  directory = _directory;

  _transferOwnership(_owner);
}
```

* **Arguments:**
  * `_defaultProjectId` is the ID of the project whose treasury should be forwarded this contract's received payments.
  * `_defaultBeneficiary` is the address that'll receive the project's tokens.
  * `_defaultPreferClaimedTokens` is a flag indicating whether issued tokens should be automatically claimed into the beneficiary's wallet.
  * `_defaultMemo` is the memo that'll be passed along to the emitted event..
  * `_defaultMetadata` are bytes to send along to the project's data source and delegate, if provided.
  * `_defaultPreferAddToBalance` is a flag indicating if received payments should call the `pay` function or the `addToBalance` function of a project.
  * `_directory` is a contract storing directories of terminals and controllers for each project.
  * `_owner` is the address that will own the contract.

## Events

| Name                                                                                                      | Data                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`SetDefaultValues`**](/api/contracts/jbetherc20projectpayer/events/setdefaultvalues.md)                                                                          | <ul><li><code>uint256 indexed projectId</code></li><li><code>address indexed beneficiary</code></li><li><code>bool preferClaimedTokens</code></li><li><code>string memo</code></li><li><code>bytes metadata</code></li><li><code>bool preferAddToBalance</code></li><li><code>address caller</code></li></ul>                  |

## Properties

| Name                                                                                                        | Definition                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`directory`**](/api/contracts/jbetherc20projectpayer/properties/directory.md)                                                                          | <p><strong>Returns</strong></p><ul><li><code>[JBDirectory](/api/contracts/jbdirectory) directory</code></li></ul>                                                                                                |
| [**`defaultProjectId`**](/api/contracts/jbetherc20projectpayer/properties/defaultprojectid.md)                                                                          | <p><strong>Returns</strong></p><ul><li><code>uint256 defaultProjectId</code></li></ul>                                                                                                |
| [**`defaultBeneficiary`**](/api/contracts/jbetherc20projectpayer/properties/defaultbeneficiary.md)                                                                          | <p><strong>Returns</strong></p><ul><li><code>address defaultBeneficiary</code></li></ul>                                                                                                |
| [**`defaultPreferClaimedTokens`**](/api/contracts/jbetherc20projectpayer/properties/defaultpreferclaimedtokens.md)                                                                          | <p><strong>Returns</strong></p><ul><li><code>bool defaultPreferClaimedTokens</code></li></ul>                                                                                                |
| [**`defaultMemo`**](/api/contracts/jbetherc20projectpayer/properties/defaultmemo.md)                                                                          | <p><strong>Returns</strong></p><ul><li><code>string defaultMemo</code></li></ul>                                                                                                |
| [**`defaultMetadata`**](/api/contracts/jbetherc20projectpayer/properties/defaultmetadata.md)                                                                          | <p><strong>Returns</strong></p><ul><li><code>bytes defaultMetadata</code></li></ul>                                                                                                |
| [**`defaultPreferAddToBalance`**](/api/contracts/jbetherc20projectpayer/properties/defaultpreferaddtobalance.md)                                                                          | <p><strong>Returns</strong></p><ul><li><code>bool defaultPreferAddToBalance</code></li></ul>                                                                                                |

## Write

| Function                                                                                                     | Definition                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`receive`**](/api/contracts/jbetherc20projectpayer/write/pay.md)                                                                        | <p><strong>Traits</strong></p><ul><li><code>payable</code></li><li><code>virtual</code></li></ul>                                             |
| [**`setDefaultValues`**](/api/contracts/jbetherc20projectpayer/write/setdefaultvalues.md)                                                                        | <p><strong>Traits</strong></p><ul><li><code>[onlyOwner](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--)</code></li><li><code>virtual</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address payable _beneficiary</code></li><li><code>bool _preferClaimedTokens</code></li><li><code>string _memo</code></li><li><code>bytes _metadata</code></li></ul>                                             |
| [**`pay`**](/api/contracts/jbetherc20projectpayer/write/pay.md)                                                                        | <p><strong>Traits</strong></p><ul><li><code>payable</code></li><li><code>virtual</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _token</code></li><li>uint256 _amount</li><li><code>uint256 _decimals</code></li><li><code>address _beneficiary</code></li><li>uint256 _minReturnedTokens</li><li><code>bool _preferClaimedTokens</code></li><li>string _memo</li><li>bytes _metadata</li></ul>                                             |
| [**`addToBalance`**](/api/contracts/jbetherc20projectpayer/write/addtobalance.md)                                                                        | <p><strong>Traits</strong></p><ul><li><code>payable</code></li><li><code>virtual</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _token</code></li><li>uint256 _amount</li><li><code>uint256 _decimals</code></li><li>string _memo</li></ul>                                             |
