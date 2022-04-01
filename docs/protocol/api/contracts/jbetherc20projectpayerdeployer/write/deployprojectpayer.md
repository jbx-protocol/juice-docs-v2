# deployProjectPayer

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBETHERC20ProjectPayerDpeloyer`](/protocol/api/contracts/jbetherc20projectpayerdeployer/README.md)

Interface: [`IJBETHERC20ProjectPayerDeployer`](/protocol/api/interfaces/ijbetherc20projectpayerdeployer.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Allows anyone to deploy a new project payer contract.**

#### Definition

```solidity
function deployProjectPayer(
  uint256 _defaultProjectId,
  address payable _defaultBeneficiary,
  bool _defaultPreferClaimedTokens,
  string memory _defaultMemo,
  bytes memory _defaultMetadata,
  IJBDirectory _directory,
  address _owner
) external override returns (IJBProjectPayer projectPayer) { ... }
```

* Arguments:
  * `_defaultProjectId` is the ID of the project whose treasury should be forwarded the project payer contract's received payments.
  * `_defaultBeneficiary` is the address that'll receive the project's tokens when the project payer receives payments. 
  * `_defaultPreferClaimedTokens` is a flag indicating whether issued tokens from the project payer's received payments should be automatically claimed into the beneficiary's wallet. 
  * `_defaultMemo` is the memo that'll be forwarded with the project payer's received payments. 
  * `_defaultMetadata` is the metadata that'll be forwarded with the project payer's received payments. 
  * `_directory` is the metadata that'll be sent. 
  * `_owner` is the address that will own the project payer.
* The function can be accessed externally by anyone.
* The function overrides a function definition from the[`IJBETHERC20ProjectPayerDeployer`](/protocol/api/interfaces/ijbetherc20projectpayerdeployer.md) interface.
* The function returns the project payer contract.

#### Body

1.  Deploy the project payer contract.

    ```solidity
    // Deploy the project payer.
    projectPayer = new JBETHERC20ProjectPayer(
      _defaultProjectId,
      _defaultBeneficiary,
      _defaultPreferClaimedTokens,
      _defaultMemo,
      _defaultMetadata,
      _directory,
      _owner
    );
    ```

    _External references:_

    * [`JBETHERC20ProjectPayer`](/protocol/api/contracts/jbetherc20projectpayer)
2.  Emit a `DeployProjectPayer` event with all relevant parameters.

    ```
    emit DeployProjectPayer(
      projectPayer,
      _defaultProjectId,
      _defaultBeneficiary,
      _defaultPreferClaimedTokens,
      _defaultMemo,
      _defaultMetadata,
      _directory,
      _owner,
      msg.sender
    );
    ```

    _Event references:_

    * [`DeployProjectPayer`](/protocol/api/contracts/jbetherc20projectpayer/events/deployprojectpayer.md)

</TabItem>

<TabItem value="Code" label="Code">

```solidity
/** 
  @notice 
  Allows anyone to deploy a new project payer contract.

  @param _defaultProjectId The ID of the project whose treasury should be forwarded the project payer contract's received payments.
  @param _defaultBeneficiary The address that'll receive the project's tokens when the project payer receives payments. 
  @param _defaultPreferClaimedTokens A flag indicating whether issued tokens from the project payer's received payments should be automatically claimed into the beneficiary's wallet. 
  @param _defaultMemo The memo that'll be forwarded with the project payer's received payments. 
  @param _defaultMetadata The metadata that'll be forwarded with the project payer's received payments. 
  @param _directory A contract storing directories of terminals and controllers for each project.
  @param _owner The address that will own the project payer.

  @return projectPayer The project payer contract.
*/
function deployProjectPayer(
  uint256 _defaultProjectId,
  address payable _defaultBeneficiary,
  bool _defaultPreferClaimedTokens,
  string memory _defaultMemo,
  bytes memory _defaultMetadata,
  IJBDirectory _directory,
  address _owner
) external override returns (IJBProjectPayer projectPayer) {
  // Deploy the project payer.
  projectPayer = new JBETHERC20ProjectPayer(
    _defaultProjectId,
    _defaultBeneficiary,
    _defaultPreferClaimedTokens,
    _defaultMemo,
    _defaultMetadata,
    _directory,
    _owner
  );

  emit DeployProjectPayer(
    projectPayer,
    _defaultProjectId,
    _defaultBeneficiary,
    _defaultPreferClaimedTokens,
    _defaultMemo,
    _defaultMetadata,
    _directory,
    _owner,
    msg.sender
  );
}
```

</TabItem>

<TabItem value="Events" label="Events">

| Name                                | Data                                                                                                                                                                                                                                                  |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`DeployProjectPayer`**](/protocol/api/contracts/jbetherc20projectpayerdeployer/events/deployprojectpayer.md)                                                                          | <ul><li><code>[IJBProjectPayer](/protocol/api/interfaces/ijbprojectPayer.md) indexed projectPayer</code></li><li><code>uint256 indexed defaultProjectId</code></li><li><code>address indexed defaultBeneficiary</code></li><li><code>bool defaultPreferClaimedTokens</code></li><li><code>string defaultMemo</code></li><li><code>bytes defaultMetadata</code></li><li><code>[IJBDirectory](/protocol/api/interfaces/ijbdirectory.md) directory</code></li><li><code>address caller</code></li></ul>                  |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
