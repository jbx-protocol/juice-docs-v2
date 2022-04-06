---
description: >-
   Stores operator permissions for all addresses. Addresses can give permissions to any other address to take specific indexed actions on their behalf.
---

# JBOperatorStore

## Overview

### [Code](https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBOperatorStore.sol)

### **Addresses**

Ethereum mainnet: _Not yet deployed_

### **Interfaces**

| Name                                                           | Description                                                                                                                              |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBOperatorStore`**](/api/interfaces/ijboperatorstore.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

## Events

| Name                                       | Data                                                                                                                                                                                                                                  |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`SetOperator`**](/api/contracts/jboperatorstore/events/setoperator.md) | <ul><li><code>address indexed operator</code></li><li><code>address indexed account</code></li><li><code>uint256 indexed domain</code></li><li><code>uint256[] permissionIndexes</code></li><li><code>uint256 packed</code></li></ul> |

## Properties

| Function                                           | Definition                                                                                                                                                                                                                                 |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`permissionsOf`**](/api/contracts/jboperatorstore/properties/permissionsof.md) | <p><strong>Params</strong></p><ul><li><code>address _operator</code></li><li><code>address _account</code></li><li><code>uint256 _domain</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 permissions</code></li></ul> |

## Read

| Function                                       | Definition                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`hasPermission`**](/api/contracts/jboperatorstore/read/haspermission.md)   | <p><strong>Params</strong></p><ul><li><code>address _operator</code></li><li><code>address _account</code></li><li><code>uint256 _domain</code></li><li><code>uint256 _permissionIndex</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool hasPermission</code></li></ul>      |
| [**`hasPermissions`**](/api/contracts/jboperatorstore/read/haspermissions.md) | <p><strong>Params</strong></p><ul><li><code>address _operator</code></li><li><code>address _account</code></li><li><code>uint256 _domain</code></li><li><code>uint256[] _permissionIndexes</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool hasPermissions</code></li></ul> |

## Write

| Function                                    | Definition                                                                                |
| ------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [**`setOperator`**](/api/contracts/jboperatorstore/events/setoperator.md)  | <p><strong>Params</strong></p><ul><li><code>[JBOperatorData](/api/data-structures/jboperatordata.md) _operatorData</code></li></ul>   |
| [**`setOperators`**](/api/contracts/jboperatorstore/write/setoperators.md) | <p><strong>Params</strong></p><ul><li><code>[JBOperatorData](/api/data-structures/jboperatordata.md)[] _operatorData</code></li></ul> |
