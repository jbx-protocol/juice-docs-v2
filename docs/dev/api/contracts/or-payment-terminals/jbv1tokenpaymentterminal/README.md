# JBV1TokenPaymentTerminal

_Allows project owners to specify the v1 project token that they are willing to accept from holders in exchange for their v2 project token._

#### Code

https://github.com/jbx-protocol/juice-v1-token-payment-terminal/blob/main/contracts/JBV1TokenPaymentTerminal.sol

#### Addresses

Ethereum mainnet: [``](https://etherscan.io/address/)

Ethereum rinkeby: [``](https://rinkeby.etherscan.io/address/)

#### Inheritance

| Contract                                             | Description                                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [**`IJBV1TokenPaymentTerminal`**](/dev/api/interfaces/ijbv1tokenpaymentterminal.md) | General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules. |
| [**`IJBPaymentTerminal`**](/dev/api/interfaces/ijbpaymentterminal.md) | A standard for a contract where project can receive payments through. |

#### Constructor

```
/**
  @param _operatorStore A contract storing operator assignments.
  @param _projects A contract which mints ERC-721's that represent project ownership and transfers.
  @param _directory A contract storing directories of terminals and controllers for each project.
  @param _ticketBooth The V1 contract where tokens are stored.
*/
constructor(
  IJBOperatorStore _operatorStore,
  IJBProjects _projects,
  IJBDirectory _directory,
  ITicketBooth _ticketBooth
) JBOperatable(_operatorStore) {
  projects = _projects;
  directory = _directory;
  ticketBooth = _ticketBooth;
}
```

* `_operatorStore` is an [`IJBOperatorStore`](/dev/api/interfaces/ijboperatorstore.md) contract storing operator assignments.
* `_projects` is an [`IJBProjects`](/dev/api/interfaces/ijbprojects.md) contract which mints ERC-721's that represent project ownership and transfers.
* `_directory` is an [`IJBDirectory`](/dev/api/interfaces/ijbdirectory.md) contract storing directories of terminals and controllers for each project.
* `_ticketBooth` is an [`ITicketBooth`](https://github.com/jbx-protocol/juice-contracts-v1/blob/main/contracts/interfaces/ITicketBooth.sol) contract that stores project tokens in the v1 Juicebox protocol.

#### Events

| Name                                                     | Data                                                                                                                                                                                                                                                |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`Pay`**](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/events/pay.md)                                         | <ul><li><code>uint256 indexed projectId</code></li><li><code>address payer</code></li><li><code>address beneficiary</code></li><li><code>uint256 amount</code></li><li><code>uint256 beneficiaryTokenCount</code></li><li><code>string memo</code></li><li><code>address caller</code></li></ul>        |

#### Modifiers 

| Function                                                                  | Definition                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`isTerminalOf`**](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/modifiers/isterminalof.md)                                  | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul>                                     |

#### Properties

| Function                                                                  | Definition                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`projects`**](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/projects.md)                                  | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBProjects](/dev/api/interfaces/ijbprojects.md) projects</code></li></ul>                                     |
| [**`directory`**](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/directory.md)                                | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[IJBDirectory](/dev/api/interfaces/ijbdirectory.md) directory</code></li></ul>                                  |
| [**`ticketBooth`**](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/ticketbooth.md)                                | <p><strong>Traits</strong></p><ul><li><code>immutable</code></li></ul><p><strong>Returns</strong></p><ul><li><code>[ITicketBooth](https://github.com/jbx-protocol/juice-contracts-v1/blob/main/contracts/interfaces/ITicketBooth.sol) ticketBooth</code></li></ul>                                  |
| [**`v1ProjectIdOf`**](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/v1projectidof.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 v1ProjectId</code></li></ul>                    |
| [**`finalized`**](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/properties/finalized.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool finalized</code></li></ul>                    |

#### Read

| Function                                   | Definition                                                                                                                                                                                                                            |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`acceptsToken`**](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/read/acceptstoken.md) | <p><strong>Params</strong></p><ul><li><code>address _token</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool flag</code></li></ul>                                                                        |
| [**`decimalsForToken`**](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/read/decimalsfortoken.md)     | <p><strong>Params</strong></p><ul><li><code>address _token</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 decimals</code></li></ul> |
| [**`currencyForToken`**](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/read/currencyfortoken.md)     | <p><strong>Params</strong></p><ul><li><code>address _token</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 currency</code></li></ul> |
| [**`currentEthOverflowOf`**](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/read/currentethoverflowof) | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 ethOverflow</code></li></ul>                                                                        |
| [**`supportsInterface`**](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/read/supportsinterface.md) | <p><strong>Params</strong></p><ul><li><code>uint256 _interfaceId</code></li></ul><p><strong>Returns</strong></p><ul><li><code>bool</code></li></ul> |

#### Write

| Function                                                  | Definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**`pay`**](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/write/pay.md)                                 | <p><strong>Traits</strong></p><ul><li><code>payable</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li><li><code>address _token</code></li><li><code>address _beneficiary</code></li><li><code>uint256 _minReturnedTokens</code></li><li><code>bool _preferClaimedTokens</code></li><li><code>string _memo</code></li><li><code>bytes _metadata</code></li></ul><p><strong>Returns</strong></p><ul><li><code>uint256 beneficiaryTokenCount</code></li></ul>                                                                                                                                                          |
| [**`addToBalanceOf`**](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/write/addtobalanceof.md)           | <p><strong>Traits</strong></p><ul><li><code>payable</code></li></ul><p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _amount</code></li><li><code>address _token</code></li><li><code>string _memo</code></li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [**`setV1TokensOf`**](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/write/setv1tokensof.md)           | <p><strong>Params</strong></p><ul><li><code>uint256 _projectId</code></li><li><code>uint256 _v1ProjectId</code></li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [**`releaseV1TokensOf`**](/dev/api/contracts/or-payment-terminals/jbv1tokenpaymentterminal/write/releasev1tokensof.md)           | <p><strong>Params</strong></p><ul><li><code>uint256 _v1ProjectId</code></li><li><code>address _beneficiary</code></li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                    |
