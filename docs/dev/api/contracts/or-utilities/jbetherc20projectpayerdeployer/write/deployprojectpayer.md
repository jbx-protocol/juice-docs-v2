# deployProjectPayer

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBETHERC20ProjectPayerDeployer`](/dev/api/contracts/or-utilities/jbetherc20projectpayerdeployer/README.md)

Interface: [`IJBETHERC20ProjectPayerDeployer`](/dev/api/interfaces/ijbetherc20projectpayerdeployer.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Allows anyone to deploy a new project payer contract.**

#### Definition

```
function deployProjectPayer(
  uint256 _defaultProjectId,
  address payable _defaultBeneficiary,
  bool _defaultPreferClaimedTokens,
  string memory _defaultMemo,
  bytes memory _defaultMetadata,
  bool _defaultPreferAddToBalance,
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
  * `_defaultPreferAddToBalance` is a flag indicating if received payments should call the `pay` function or the `addToBalance` function of a project.
  * `_directory` is a contract storing directories of terminals and controllers for each project.
  * `_owner` is the address that will own the project payer.
* The function can be accessed externally by anyone.
* The function overrides a function definition from the[`IJBETHERC20ProjectPayerDeployer`](/dev/api/interfaces/ijbetherc20projectpayerdeployer.md) interface.
* The function returns the project payer contract.

#### Body

1.  Deploy the project payer contract.

    ```
    // Deploy the project payer.
    projectPayer = new JBETHERC20ProjectPayer(
      _defaultProjectId,
      _defaultBeneficiary,
      _defaultPreferClaimedTokens,
      _defaultMemo,
      _defaultMetadata,
      _defaultPreferAddToBalance,
      _directory,
      _owner
    );
    ```

    _External references:_

    * [`JBETHERC20ProjectPayer`](/dev/api/contracts/or-utilities/jbetherc20projectpayer)
2.  Emit a `DeployProjectPayer` event with all relevant parameters.

    ```
    emit DeployProjectPayer(
      projectPayer,
      _defaultProjectId,
      _defaultBeneficiary,
      _defaultPreferClaimedTokens,
      _defaultMemo,
      _defaultMetadata,
      _defaultPreferAddToBalance,
      _directory,
      _owner,
      msg.sender
    );
    ```

    _Event references:_

    * [`DeployProjectPayer`](/dev/api/contracts/or-utilities/jbetherc20projectpayerdeployer/events/deployprojectpayer.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  Allows anyone to deploy a new project payer contract.

  @param _defaultProjectId The ID of the project whose treasury should be forwarded the project payer contract's received payments.
  @param _defaultBeneficiary The address that'll receive the project's tokens when the project payer receives payments. 
  @param _defaultPreferClaimedTokens A flag indicating whether issued tokens from the project payer's received payments should be automatically claimed into the beneficiary's wallet. 
  @param _defaultMemo The memo that'll be forwarded with the project payer's received payments. 
  @param _defaultMetadata The metadata that'll be forwarded with the project payer's received payments. 
  @param _defaultPreferAddToBalance A flag indicating if received payments should call the `pay` function or the `addToBalance` function of a project.
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
  bool _defaultPreferAddToBalance,
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
    _defaultPreferAddToBalance,
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
    _defaultPreferAddToBalance,
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
| [**`DeployProjectPayer`**](/dev/api/contracts/or-utilities/jbetherc20projectpayerdeployer/events/deployprojectpayer.md)                                                                          | <ul><li><code>[IJBProjectPayer](/dev/api/interfaces/ijbprojectpayer.md) indexed projectPayer</code></li><li><code>uint256 defaultProjectId</code></li><li><code>address defaultBeneficiary</code></li><li><code>bool defaultPreferClaimedTokens</code></li><li><code>string defaultMemo</code></li><li><code>bytes defaultMetadata</code></li><li><code>bool preferAddToBalance</code></li><li><code>[IJBDirectory](/dev/api/interfaces/ijbdirectory.md) directory</code></li><li><code>address caller</code></li></ul>                  |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
