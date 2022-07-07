# JBOperatorStore

_Stores operator permissions for all addresses. Addresses can give permissions to any other address to take specific indexed actions on their behalf._

#### Code

https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBOperatorStore.sol

#### Addresses

Ethereum mainnet: [`0x6F3C5afCa0c9eDf3926eF2dDF17c8ae6391afEfb`](https://etherscan.io/address/0x6F3C5afCa0c9eDf3926eF2dDF17c8ae6391afEfb)

Ethereum rinkeby: [`0xEDB2db4b82A4D4956C3B4aA474F7ddf3Ac73c5AB`](https://rinkeby.etherscan.io/address/0xEDB2db4b82A4D4956C3B4aA474F7ddf3Ac73c5AB)

#### Interfaces

| Name                                                           | Description                                                                                                                              |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBOperatorStore`**](/dev/api/interfaces/ijboperatorstore.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |

#### Events

| Name                                       | Data                                                                                                                                                                                                                                  |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`SetOperator`**](/dev/api/contracts/jboperatorstore/events/setoperator.md) | <ul><li><code>address indexed operator</code></li><li><code>address indexed account</code></li><li><code>uint256 indexed domain</code></li><li><code>uint256[] permissionIndexes</code></li><li><code>uint256 packed</code></li></ul> |

#### Properties

| Function                                           | Definition                                                                                                                                                                                                                                 |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`permissionsOf`**](/dev/api/contracts/jboperatorstore/properties/permissionsof.md) | <p><strong>Params</strong></p><ul><li><code>address _operator</code></li><li><code>address _account</code></li><li><code>uint256 _domain</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256</code></li></ul> |

#### Read

| Function                                       | Definition                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`hasPermission`**](/dev/api/contracts/jboperatorstore/read/haspermission.md)   | <p><strong>Params</strong></p><ul><li><code>address _operator</code></li><li><code>address _account</code></li><li><code>uint256 _domain</code></li><li><code>uint256 _permissionIndex</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool hasPermission</code></li></ul>      |
| [**`hasPermissions`**](/dev/api/contracts/jboperatorstore/read/haspermissions.md) | <p><strong>Params</strong></p><ul><li><code>address _operator</code></li><li><code>address _account</code></li><li><code>uint256 _domain</code></li><li><code>uint256[] _permissionIndexes</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool hasPermissions</code></li></ul> |

#### Write

| Function                                    | Definition                                                                                |
| ------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [**`setOperator`**](/dev/api/contracts/jboperatorstore/events/setoperator.md)  | <p><strong>Params</strong></p><ul><li><code>[JBOperatorData](/dev/api/data-structures/jboperatordata.md) _operatorData</code></li></ul>   |
| [**`setOperators`**](/dev/api/contracts/jboperatorstore/write/setoperators.md) | <p><strong>Params</strong></p><ul><li><code>[JBOperatorData](/dev/api/data-structures/jboperatordata.md)[] _operatorData</code></li></ul> |
