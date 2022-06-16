# deploySplitsPayer

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBETHERC20SplitsPayerDeployer`](/dev/api/contracts/or-utilities/jbetherc20splitspayerdeployer/README.md)

Interface: [`IJBETHERC20SplitsPayerDeployer`](/dev/api/interfaces/ijbetherc20splitspayerdeployer.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Allows anyone to deploy a new splits payer contract.**

#### Definition

```
function deploySplitsPayer(
  uint256 _defaultSplitsProjectId,
  uint256 _defaultSplitsDomain,
  uint256 _defaultSplitsGroup,
  IJBSplitsStore _splitsStore,
  uint256 _defaultProjectId,
  address payable _defaultBeneficiary,
  bool _defaultPreferClaimedTokens,
  string memory _defaultMemo,
  bytes memory _defaultMetadata,
  bool _defaultPreferAddToBalance,
  address _owner
) external override returns (IJBSplitsPayer splitsPayer) { ... }
```

* Arguments:
  * `_defaultSplitsProjectId` is the ID of project for which the default splits are stored.
  * `_defaultSplitsDomain` is the splits domain to payout when this contract receives direct payments.
  * `_defaultSplitsGroup` is the splits group to payout when this contract receives direct payments.
  * `_splitsStore` is a contract that stores splits for each project.
  * `_defaultProjectId` is the ID of the project whose treasury should be forwarded the splits payer contract's received payment leftovers after distributing to the default splits group.
  * `_defaultBeneficiary` is the address that'll receive the project's tokens when the project payer receives payments. 
  * `_defaultPreferClaimedTokens` is a flag indicating whether issued tokens from the project payer's received payments should be automatically claimed into the beneficiary's wallet. 
  * `_defaultMemo` is the memo that'll be forwarded with the project payer's received payments. 
  * `_defaultMetadata` is the metadata that'll be forwarded with the project payer's received payments. 
  * `_defaultPreferAddToBalance` is a flag indicating if received payments should call the `pay` function or the `addToBalance` function of a project.
  * `_owner` is the address that will own the project payer.
* The function can be accessed externally by anyone.
* The function overrides a function definition from the[`IJBETHERC20SplitsPayerDeployer`](/dev/api/interfaces/ijbetherc20splitspayerdeployer.md) interface.
* The function returns the splits payer contract.

#### Body

1.  Deploy the splits payer contract.

    ```
    // Deploy the splits payer.
    splitsPayer = new JBETHERC20SplitsPayer(
      _defaultSplitsProjectId,
      _defaultSplitsDomain,
      _defaultSplitsGroup,
      _splitsStore,
      _defaultProjectId,
      _defaultBeneficiary,
      _defaultPreferClaimedTokens,
      _defaultMemo,
      _defaultMetadata,
      _defaultPreferAddToBalance,
      _owner
    );
    ```

    _External references:_

    * [`JBETHERC20SplitsPayer`](/dev/api/contracts/or-utilities/jbetherc20splitspayer)
2.  Emit a `DeploySplitsPayer` event with all relevant parameters.

    ```
    emit DeploySplitsPayer(
      splitsPayer,
      _defaultSplitsProjectId,
      _defaultSplitsDomain,
      _defaultSplitsGroup,
      _splitsStore,
      _defaultProjectId,
      _defaultBeneficiary,
      _defaultPreferClaimedTokens,
      _defaultMemo,
      _defaultMetadata,
      _defaultPreferAddToBalance,
      _owner,
      msg.sender
    );
    ```

    _Event references:_

    * [`DeploySplitsPayer`](/dev/api/contracts/or-utilities/jbetherc20splitspayerdeployer/events/deploysplitspayer.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  Allows anyone to deploy a new splits payer contract.

  @param _defaultSplitsProjectId The ID of project for which the default splits are stored.
  @param _defaultSplitsDomain The splits domain to payout when this contract receives direct payments.
  @param _defaultSplitsGroup The splits group to payout when this contract receives direct payments.
  @param _splitsStore A contract that stores splits for each project.
  @param _defaultProjectId The ID of the project whose treasury should be forwarded the splits payer contract's received payment leftovers after distributing to the default splits group.
  @param _defaultBeneficiary The address that'll receive the project's tokens when the splits payer receives payments. 
  @param _defaultPreferClaimedTokens A flag indicating whether issued tokens from the splits payer's received payments should be automatically claimed into the beneficiary's wallet. 
  @param _defaultMemo The memo that'll be forwarded with the splits payer's received payments. 
  @param _defaultMetadata The metadata that'll be forwarded with the splits payer's received payments. 
  @param _defaultPreferAddToBalance A flag indicating if received payments should call the `pay` function or the `addToBalance` function of a project.
  @param _owner The address that will own the splits payer.

  @return splitsPayer The splits payer contract.
*/
function deploySplitsPayer(
  uint256 _defaultSplitsProjectId,
  uint256 _defaultSplitsDomain,
  uint256 _defaultSplitsGroup,
  IJBSplitsStore _splitsStore,
  uint256 _defaultProjectId,
  address payable _defaultBeneficiary,
  bool _defaultPreferClaimedTokens,
  string memory _defaultMemo,
  bytes memory _defaultMetadata,
  bool _defaultPreferAddToBalance,
  address _owner
) external override returns (IJBSplitsPayer splitsPayer) {
  // Deploy the splits payer.
  splitsPayer = new JBETHERC20SplitsPayer(
    _defaultSplitsProjectId,
    _defaultSplitsDomain,
    _defaultSplitsGroup,
    _splitsStore,
    _defaultProjectId,
    _defaultBeneficiary,
    _defaultPreferClaimedTokens,
    _defaultMemo,
    _defaultMetadata,
    _defaultPreferAddToBalance,
    _owner
  );

  emit DeploySplitsPayer(
    splitsPayer,
    _defaultSplitsProjectId,
    _defaultSplitsDomain,
    _defaultSplitsGroup,
    _splitsStore,
    _defaultProjectId,
    _defaultBeneficiary,
    _defaultPreferClaimedTokens,
    _defaultMemo,
    _defaultMetadata,
    _defaultPreferAddToBalance,
    _owner,
    msg.sender
  );
}
```

</TabItem>

<TabItem value="Events" label="Events">

| Name                                | Data                                                                                                                                                                                                                                                  |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`DeploySplitsPayer`**](/dev/api/contracts/or-utilities/jbetherc20splitspayerdeployer/events/deploysplitspayer.md)                                                                          | <ul><li><code>[IJBSplitsPayer](/dev/api/interfaces/ijbsplitspayer.md) indexed splitsPayer</code></li><li><code>uint256 indexed defaultSplitsProjectId</code></li><li><code>uint256 defaultSplitsDomain</code></li><li><code>uint256 defaultSplitsGroup</code></li><li><code>[IJBSplitStore](/dev/api/interfaces/ijbsplitsstore.md) splitStore</code></li><li><code>uint256 defaultProjectId</code></li><li><code>address defaultBeneficiary</code></li><li><code>bool defaultPreferClaimedTokens</code></li><li><code>string defaultMemo</code></li><li><code>bytes defaultMetadata</code></li><li><code>bool preferAddToBalance</code></li><li><code>address caller</code></li></ul>                  |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
