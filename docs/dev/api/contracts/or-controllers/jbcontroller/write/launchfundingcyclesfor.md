# launchFundingCyclesFor

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBController`](/dev/api/contracts/or-controllers/jbcontroller/README.md)​‌

Interface: [`IJBController`](/dev/api/interfaces/ijbcontroller.md)

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Creates a funding cycle for an already existing project ERC-721.**

_Each operation within this transaction can be done in sequence separately._

_Only a project owner or operator can launch its funding cycles._

#### Definition

```
function launchFundingCyclesFor(
  uint256 _projectId,
  JBFundingCycleData calldata _data,
  JBFundingCycleMetadata calldata _metadata,
  uint256 _mustStartAtOrAfter,
  JBGroupedSplits[] calldata _groupedSplits,
  JBFundAccessConstraints[] memory _fundAccessConstraints,
  IJBPaymentTerminal[] memory _terminals,
  string calldata _memo
)
  external
  virtual
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.RECONFIGURE)
  returns (uint256 configuration) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project to launch funding cycles for.
  * `_data` is a [`JBFundingCycleData`](/dev/api/data-structures/jbfundingcycledata.md) data structure that defines the project's first funding cycle. These properties will remain fixed for the duration of the funding cycle.
  * `_metadata` is a [`JBFundingCycleMetadata`](/dev/api/data-structures/jbfundingcyclemetadata.md) data structure specifying the controller specific params that a funding cycle can have. These properties will remain fixed for the duration of the funding cycle.
  * `_mustStartAtOrAfter` is the time before which the configured funding cycle cannot start.
  * `_groupedSplits` is an array of [`JBGroupedSplits`](/dev/api/data-structures/jbgroupedsplits.md) data structures containing splits to set for any number of groups. The core protocol makes use of groups defined in [`JBSplitsGroups`](/dev/api/libraries/jbsplitsgroups.md).
  * `_fundAccessConstraints` is an array of [`JBFundAccessConstraints`](/dev/api/data-structures/jbfundaccessconstraints.md) data structures containing amounts that a project can use from its treasury for each payment terminal. Amounts are fixed point numbers using the same number of decimals as the accompanying terminal. The `_distributionLimit` and `_overflowAllowance` parameters must fit in a `uint232`. The `_distributionLimit` applies for each funding cycle, and the `_overflowAllowance` applies for the entirety of the configuration.
  * `_terminals` is an array of [`IJBPaymentTerminal`](/dev/api/interfaces/ijbpaymentterminal.md) payment terminals to add for the project.
  * `_memo` is a memo to pass along to the emitted event.
* Through the [`requirePermission`](/dev/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md) modifier, the function is only accessible by the project's owner, or from an operator that has been given the [`JBOperations.RECONFIGURE`](/dev/api/libraries/jboperations.md) permission by the project owner for the provided `_projectId`.
* The function can be overriden by inheriting contracts.
* The function overrides a function definition from the [`IJBController`](/dev/api/interfaces/ijbcontroller.md) interface.
* The function returns the configuration of the funding cycle that was successfully updated.

#### Body

1.  Make sure there's isn't already a funding cycle configuration for the project.

    ```
    // If there is a previous configuration, reconfigureFundingCyclesOf should be called instead
    if (fundingCycleStore.latestConfigurationOf(_projectId) > 0)
      revert FUNDING_CYCLE_ALREADY_LAUNCHED();
    ```

    _Internal references:_

    * [`fundingCycleStore`](/dev/api/contracts/or-controllers/jbcontroller/properties/fundingcyclestore.md)

    _External references:_

    * [`latestConfigurationOf`](/dev/api/contracts/jbfundingcyclestore/properties/latestconfigurationof.md)
2.  Set this controller as the controller of the project.

    ```
    // Set this contract as the project's controller in the directory.
    directory.setControllerOf(_projectId, address(this));
    ```

    _Internal references:_

    * [`directory`](/dev/api/contracts/or-controllers/jbcontroller/properties/directory.md)

    _External references:_

    * [`setControllerOf`](/dev/api/contracts/jbdirectory/write/setcontrollerof.md)
