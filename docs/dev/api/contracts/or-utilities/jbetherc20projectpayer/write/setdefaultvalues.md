# setDefaultValues

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBETHERC20ProjectPayer`](/dev/api/contracts/or-utilities/jbetherc20projectpayer/README.md)

Interface: [`IJBProjectPayer`](/dev/api/interfaces/ijbprojectpayer.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Sets the default values that determine how to interact with a protocol treasury when this contract receives ETH directly.**

#### Definition

```
function setDefaultValues(
  uint256 _projectId,
  address payable _beneficiary,
  bool _preferClaimedTokens,
  string memory _memo,
  bytes memory _metadata,
  bool _defaultPreferAddToBalance
) external virtual override onlyOwner { ... }
```

* Arguments:
  * `_projectId` is the ID of the project whose treasury should be forwarded this contract's received payments.
  * `_beneficiary` is the address that'll receive the project's tokens. 
  * `_preferClaimedTokens` is a flag indicating whether issued tokens should be automatically claimed into the beneficiary's wallet. 
  * `_memo` is the memo that'll be used. 
  * `_metadata` is the metadata that'll be sent. 
  * `_defaultPreferAddToBalance` is a flag indicating if received payments should call the `pay` function or the `addToBalance` function of a project.
* Through the [`onlyOwner`](https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable-onlyOwner--) modifier, this function can only be accessed by the address that owns this contract.
* The function can be overriden by inheriting contracts.
* The function overrides a function definition from the [`IJBProjectPayer`](/dev/api/interfaces/ijbprojectpayer.md) interface.
* The function doesn't return anything.

#### Body

1.  Set the default project ID if it has changed.

    ```
    // Set the default project ID if it has changed.
    if (_projectId != defaultProjectId) defaultProjectId = _projectId;
    ```

    _Internal references:_

    * [`defaultProjectId`](/dev/api/contracts/or-utilities/jbetherc20projectpayer/properties/defaultprojectid.md)
2.  Set the default beneficiary if it has changed.

    ```
    // Set the default beneficiary if it has changed.
    if (_beneficiary != defaultBeneficiary) defaultBeneficiary = _beneficiary;
    ```

    _Internal references:_

    * [`defaultBeneficiary`](/dev/api/contracts/or-utilities/jbetherc20projectpayer/properties/defaultbeneficiary.md)
3.  Set the default claimed token preference if it has changed.

    ```
    // Set the default claimed token preference if it has changed.
    if (_preferClaimedTokens != defaultPreferClaimedTokens)
      defaultPreferClaimedTokens = _preferClaimedTokens;
    ```

    _Internal references:_

    * [`defaultPreferClaimedTokens`](/dev/api/contracts/or-utilities/jbetherc20projectpayer/properties/defaultpreferclaimedtokens.md)
4.  Set the default memo if it has changed.

    ```
    // Set the default memo if it has changed.
    if (keccak256(abi.encodePacked(_memo)) != keccak256(abi.encodePacked(defaultMemo)))
      defaultMemo = _memo;
    ```

    _Internal references:_

    * [`defaultMemo`](/dev/api/contracts/or-utilities/jbetherc20projectpayer/properties/defaultmemo.md)
5.  Set the default metadata if it has changed.

    ```
    // Set the default metadata if it has changed.
    if (keccak256(abi.encodePacked(_metadata)) != keccak256(abi.encodePacked(defaultMetadata)))
      defaultMetadata = _metadata;
    ```

    _Internal references:_

    * [`defaultMetadata`](/dev/api/contracts/or-utilities/jbetherc20projectpayer/properties/defaultmetadata.md)

5.  Set the default metadata if it has changed.

    ```
    // Set the add to balance preference if it has changed.
    if (_defaultPreferAddToBalance != defaultPreferAddToBalance)
      defaultPreferAddToBalance = _defaultPreferAddToBalance;
    ```

    _Internal references:_

    * [`defaultPreferAddToBalance`](/dev/api/contracts/or-utilities/jbetherc20projectpayer/properties/defaultpreferaddtobalance.md)
6.  Emit a `SetDefaultValues` event with all relevant parameters.

    ```
    emit SetDefaultValues(
      _projectId,
      _beneficiary,
      _preferClaimedTokens,
      _memo,
      _metadata,
      _defaultPreferAddToBalance,
      msg.sender
    );
    ```

    _Event references:_

    * [`SetDefaultValues`](/dev/api/contracts/or-utilities/jbetherc20projectpayer/events/setdefaultvalues.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/** 
  @notice 
  Sets the default values that determine how to interact with a protocol treasury when this contract receives ETH directly.

  @param _projectId The ID of the project whose treasury should be forwarded this contract's received payments.
  @param _beneficiary The address that'll receive the project's tokens. 
  @param _preferClaimedTokens A flag indicating whether issued tokens should be automatically claimed into the beneficiary's wallet. 
  @param _memo The memo that'll be used. 
  @param _metadata The metadata that'll be sent. 
  @param _defaultPreferAddToBalance A flag indicating if received payments should call the `pay` function or the `addToBalance` function of a project.
*/
function setDefaultValues(
  uint256 _projectId,
  address payable _beneficiary,
  bool _preferClaimedTokens,
  string memory _memo,
  bytes memory _metadata,
  bool _defaultPreferAddToBalance
) external virtual override onlyOwner {
  // Set the default project ID if it has changed.
  if (_projectId != defaultProjectId) defaultProjectId = _projectId;

  // Set the default beneficiary if it has changed.
  if (_beneficiary != defaultBeneficiary) defaultBeneficiary = _beneficiary;

  // Set the default claimed token preference if it has changed.
  if (_preferClaimedTokens != defaultPreferClaimedTokens)
    defaultPreferClaimedTokens = _preferClaimedTokens;

  // Set the default memo if it has changed.
  if (keccak256(abi.encodePacked(_memo)) != keccak256(abi.encodePacked(defaultMemo)))
    defaultMemo = _memo;

  // Set the default metadata if it has changed.
  if (keccak256(abi.encodePacked(_metadata)) != keccak256(abi.encodePacked(defaultMetadata)))
    defaultMetadata = _metadata;

  // Set the add to balance preference if it has changed.
  if (_defaultPreferAddToBalance != defaultPreferAddToBalance)
    defaultPreferAddToBalance = _defaultPreferAddToBalance;

  emit SetDefaultValues(
    _projectId,
    _beneficiary,
    _preferClaimedTokens,
    _memo,
    _metadata,
    _defaultPreferAddToBalance,
    msg.sender
  );
}
```

</TabItem>

<TabItem value="Events" label="Events">

| Name                                | Data                                                                                                                                                                                                                                                  |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`SetDefaultValues`**](/dev/api/contracts/or-utilities/jbetherc20projectpayer/events/setdefaultvalues.md)                                                                          | <ul><li><code>uint256 indexed projectId</code></li><li><code>address beneficiary</code></li><li><code>bool preferClaimedTokens</code></li><li><code>string memo</code></li><li><code>bytes metadata</code></li><li><code>bool preferAddToBalance</code></li><li><code>address caller</code></li></ul>                  |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
