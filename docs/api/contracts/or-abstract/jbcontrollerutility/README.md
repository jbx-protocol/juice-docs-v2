---
description: >-
  Provides tools for contracts with functionality that can only be accessed by a project's controller.
---

# JBControllerUtility

## Overview

### Traits

`abstract`

### [Code](https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/abstract/JBControllerUtility.sol)

### **Interfaces**

| Name                                                                      | Description                                                                                                                              |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBControllerUtility`**](/api/interfaces/ijbcontrollerutility.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

## Constructor

```solidity
constructor(IJBDirectory _directory) {
  directory = _directory;
}
```

* **Arguments:**
  * `_directory` is an [`IJBDirectory`](/api/interfaces/ijbdirectory.md) contract storing directories of terminals and controllers for each project.

## Read

| Function                                   | Definition                                                                                                                                                                                                  |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`directory`**](/api/contracts/or-abstract/jbcontrollerutility/properties/directory.md) | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>IJBDirectory directory</code></li></ul><p><a href="/api/contracts/or-abstract/jbcontrollerutility/properties/directory.md">more</a></p> |
