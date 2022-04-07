# migrate

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Contract: [`JBController`](/api/contracts/or-controllers/jbcontroller/README.md)​‌

<Tabs>
<TabItem value="Step by step" label="Step by step">

**Allows a project to migrate from this controller to another.**

_Only a project's owner or a designated operator can migrate it._

### Definition

```
function migrate(uint256 _projectId, IJBController _to)
  external
  virtual
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.MIGRATE_CONTROLLER) { ... }
```

* Arguments:
  * `_projectId` is the ID of the project that will be migrated from this controller.
  * `_to` is the controller to which the project is migrating.
* Through the [`requirePermission`](/api/contracts/or-abstract/jboperatable/modifiers/requirepermission.md) modifier, the function is only accessible by the project's owner, or from an operator that has been given the [`JBOperations.MIGRATE_CONTROLLER`](/api/libraries/jboperations.md) permission by the project owner for the provided `_projectId`.
* The function can be overriden by inheriting contracts.
* The function doesn't return anything.

### Body

1.  Make sure this controller is the project's current controller. 

    ```
    // This controller must be the project's current controller.
    if (directory.controllerOf(_projectId) != this) revert NOT_CURRENT_CONTROLLER();
    ```

    _External references:_

    * [`controllerOf`](/api/contracts/jbdirectory/properties/controllerof.md)
2.  Get a reference to the current funding cycle for the project.

    ```
    // Get a reference to the project's current funding cycle.
    JBFundingCycle memory _fundingCycle = fundingCycleStore.currentOf(_projectId);
    ```

    _External references:_

    * [`currentOf`](/api/contracts/jbfundingcyclestore/read/currentof.md)
3.  Make sure the project's current funding cycle is configured to allow controller migrations.

    ```
    // Migration must be allowed.
    if (!_fundingCycle.controllerMigrationAllowed()) revert MIGRATION_NOT_ALLOWED();
    ```

    _Libraries used:_

    * [`JBFundingCycleMetadataResolver`](/api/libraries/jbfundingcyclemetadataresolver.md)\
      `.controllerMigrationAllowed(...)`
4.  Distribute any outstanding reserved tokens. There are reserved tokens to be distributed if the tracker does not equal the token's total supply.

    ```
    // All reserved tokens must be minted before migrating.
    if (uint256(_processedTokenTrackerOf[_projectId]) != tokenStore.totalSupplyOf(_projectId))
      _distributeReservedTokensOf(_projectId, '');
    ```

    _Internal references:_

    * [`_processedTokenTrackerOf`](/api/contracts/or-controllers/jbcontroller/properties/-_processedtokentrackerof.md)
    * [`_distributeReservedTokensOf`](/api/contracts/or-controllers/jbcontroller/write/-_distributereservedtokensof.md)

    _External references:_

    * [`totalSupplyOf`](/api/contracts/jbtokenstore/read/totalsupplyof.md)
5.  Let the new controller know that a migration to it is happening.

    ```
    // Make sure the new controller is prepped for the migration.
    _to.prepForMigrationOf(_projectId, this);
    ```

    _External references:_

    * [`prepForMigrationOf`](/api/contracts/or-controllers/jbcontroller/write/prepformigrationof.md)
6.  Set the new controller of the project.

    ```
    // Set the new controller.
    directory.setControllerOf(_projectId, _to);
    ```

    _External references:_

    * [`setControllerOf`](/api/contracts/jbdirectory/write/setcontrollerof.md)
7.  Emit a `Migrate` event with the relevant parameters.

    ```
    emit Migrate(_projectId, _to, msg.sender);
    ```

    _Event references:_

    * [`Migrate`](/api/contracts/or-controllers/jbcontroller/events/migrate.md)

</TabItem>

<TabItem value="Code" label="Code">

```
/**
  @notice
  Allows a project to migrate from this controller to another.

  @dev
  Only a project's owner or a designated operator can migrate it.

  @param _projectId The ID of the project that will be migrated from this controller.
  @param _to The controller to which the project is migrating.
*/
function migrate(uint256 _projectId, IJBController _to)
  external
  virtual
  override
  requirePermission(projects.ownerOf(_projectId), _projectId, JBOperations.MIGRATE_CONTROLLER)
{
  // This controller must be the project's current controller.
  if (directory.controllerOf(_projectId) != this) revert NOT_CURRENT_CONTROLLER();

  // Get a reference to the project's current funding cycle.
  JBFundingCycle memory _fundingCycle = fundingCycleStore.currentOf(_projectId);

  // Migration must be allowed.
  if (!_fundingCycle.controllerMigrationAllowed()) revert MIGRATION_NOT_ALLOWED();

  // All reserved tokens must be minted before migrating.
  if (uint256(_processedTokenTrackerOf[_projectId]) != tokenStore.totalSupplyOf(_projectId))
    _distributeReservedTokensOf(_projectId, '');

  // Make sure the new controller is prepped for the migration.
  _to.prepForMigrationOf(_projectId, this);

  // Set the new controller.
  directory.setControllerOf(_projectId, _to);

  emit Migrate(_projectId, _to, msg.sender);
}
```

</TabItem>

<TabItem value="Errors" label="Errors">

| String                              | Description                                                                         |
| ----------------------------------- | ----------------------------------------------------------------------------------- |
| **`NOT_CURRENT_CONTROLLER`** | Thrown if the controller isn't the project's current controller.                    |
| **`MIGRATION_NOT_ALLOWED`**         | Thrown if the project's current funding cycle doesn't allow a controller migration. |

</TabItem>

<TabItem value="Events" label="Events">

| Name                                                                                | Data                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**`Migrate`**](/api/contracts/or-controllers/jbcontroller/events/migrate.md)                                               | <ul><li><code>uint256 projectId</code></li><li><code>[`IJBController`](/api/interfaces/ijbcontroller.md)to</code></li><li><code>address caller</code></li></ul>                                                                                                                  |

</TabItem>

<TabItem value="Bug bounty" label="Bug bounty">

| Category          | Description                                                                                                                            | Reward |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **Optimization**  | Help make this operation more efficient.                                                                                               | 0.5ETH |
| **Low severity**  | Identify a vulnerability in this operation that could lead to an inconvenience for a user of the protocol or for a protocol developer. | 1ETH   |
| **High severity** | Identify a vulnerability in this operation that could lead to data corruption or loss of funds.                                        | 5+ETH  |

</TabItem>
</Tabs>
