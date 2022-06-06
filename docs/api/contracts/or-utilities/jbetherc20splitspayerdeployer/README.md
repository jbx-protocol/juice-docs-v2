# JBETHERC20SplitsPayerDeployer

_Deploys [`JBETHERC20SplitsPayer`](/api/contracts/or-utilities/jbetherc20splitspayer) contracts._

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBETHERC20SplitsPayerDeployer.sol

#### Addresses

Ethereum mainnet: [`0xf7A3D47be5AB412A469924B458113c769F675fcE`](https://etherscan.io/address/0xf7A3D47be5AB412A469924B458113c769F675fcE)

Ethereum rinkeby: [`0xE337D14A547a63D5f800A2de0e4F8B2F5B2f1b5D`](https://rinkeby.etherscan.io/address/0xE337D14A547a63D5f800A2de0e4F8B2F5B2f1b5D)

#### Interfaces

| Name                                                 | Description                                                                                                                              |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBETHERC20SplitsPayerDeployer`**](/api/interfaces/ijbetherc20splitspayerdeployer.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |


#### Events

| Name                                                                                                      | Data                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`DeploySplitsPayer`**](/api/contracts/or-utilities/jbetherc20splitspayerdeployer/events/deploysplitspayer.md)                                                                          | <ul><li><code>[IJBSplitsPayer](/api/interfaces/ijbsplitspayer.md) indexed splitsPayer</code></li><li><code>uint256 indexed defaultSplitsProjectId</code></li><li><code>uint256 defaultSplitsDomain</code></li><li><code>uint256 defaultSplitsGroup</code></li><li><code>[IJBSplitStore](/api/interfaces/ijbsplitsstore.md) splitStore</code></li><li><code>uint256 defaultProjectId</code></li><li><code>address defaultBeneficiary</code></li><li><code>bool defaultPreferClaimedTokens</code></li><li><code>string defaultMemo</code></li><li><code>bytes defaultMetadata</code></li><li><code>bool preferAddToBalance</code></li><li><code>address caller</code></li></ul>                  |


#### Write

| Function                                                                                                     | Definition                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`deploySplitsPayer`**](/api/contracts/or-utilities/jbetherc20splitspayerdeployer/write/deploysplitspayer.md)                                                                        | <p><strong>Params</strong></p><ul><li><code>uint256 defaultSplitsProjectId</code></li><li><code>uint256 _defaultSplitsDomain</code></li><li><code>uint256 _defaultSplitsGroup</code></li><li><code>[IJBSplitStore](/api/interfaces/ijbsplitsstore.md) _splitsStore</code></li><li><code>uint256 _defaultProjectId</code></li><li><code>address _defaultBeneficiary</code></li><li><code>bool _defaultPreferClaimedTokens</code></li><li><code>string _defaultMemo</code></li><li><code>bytes _defaultMetadata</code></li><li><code>bool _preferAddToBalance</code></li><li><code>address _owner</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBSplitsPayer](/api/interfaces/ijbsplitspayer.md) splitsPayer</code></li></ul>                                            |
                                             |