3.  Configure the project's funding cycle, fund access constraints, and splits. Get a reference to the resulting funding cycle's configuration.

    ```
    // Configure the first funding cycle.
    configuration = _configure(
      _projectId,
      _data,
      _metadata,
      _mustStartAtOrAfter,
      _groupedSplits,
      _fundAccessConstraints
    );
    ```

    _Internal references:_

    * [`_configure`](/dev/api/contracts/or-controllers/jbcontroller/write/-_configure.md)
4.  If terminals were provided, add them to the list of terminals the project can accept funds through.

    ```
    // Add the provided terminals to the list of terminals.
    if (_terminals.length > 0) directory.setTerminalsOf(_projectId, _terminals);
    ```

    _Internal references:_

    * [`directory`](/dev/api/contracts/or-controllers/jbcontroller/properties/directory.md)

    _External references:_

    * [`setTerminalsOf`](/dev/api/contracts/jbdirectory/write/setterminalsof.md)
5.  Emit a `LaunchFundingCycles` event with the relevant parameters.

    ```
    emit LaunchFundingCycles(configuration, _projectId, _memo, msg.sender);
    ```

    _Event references:_

    * [`LaunchFundingCycles`](/dev/api/contracts/or-controllers/jbcontroller/events/launchfundingcycles.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Creates a funding cycle for an already existing project ERC-721.

  @dev
  Each operation within this transaction can be done in sequence separately.

  @dev
  Only a project owner or operator can launch its funding cycles.

  @param _projectId The ID of the project to launch funding cycles for.
  @param _data Data that defines the project's first funding cycle. These properties will remain fixed for the duration of the funding cycle.
  @param _metadata Metadata specifying the controller specific params that a funding cycle can have. These properties will remain fixed for the duration of the funding cycle.
  @param _mustStartAtOrAfter The time before which the configured funding cycle cannot start.
  @param _groupedSplits An array of splits to set for any number of groups. 
  @param _fundAccessConstraints An array containing amounts that a project can use from its treasury for each payment terminal. Amounts are fixed point numbers using the same number of decimals as the accompanying terminal. The `_distributionLimit` and `_overflowAllowance` parameters must fit in a `uint232`.
  @param _terminals Payment terminals to add for the project.
  @param _memo A memo to pass along to the emitted event.

  @return configuration The configuration of the funding cycle that was successfully created.
*/
function launchFundingCyclesFor(
  uint256 _projectId,
  JBFundingCycleData calldata _data,
  JBFundingCycleMetadata calldata _metadata,
  uint256 _mustStartAtOrAfter,
  JBGroupedSplits[] calldata _groupedSplits,
  JBFundAccessConstraints[] memory _fundAccessConstraints,
  IJBPaymentTerminal[] memory _terminals,
  string calldata _memo
)
  external
  virtual
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.RECONFIGURE)
  returns (uint256 configuration)
{
  // If there is a previous configuration, reconfigureFundingCyclesOf should be called instead
  if (fundingCycleStore.latestConfigurationOf(_projectId) > 0)
    revert FUNDING_CYCLE_ALREADY_LAUNCHED();

  // Set this contract as the project's controller in the directory.
  directory.setControllerOf(_projectId, address(this));

  // Configure the first funding cycle.
  configuration = _configure(
    _projectId,
    _data,
    _metadata,
    _mustStartAtOrAfter,
    _groupedSplits,
    _fundAccessConstraints
  );

  // Add the provided terminals to the list of terminals.
  if (_terminals.length > 0) directory.setTerminalsOf(_projectId, _terminals);

  emit LaunchFundingCycles(configuration, _projectId, _memo, msg.sender);
}
```

</TabItem>

<TabItem value="Events" label="Events">

| Name                                                                    | Data                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`LaunchFundingCycles`**](/dev/api/contracts/or-controllers/jbcontroller/events/launchfundingcycles.md)                                         | <ul><li><code>uint256 configuration</code></li><li><code>uint256 projectId</code></li><li><code>string memo</code></li><li><code>address caller</code></li></ul>                 |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
