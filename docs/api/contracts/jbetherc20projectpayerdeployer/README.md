---
description: >-
 Deploys project payer contracts.
---

# JBETHERC20ProjectPayerDeployer

## Overview

### [Code](https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBETHERC20ProjectPayerDeployer.sol)

### **Addresses**

Ethereum mainnet: _Not yet deployed_

### **Interfaces**

| Name                                                 | Description                                                                                                                              |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBETHERC20ProjectPayerDeployer`**](/api/interfaces/ijbetherc20projectpayerdeployer.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |


## Events

| Name                                                                                                      | Data                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`DeployProjectPayer`**](/api/contracts/jbetherc20projectpayerdeployer/events/deployprojectpayer.md)                                                                          | <ul><li><code>[IJBProjectPayer](/api/interfaces/ijbprojectpayer.md) indexed projectPayer</code></li><li><code>uint256 indexed defaultProjectId</code></li><li><code>address indexed defaultBeneficiary</code></li><li><code>bool defaultPreferClaimedTokens</code></li><li><code>string defaultMemo</code></li><li><code>bytes defaultMetadata</code></li><li><code>[IJBDirectory](/api/interfaces/ijbdirectory.md) directory</code></li><li><code>address caller</code></li></ul>                  |


## Write

| Function                                                                                                     | Definition                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`deployProjectPayer`**](/api/contracts/jbetherc20projectpayerdeployer/write/deployprojectpayer.md)                                                                        | <p><strong>Traits</strong></p><ul><li><code>payable</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>address _token</code></li><li>uint256 _amount</li><li><code>uint256 _decimals</code></li><li><code>address _beneficiary</code></li><li>uint256 _minReturnedTokens</li><li><code>bool _preferClaimedTokens</code></li><li>string _memo</li><li>bytes _metadata</li></ul>                                             |
