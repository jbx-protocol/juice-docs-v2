---
description: >-
   An ERC-20 token that can be used by a project in the `JBTokenStore`.
---

# JBToken

## Overview

### [Code](https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBToken.sol)

### **Interfaces**

| Name                                                     | Description                                                                                                                              |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBToken`**](/protocol/api/interfaces/ijbtoken.md) | Allows this contract to be used by projects in the JBTokenStore. |


### **Inheritance**

| Contract                                                         | Description                                                                                                                                                                        |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`ERC20`**](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#ERC20) | General token standard for fungible accounting. |
| [**`Ownable`**](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable) | Includes convenience functionality for specifying an address that owns the contract, with modifiers that only allow access by the owner. |

## Constructor

```solidity
constructor(string memory _name, string memory _symbol)
  ERC20(_name, _symbol) {}
```

* **Arguments:**
  * `_name` is the name of the token.
  * `_symbol` is the symbol that the token should be represented by.


## Read

| Function                                                            | Definition                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`decimals`**](/protocol/api/contracts/jbtoken/read/decimals.md)                                 |  |
| [**`totalSupply`**](/protocol/api/contracts/jbtoken/read/totalsupply.md)                                 | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul> |
| [**`balanceOf`**](/protocol/api/contracts/jbtoken/read/balanceof.md)                                 | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _account</code></li></ul> |
## Write

| Function                                                            | Definition                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`mint`**](/protocol/api/contracts/jbtoken/write/mint.md)                                 | <p><strong>Traits</strong></p><ul><li><code>[onlyOwner](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _account</code></li><li><code>uint256 _amount</code></li></ul> |
| [**`burn`**](/protocol/api/contracts/jbtoken/write/burn.md)                                 | <p><strong>Traits</strong></p><ul><li><code>[onlyOwner](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _account</code></li><li><code>uint256 _amount</code></li></ul> |
| [**`approve`**](/protocol/api/contracts/jbtoken/write/approve.md)                                 | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _spender</code></li><li><code>uint256 _amount</code></li></ul> |
| [**`transfer`**](/protocol/api/contracts/jbtoken/write/transfer.md)                                 | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _to</code></li><li><code>uint256 _amount</code></li></ul> |
| [**`transferFrom`**](/protocol/api/contracts/jbtoken/write/transferfrom.md)                                 | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _from</code></li><li><code>address _to</code></li><li><code>uint256 _amount</code></li></ul> |
| [**`transferOwnership`**](/protocol/api/contracts/jbtoken/write/transferownership.md)                                 | <p><strong>Traits</strong></p><ul><li><code>[onlyOwner](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--)</code></li></ul><p><strong>Params</strong></p><ul><li><code>address _newOwner</code></li></ul> |
