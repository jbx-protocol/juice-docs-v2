---
description: >-
  Keeps a reference of which terminal contracts each project is currently accepting funds through, and which controller contract is managing each project's tokens and funding cycles.
---

# JBDirectory

## Overview

### [Code](https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBDirectory.sol)

### **Addresses**

Ethereum mainnet: _Not yet deployed_

### **Interfaces**

| Name                                                   | Description                                                                                                                              |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBDirectory`**](/protocol/api/interfaces/ijbdirectory.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

### **Inheritance**

| Contract                               | Description                                                                                                                                                            |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`JBOperatable`**](/protocol/api/contracts/or-abstract/jboperatable/) | Includes convenience functionality for checking a message sender's permissions before executing certain transactions. |
| [**`Ownable`**](https://docs.openzeppelin.com/contracts/4.x/api/security) | Includes convenience functionality for checking a message sender's permissions before executing certain transactions. |

## Constructor

```solidity
constructor(IJBOperatorStore _operatorStore, IJBProjects _projects) JBOperatable(_operatorStore) {
  projects = _projects;
}
```

* **Arguments:**
  * `_operatorStore` is an [`IJBOperatorStore`](/protocol/api/interfaces/ijboperatorstore.md) contract storing operator assignments.
  * `_projects` is an [`IJBProjects`](/protocol/api/interfaces/ijbprojects.md) contract which mints ERC-721's that represent project ownership and transfers.
  * `_owner` is the address that will own the contract.

## Events

| Name                                                     | Data                                                                                                                                                                                                                                                |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`SetController`**](/protocol/api/contracts/jbdirectory/events/setcontroller.md)           | <ul><li><code>int256 indexed projectId</code></li><li><code>[IJBController](/protocol/api/interfaces/ijbcontroller.md) indexed controller</code></li><li><code>address caller</code></li></ul>                                       |
| [**`AddTerminal`**](/protocol/api/contracts/jbdirectory/events/addterminal.md)               | <ul><li><code>uint256 indexed projectId</code></li><li><code>[IJBPaymentTerminal](/protocol/api/interfaces/ijbpaymentterminal.md) indexed terminal</code></li><li><code>address caller</code></li></ul>                                            |
| [**`SetTerminals`**](/protocol/api/contracts/jbdirectory/events/setterminals.md)         | <ul><li><code>uint256 indexed projectId</code></li><li><code>[IJBPaymentTerminal](/protocol/api/interfaces/ijbpaymentterminal.md)[] indexed terminals</code></li><li><code>address caller</code></li></ul>                                            |
| [**`SetPrimaryTerminal`**](/protocol/api/contracts/jbdirectory/events/setprimaryterminal.md) | <ul><li><code>uint256 indexed projectId</code></li><li><code>address indexed token</code></li><li><code>[IJBPaymentTerminal](/protocol/api/interfaces/ijbpaymentterminal.md) indexed terminal</code></li><li><code>address caller</code></li></ul> |
| [**`SetIsAllowedToSetFirstController`**](/protocol/api/contracts/jbdirectory/events/setisallowedtosetfirstcontroller.md) | <ul><li><code>address indexed addr</code></li><li><code>bool indexed flag</code></li><li><code>address caller</code></li></ul> |

## Properties

| Function                                                                                   | Definition                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`projects`**](/protocol/api/contracts/jbdirectory/properties/projects.md) | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBProjects](/protocol/api/interfaces/ijbprojects.md) projects</code></li></ul> |
| [**`controllerOf`**](/protocol/api/contracts/jbdirectory/properties/controllerof.md)                                           | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBController](/protocol/api/interfaces/ijbcontroller.md) controllerOf</code></li></ul> |
| [**`isAllowedToSetFirstController`**](/protocol/api/contracts/jbdirectory/properties/isallowedtosetfirstcontroller.md)                                           | <p><strong>Params</strong></p><ul><li><code>address _address</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool isAllowedToSetFirstController</code></li></ul> |

## Read

| Function                                                   | Definition                                                                                                                                                                                                                                                      |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`terminalsOf`**](/protocol/api/contracts/jbdirectory/read/terminalsof.md)                   | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBPaymentTerminal](/protocol/api/interfaces/ijbpaymentterminal.md)[] terminals</code></li></ul>                                 |
| [**`isTerminalOf`**](/protocol/api/contracts/jbdirectory/read/isterminalof.md)                 | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>[IJBPaymentTerminal](/protocol/api/interfaces/ijbpaymentterminal.md) terminal</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool isTerminal</code></li></ul>                                                                                                    |
| [**`primaryTerminalOf`**](/protocol/api/contracts/jbdirectory/read/primaryterminalof.md)       | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _token</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBPaymentTerminal](/protocol/api/interfaces/ijbpaymentterminal.md) terminal</code></li></ul> |

## Write

| Function                                                    | Definition                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`setControllerOf`**](/protocol/api/contracts/jbdirectory/write/setcontrollerof.md)           | <p><strong>Traits</strong></p><ul><li><code>[requirePermissionAllowingOverride](/protocol/api/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>[IJBController](/protocol/api/interfaces/ijbcontroller.md) _controller</code></li></ul> |
| [**`setTerminalsOf`**](/protocol/api/contracts/jbdirectory/write/setterminalsof.md)               | <p><strong>Traits</strong></p><ul><li><code>[requirePermissionAllowingOverride](/protocol/api/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>[IJBPaymentTerminal](/protocol/api/interfaces/ijbpaymentterminal.md)[] _terminals</code></li></ul>       |
| [**`setPrimaryTerminalOf`**](/protocol/api/contracts/jbdirectory/write/setprimaryterminalof.md) | <p><strong>Traits</strong></p><ul><li><code>[requirePermission](/protocol/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>[IJBPaymentTerminal](/protocol/api/interfaces/ijbpaymentterminal.md) _terminal</code></li></ul>                                       |
| [**`setIsAllowedToSetFirstController`**](/protocol/api/contracts/jbdirectory/write/setisallowedtosetfirstcontroller.md) | <p><strong>Traits</strong></p><ul><li><code>[onlyOwner](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _address</code></li><li><code>bool _flag</code></li></ul>                                       |
