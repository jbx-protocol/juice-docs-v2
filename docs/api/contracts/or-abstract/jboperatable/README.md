---
description: >-
  Modifiers to allow access to functions based on the message sender's operator
  status.
---

# JBOperatable

## Overview

### Traits

`abstract`

### [Code](https://github.com/jbx-protocol/juice-contracts/tree/main/contracts/v2abstract/JBOperatable.sol)

## Modifiers

| Name                                                                                      | Data                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`requirePermission`**](/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md)                                 | <ul><li><code>address _account</code></li><li><code>uint256 _domain</code></li><li><code>uint256 _index</code></li></ul>                                               |
| [**`requirePermissionAllowingOverride`**](/api/contracts/or-abstract/jboperatable/modifiers/requirepermissionallowingoverride.md) | <ul><li><code>address _account</code></li><li><code>uint256 _domain</code></li><li><code>uint256 _permissionIndex</code></li><li><code>bool _override</code></li></ul> |

## Constructor

```solidity
constructor(IJBOperatorStore _operatorStore) {
  operatorStore = _operatorStore;
}
```

* **Arguments:**
  * `_operatorStore` is an [`IJBOperatorStore`](/api/interfaces/ijboperatorstore.md) contract storing operator assignments.

## Read

| Function                                           | Definition                                                                                                                                                          |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`operatorStore`**](/api/contracts/or-abstract/jboperatable/properties/operatorstore.md) | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>IJBOperationStore operatorStore</code></li></ul> |
